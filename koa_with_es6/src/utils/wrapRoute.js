import moment from 'moment'
import {createToken, verifyToken} from './index'
import {BusinessError} from './error'
// import { checkOpenToken } from '../services/open'
import {logger} from './log'

export const wrapRoute = (fn, requireAuth) => {
    const generateResponse = ({ctx, requestId, payload, error, status}) => {
        ctx.body = {
            requestId,
            payload: payload || null,
            error: error || null
        }
        ctx.status = status
    }
    return async (ctx) => {
        const requestId = ctx.state.requestId
        const requestAgent = ctx.state.requestAgent
        if (requireAuth) {
            try {
                const authorization = ctx.request.headers.authorization
                const token = authorization.split(' ')[1]
                const {userId, userAgent, renewTime} = await verifyToken({token, userAgent: requestAgent})

                ctx.state.userId = userId
                // 判断是否需要续期TOKEN
                if (renewTime < moment().unix()) {
                    const newToken = await createToken({userId, userAgent})
                    ctx.response.set('x-user-token', newToken)
                }
            } catch (e) {
                return generateResponse({
                    ctx,
                    requestId,
                    error: '未授权的访问',
                    status: 401
                })
            }
        }

        try {
            const payload = await fn.apply(ctx, [ctx])
            return generateResponse({
                ctx,
                requestId,
                payload,
                status: 200
            })
        } catch (e) {
            logger.debug(e, ctx.state.requestId)

            let message
            let status
            if (e instanceof BusinessError) {
                message = e.message
                status = 400
            } else {
                message = '服务器处理异常'
                status = 500
            }

            return generateResponse({
                ctx,
                requestId,
                error: message,
                status
            })
        }
    }
}

export const wrapOpenRoute = (fn) => {
    const generateResponse = ({ctx, error, payload, status}) => {
        ctx.status = status
        if (status === 200) {
            ctx.body = {
                msg: error || 'success',
                code: error ? -1 : 0,
                ...payload
            }
        }
    }
    return async (ctx) => {
        const token = ctx.request.query.token
        if (!token) {
            return generateResponse({
                ctx,
                status: 404
            })
        }
        delete ctx.request.query.token

        const tokenIsValid = await checkOpenToken({token})
        if (!tokenIsValid) {
            return generateResponse({
                ctx,
                status: 404
            })
        }

        try {
            const payload = await fn.apply(ctx, [ctx])
            return generateResponse({
                ctx,
                payload,
                status: 200
            })
        } catch (e) {
            logger.debug(e, ctx.state.requestId)

            let message
            let status
            if (e instanceof BusinessError) {
                message = e.message
                status = 200
            } else {
                message = '服务器处理异常'
                status = 200
            }

            return generateResponse({
                ctx,
                error: message,
                status
            })
        }
    }
}
