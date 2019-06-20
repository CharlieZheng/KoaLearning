'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transactionOfAuth = exports.transactionOfIou = exports.transactionOfAdm = exports.poolOfIou = exports.transaction = undefined;

var _promiseMysql = require('promise-mysql');

var _promiseMysql2 = _interopRequireDefault(_promiseMysql);

var _config = require('../config');

var _log = require('../utils/log');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

let pool = options => {
    let pool;
    pool = _promiseMysql2.default.createPool({
        host: options.host,
        port: options.port,
        user: options.username,
        password: options.password,
        database: options.database,
        connectionLimit: 10
    });
    pool.end();
    pool.on('connection', connection => {
        _log.logger.debug('MYSQL数据库连接已分配');
        connection.on('error', err => {
            _log.logger.debug('MYSQL数据库操作错误:%s', err);
        });
        connection.on('end', err => {
            _log.logger.debug('MYSQL数据库连接结束:%s', err);
        });
    });

    return pool;
};

const transaction = exports.transaction = pool => {
    return async operation => {
        const connection = await pool.getConnection();
        try {
            // 开始事务
            await connection.beginTransaction();
            // 进行事务操作
            const result = await operation(connection);
            // 提交事务
            await connection.commit();
            // 返回事务操作结果
            return Promise.resolve(result);
        } catch (e) {
            // 发生错误，回滚并且抛出异常
            await connection.rollback();
            throw e;
        } finally {
            // 释放 MySQL 连接
            await pool.releaseConnection(connection);
        }
    };
};

// export const poolOfAdm = pool(MYSQL.ADM)
const poolOfIou = exports.poolOfIou = pool(_config.MYSQL.IOU);
// export const poolOfAuth = pool(MYSQL.AUTH)
const transactionOfAdm = exports.transactionOfAdm = transaction(poolOfAdm);
const transactionOfIou = exports.transactionOfIou = transaction(poolOfIou);
const transactionOfAuth = exports.transactionOfAuth = transaction(poolOfAuth);