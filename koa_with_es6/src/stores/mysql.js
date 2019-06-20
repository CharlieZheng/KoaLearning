import mysql from 'promise-mysql'
import {MYSQL} from '../config'
import {logger} from '../utils/log'

export let pool = async (options) => {
    const pool = await mysql.createPool({
        host: options.host,
        port: options.port,
        user: options.username,
        password: options.password,
        database: options.database,
        connectionLimit: 10
    })
    pool.on(
        'connection', (connection) => {
            logger.debug('MYSQL数据库连接已分配')
            connection.on('error', (err) => {
                logger.debug('MYSQL数据库操作错误:%s', err)
            })
            connection.on('end', (err) => {
                logger.debug('MYSQL数据库连接结束:%s', err)
            })
        })

    return pool
}

export const transaction = (pool) => {
    return async (operation) => {
        const connection = await pool.getConnection()
        try {
            // 开始事务
            await connection.beginTransaction()
            // 进行事务操作
            const result = await operation(connection)
            // 提交事务
            await connection.commit()
            // 返回事务操作结果
            return Promise.resolve(result)
        } catch (e) {
            // 发生错误，回滚并且抛出异常
            await connection.rollback()
            throw e
        } finally {
            // 释放 MySQL 连接
            await pool.releaseConnection(connection)
        }
    }
}

// export const poolOfAdm = pool(MYSQL.ADM)
export const poolOfIou = pool(MYSQL.IOU)
// export const poolOfAuth = pool(MYSQL.AUTH)
export const transactionOfIou = transaction(poolOfIou)
