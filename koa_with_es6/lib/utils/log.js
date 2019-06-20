'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logger = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _hashids = require('hashids');

var _hashids2 = _interopRequireDefault(_hashids);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _config = require('../config');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

const logger = exports.logger = _bunyan2.default.createLogger({name: 'iou-server', level: 'debug'});

// 初始化hash算法
const hashIds = new _hashids2.default(_config.HASHKEY, 8);

// 当前进程id
const processId = process.pid;

const log = async (ctx, next) => {
    const start = (0, _moment2.default)();
    const headers = ctx.headers;
    const requestIp = headers['x-forwarded-for'] ? headers['x-forwarded-for'].split(',')[0] : headers['X-Real-IP'] || '0.0.0.0';
    const requestAgent = headers['user-agent'];
    const requestClient = headers['x-user-client'];
    const requestMethod = ctx.method;
    const requestHeaders = headers;
    const requestUrl = ctx.request.path;
    const requestQuery = ctx.request.query;
    const requestBody = ctx.request.body;
    const startUnixTime = start.valueOf();
    let requestId = '';
    if (requestUrl.startsWith('/api/')) {
        // 根据当前进程号，unix时间戳，1-3位随机数组合生成hashId
        requestId = hashIds.encode([processId, startUnixTime, _lodash2.default.random(0, 999)]);
        ctx.state = ctx.state || {};
        ctx.state['requestId'] = requestId;
        ctx.state['requestIp'] = requestIp;
        ctx.state['requestAgent'] = requestAgent;
        ctx.state['requestClient'] = requestClient;
    }
    await next();
    const responseHeaders = ctx.response.headers || [];
    const responseBody = ctx.body || {};
    const responseStatus = ctx.status;
    const ms = (0, _moment2.default)().valueOf() - startUnixTime;
    logger.debug({
        createTime: start.format('YYYY-MM-DD HH:mm:ss'),
        requestId,
        requestIp,
        requestMethod,
        requestUrl,
        responseStatus,
        responseTimes: ms,
        requestHeaders,
        requestQuery,
        requestBody,
        responseHeaders,
        responseBody
    });
};

exports.default = log;