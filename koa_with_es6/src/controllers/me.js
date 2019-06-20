const {query} = require("../data_source/base/query.js")
import Joi, {validate} from '../utils/joi/index'
import {wrapRoute} from '../utils/wrapRoute'
import {userExist} from '../daos/me/me'

let registerAction = async (ctx, next) => {


    const schema = Joi.object().keys({
        name: Joi.string().required().label('用户账号'),
        phone: Joi.string().required().label('手机号码'),
        otp: Joi.string().optional().label('短信验证码'),
        psw: Joi.string().required().label('登录密码')
    })
    const {name, phone, otp, psw} = validate(ctx.request.body, schema)


    /* let name = ctx.request.body.name
     let phone = ctx.request.body.phone
     let otp = ctx.request.body.otp
     let psw = ctx.request.body.psw*/
    if (!name ||
        !phone ||
        !psw) {
        let body = {}
        body['error'] = '某些字段为空'

        ctx.status = 400
        ctx.response.body = JSON.stringify(body)
        ctx.response.type = "text/json"
        return
    }
    let result = await userExist({name, phone})
    if (result.length > 0) {
        let body = {}
        body['error'] = '用户名或手机号码已被注册，您可通过用户名或手机号码登录'

        ctx.status = 400
        ctx.response.body = JSON.stringify(body)
        ctx.response.type = "text/json"
        return
    }

    result = await query(`insert into user (user_name, user_phone, psw) values ('${name}', '${phone}', '${psw}')`)
    return {
        "msg": "恭喜，注册成功！"
    }


}

let register = wrapRoute(registerAction)
module.exports = {
    "POST /me/register": register
}