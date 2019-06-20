'use strict';

var _index = require('../utils/joi/index');

var _index2 = _interopRequireDefault(_index);

var _wrapRoute = require('../utils/wrapRoute');

var _me = require('../daos/me/me');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

let registerAction = async (ctx, next) => {

    const schema = _index2.default.object().keys({
        name: _index2.default.string().required().label('用户账号'),
        phone: _index2.default.string().required().label('手机号码'),
        otp: _index2.default.string().optional().label('短信验证码'),
        psw: _index2.default.string().required().label('登录密码')
    });
    const {name, phone, otp, psw} = (0, _index.validate)(ctx.request.body, schema);

    /* let name = ctx.request.body.name
     let phone = ctx.request.body.phone
     let otp = ctx.request.body.otp
     let psw = ctx.request.body.psw*/
    if (!name || !phone || !psw) {
        let body = {};
        body['error'] = '某些字段为空';

        ctx.status = 400;
        ctx.response.body = JSON.stringify(body);
        ctx.response.type = "text/json";
        return;
    }
    let result = await (0, _me.userExist)({name, phone});
    if (result.length > 0) {
        let body = {};
        body['error'] = '用户名或手机号码已被注册，您可通过用户名或手机号码登录';

        ctx.status = 400;
        ctx.response.body = JSON.stringify(body);
        ctx.response.type = "text/json";
        return;
    }

    // result = await query(`insert into user (user_name, user_phone, psw) values ('${name}', '${phone}', '${psw}')`)
    let body = {};
    body['msg'] = '恭喜，注册成功！';
    ctx.response.body = JSON.stringify(body);
    ctx.response.code = 200;
    ctx.response.type = "text/json";
}; // const {query} = require("../data_source/base/query.js")


let register = (0, _wrapRoute.wrapRoute)(registerAction);
module.exports = {
    "POST /me/register": register
};