'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const ENV_PRODUCTION = exports.ENV_PRODUCTION = process.env.NODE_ENV === 'production';
const WEB_URL = exports.WEB_URL = '';
const PRODUCT_NAME = exports.PRODUCT_NAME = '现金贷';

const MYSQL = exports.MYSQL = ENV_PRODUCTION ? {
    ADM: {
        username: 'root',
        password: 'uihr77YPb5EmerHcB39IbPFEAcEyash1',
        database: 'adm',
        host: 'mysql.server.com',
        port: 3306,
        pool: {maxConnections: 8, maxIdleTime: 3000}
    },
    IOU: {
        username: 'root',
        password: 'uihr77YPb5EmerHcB39IbPFEAcEyash1',
        database: 'iou',
        host: 'mysql.server.com',
        port: 3306,
        pool: {maxConnections: 8, maxIdleTime: 3000}
    },
    AUTH: {
        username: 'root',
        password: 'uihr77YPb5EmerHcB39IbPFEAcEyash1',
        database: 'auth',
        host: 'mysql.server.com',
        port: 3306,
        pool: {maxConnections: 8, maxIdleTime: 3000}
    }
} : {
    ADM: {
        username: 'root',
        password: '123456',
        database: 'ioucombine_adm',
        host: 'www.server.com',
        port: 3306,
        pool: {maxConnections: 5, maxIdleTime: 3000}
    },
    IOU: {

        host: 'localhost',
        port: 3306,
        database: "cgf",
        user: 'root',
        password: "123456",

        pool: {maxConnections: 5, maxIdleTime: 3000}
    },
    AUTH: {
        username: 'root',
        password: '123456',
        database: 'ioucombine_auth',
        host: 'www.server.com',
        port: 3306,
        pool: {maxConnections: 5, maxIdleTime: 3000}
    }
};

const REDIS = exports.REDIS = ENV_PRODUCTION ? {
    host: 'redis.server.com',
    port: 6379,
    password: 'aX6yHZu3N6Q1gAvd0XhtckEnBxs3Rlvh'
} : {
    host: 'www.server.com',
    port: 6379,
    password: ''
};

const TOKEN = exports.TOKEN = {
    SECRET_KEY: '$su>S$D~',
    EXPIRES_DAYS: 7
};

const HASHKEY = exports.HASHKEY = '1*WmG.>o?}';

const WECHAT = exports.WECHAT = {
    WECHAT: ENV_PRODUCTION ? {
        APPID: '',
        APPSECRET: '',
        TOKEN: '',
        MCH_ID: '',
        API_KEY: '',
        TRADE_TYPE: 'JSAPI',
        NOTIFY_URL: `${WEB_URL}/api/common/payments/callback/wx`
    } : {
        APPID: '',
        APPSECRET: '',
        TOKEN: '',
        MCH_ID: '',
        API_KEY: '',
        TRADE_TYPE: 'JSAPI',
        NOTIFY_URL: `${WEB_URL}/api/common/payments/callback/wx`
    },
    APP: ENV_PRODUCTION ? {
        APPID: '',
        APPSECRET: '',
        TOKEN: '',
        MCH_ID: '',
        API_KEY: '',
        TRADE_TYPE: 'APP',
        NOTIFY_URL: `${WEB_URL}/api/common/payments/callback/app`
    } : {
        APPID: '',
        APPSECRET: '',
        TOKEN: '',
        MCH_ID: '',
        API_KEY: '',
        TRADE_TYPE: 'APP',
        NOTIFY_URL: `${WEB_URL}/api/common/payments/callback/app`
    },
    JS_API_LIST: ['onMenuShareAppMessage', 'chooseWXPay']
};

const CONFIG_VALUE_TYPE = exports.CONFIG_VALUE_TYPE = {
    STRING: 'STRING',
    NUMBER: 'NUMBER',
    BOOLEAN: 'BOOLEAN',
    OBJECT: 'OBJECT'
};

const COMPANY = exports.COMPANY = {
    NAME: '',
    CREDIT_CODE: ''
};

const VERIFY_REAL_CONFIG = exports.VERIFY_REAL_CONFIG = {
    name: 'kkiou',
    token: 'sgjW1XlK67yPCCp6xyIVfifUPcdjAGVp',
    factor2url: 'http://api.zneuron.com/api/check/factor2',
    bfactor4url: 'http://api.zneuron.com/api/check/bfactor4'
};