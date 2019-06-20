'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeChannelNo = exports.encodeChannelId = exports.getImageSize = exports.getSearchNameOrSearchMobile = exports.decodeMobile = exports.encodeMobile = exports.generateIouNo = exports.getDays = exports.compareDate = exports.generateEncryptedPwd = exports.generatePwdSalt = exports.generateTokenSecret = exports.getAppType = exports.checkCommonToken = exports.createCommonToken = exports.checkMobileToken = exports.createMobileToken = exports.checkPwdToken = exports.createPwdToken = exports.createIouToken = exports.verifyToken = exports.createToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _randomatic = require('randomatic');

var _randomatic2 = _interopRequireDefault(_randomatic);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _redis = require('../stores/redis');

var _redis2 = _interopRequireDefault(_redis);

var _hashids = require('hashids');

var _hashids2 = _interopRequireDefault(_hashids);

var _probeImageSize = require('probe-image-size');

var _probeImageSize2 = _interopRequireDefault(_probeImageSize);

var _config = require('../config');

var _constant = require('./constant');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

const createToken = exports.createToken = async ({userId, userAgent}) => {
    const token = _jsonwebtoken2.default.sign({
        userId,
        userAgent,
        renewTime: (0, _moment2.default)().add(1, 'h').unix()
    }, _config.TOKEN.SECRET_KEY, {
        expiresIn: `${_config.TOKEN.EXPIRES_DAYS}d`
    });
    return token;
};

const verifyToken = exports.verifyToken = async ({token, userAgent}) => {
    const payload = _jsonwebtoken2.default.verify(token, _config.TOKEN.SECRET_KEY);
    if (payload.userAgent !== userAgent) {
        throw new Error('用户代理与TOKEN中信息不一致');
    }
    return payload;
};

const createIouToken = exports.createIouToken = ({creatorId, iouId, createTime}) => {
    return (0, _md2.default)(`${creatorId}-${iouId}-${new Date(createTime).getTime()}`);
};

const createPwdToken = exports.createPwdToken = async ({userId}) => {
    const token = (0, _md2.default)(`${userId}-${new Date().getTime()}`);
    const seconds = 7 * 24 * 60 * 60;
    const checkKey = `${_constant.REDIS_KEY.PWD_CREATE_TOKEN_CHECK}:${userId}`;
    await _redis2.default.setexAsync(checkKey, seconds, token);
    return token;
};

const checkPwdToken = exports.checkPwdToken = async ({userId, token}) => {
    const checkKey = `${_constant.REDIS_KEY.PWD_CREATE_TOKEN_CHECK}:${userId}`;
    const ret = await _redis2.default.getAsync(checkKey);
    if (!ret || ret !== token) {
        return false;
    } else {
        await _redis2.default.delAsync(checkKey);
        return true;
    }
};

const createMobileToken = exports.createMobileToken = async ({userId}) => {
    const token = (0, _md2.default)(`${userId}-${new Date().getTime()}`);
    const seconds = 7 * 24 * 60 * 60;
    const checkKey = `${_constant.REDIS_KEY.MOBILE_CHANGE_TOKEN_CHECK}:${userId}`;
    await _redis2.default.setexAsync(checkKey, seconds, token);
    return token;
};

const checkMobileToken = exports.checkMobileToken = async ({userId, token}) => {
    const checkKey = `${_constant.REDIS_KEY.MOBILE_CHANGE_TOKEN_CHECK}:${userId}`;
    const ret = await _redis2.default.getAsync(checkKey);
    if (!ret || ret !== token) {
        return false;
    } else {
        await _redis2.default.delAsync(checkKey);
        return true;
    }
};

// commonToken拥有5分钟的有效时长
const createCommonToken = exports.createCommonToken = async () => {
    const token = (0, _md2.default)(`${new Date().getTime()}${(0, _randomatic2.default)('*', 10)}`);
    const seconds = 5 * 60;
    const checkKey = `${_constant.REDIS_KEY.COMMON_TOKEN_CHECK}:${token}`;
    await _redis2.default.setexAsync(checkKey, seconds, token);
    return token;
};

const checkCommonToken = exports.checkCommonToken = async ({token}) => {
    const checkKey = `${_constant.REDIS_KEY.COMMON_TOKEN_CHECK}:${token}`;
    const ret = await _redis2.default.getAsync(checkKey);
    if (!ret || ret !== token) {
        return false;
    } else {
        return true;
    }
};

const getAppType = exports.getAppType = ({clientType}) => {
    switch (clientType) {
        case _constant.CLIENT_TYPE.WECHAT:
            return _constant.APP_TYPE.WECHAT;
        case _constant.CLIENT_TYPE.IOS:
        case _constant.CLIENT_TYPE.ANDROID:
            return _constant.APP_TYPE.APP;
    }
};

const generateTokenSecret = exports.generateTokenSecret = () => {
    return (0, _randomatic2.default)('*', 10);
};

const generatePwdSalt = exports.generatePwdSalt = () => {
    return (0, _randomatic2.default)('*', 10);
};

const generateEncryptedPwd = exports.generateEncryptedPwd = ({password, salt}) => {
    return (0, _md2.default)((0, _md2.default)(`${password}${salt.slice(0, 5)}`) + salt.slice(-5).toString());
};

const compareDate = exports.compareDate = (date1, date2, type = 'second') => {
    if ((0, _moment2.default)(date1).isSame(date2, type)) {
        return 0;
    }
    if ((0, _moment2.default)(date1).isBefore(date2, type)) {
        return -1;
    }
    if ((0, _moment2.default)(date1).isAfter(date2, type)) {
        return 1;
    }
};

const getDays = exports.getDays = (date1, date2) => {
    return Math.abs((0, _moment2.default)(date1).hour(0).minute(0).second(0).millisecond(0).diff((0, _moment2.default)(date2).hour(0).minute(0).second(0).millisecond(0), 'days'));
};

const generateIouNo = exports.generateIouNo = ({iouId, createTime}) => {
    const hashids = new _hashids2.default('WWW.KKIOU.COM@0408', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
    return `${parseInt((0, _moment2.default)(createTime).format('YYYYMMDD')).toString(16).toUpperCase().padStart(8, 'I')}${hashids.encode(iouId).toUpperCase()}`;
};

const encodeMobile = exports.encodeMobile = ({mobile}) => {
    if (!mobile) {
        return null;
    }
    const hashids = new _hashids2.default('WWW.KKIOU.COM@QYJV8XMXE5', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
    mobile = hashids.encode(mobile.toString().replace(/[^0-9]/g, ''));
    return mobile;
};

const decodeMobile = exports.decodeMobile = ({mobile}) => {
    if (!mobile) {
        return mobile;
    }
    const hashids = new _hashids2.default('WWW.KKIOU.COM@QYJV8XMXE5', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
    mobile = hashids.decode(mobile)[0].toString();
    return mobile;
};

const getSearchNameOrSearchMobile = exports.getSearchNameOrSearchMobile = ({searchContent}) => {
    let searchName;
    let searchMobile;
    searchContent = !searchContent ? searchContent : searchContent.trim();
    if (searchContent) {
        if (/^[0-9]+$/g.test(searchContent)) {
            searchMobile = searchContent;
        } else {
            searchName = searchContent;
        }
    }
    return {searchName, searchMobile};
};

const getImageSize = exports.getImageSize = async ({url}) => {
    const {width, height} = await (0, _probeImageSize2.default)(url);
    return {width, height};
};

const encodeChannelId = exports.encodeChannelId = ({channelId}) => {
    if (!channelId) {
        return null;
    }
    const hashids = new _hashids2.default('WWW.KKIOU.COM@QYJV8XMXE5', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
    const channelNo = hashids.encode(channelId.toString().replace(/[^0-9]/g, ''));
    return channelNo;
};

const decodeChannelNo = exports.decodeChannelNo = ({channelNo}) => {
    if (!channelNo) {
        return null;
    }
    const hashids = new _hashids2.default('WWW.KKIOU.COM@QYJV8XMXE5', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
    const channelId = hashids.decode(channelNo)[0].toString();
    return channelId;
};