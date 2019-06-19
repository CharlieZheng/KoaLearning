'use strict';

const { query } = require("../data_source/base/query.js");
let register = async (ctx, next) => {
    let name = ctx.request.body.name;
    let phone = ctx.request.body.phone;
    let otp = ctx.request.body.otp;
    let psw = ctx.request.body.psw;
    if (!name || !phone || !psw) {
        let body = {};
        body['error'] = '某些字段为空';

        ctx.status = 400;
        ctx.response.body = JSON.stringify(body);
        ctx.response.type = "text/json";
        return;
    }
    let result = await query(`select user_id from user where user_name = '${name}' or user_phone = '${phone}'`);
    if (result.length > 0) {
        let body = {};
        body['error'] = '用户名或手机号码已被注册，您可通过用户名或手机号码登录';

        ctx.status = 400;
        ctx.response.body = JSON.stringify(body);
        ctx.response.type = "text/json";
        return;
    }

    result = await query(`insert into user (user_name, user_phone, psw) values ('${name}', '${phone}', '${psw}')`);
    let body = {};
    body['msg'] = '恭喜，注册成功！';
    ctx.response.body = JSON.stringify(body);
    ctx.response.code = 200;
    ctx.response.type = "text/json";
};
module.exports = {
    "POST /me/register": register
};