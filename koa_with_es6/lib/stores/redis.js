'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../config');

var _log = require('../utils/log');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);
_bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);

const options = {
    host: _config.REDIS.host,
    port: _config.REDIS.port
};
if (_config.ENV_PRODUCTION) {
    options.password = _config.REDIS.password;
}
const client = _redis2.default.createClient(options);

client.on('connect', () => {
    _log.logger.debug('REDIS数据库已连接');
});

client.on('ready', () => {
    _log.logger.debug('REDIS数据库已准备好');
});

client.on('error', err => {
    _log.logger.debug('REDIS数据库错误:%s', err);
});

exports.default = client;