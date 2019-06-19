import jwt from 'jsonwebtoken'
import moment from 'moment'
import randomize from 'randomatic'
import md5 from 'md5'
import redis from '../stores/redis'
import Hashids from 'hashids'
import probe from 'probe-image-size'
import {TOKEN} from '../config'
import {APP_TYPE, CLIENT_TYPE, REDIS_KEY} from './constant'

export const createToken = async ({userId, userAgent}) => {
    const token = jwt.sign({
        userId,
        userAgent,
        renewTime: moment().add(1, 'h').unix()
    }, TOKEN.SECRET_KEY, {
        expiresIn: `${TOKEN.EXPIRES_DAYS}d`
    })
    return token
}

export const verifyToken = async ({token, userAgent}) => {
    const payload = jwt.verify(token, TOKEN.SECRET_KEY)
    if (payload.userAgent !== userAgent) {
        throw new Error('用户代理与TOKEN中信息不一致')
    }
    return payload
}

export const createIouToken = ({creatorId, iouId, createTime}) => {
    return md5(`${creatorId}-${iouId}-${(new Date(createTime)).getTime()}`)
}

export const createPwdToken = async ({userId}) => {
    const token = md5(`${userId}-${(new Date()).getTime()}`)
    const seconds = 7 * 24 * 60 * 60
    const checkKey = `${REDIS_KEY.PWD_CREATE_TOKEN_CHECK}:${userId}`
    await redis.setexAsync(checkKey, seconds, token)
    return token
}

export const checkPwdToken = async ({userId, token}) => {
    const checkKey = `${REDIS_KEY.PWD_CREATE_TOKEN_CHECK}:${userId}`
    const ret = await redis.getAsync(checkKey)
    if (!ret || ret !== token) {
        return false
    } else {
        await redis.delAsync(checkKey)
        return true
    }
}

export const createMobileToken = async ({userId}) => {
    const token = md5(`${userId}-${(new Date()).getTime()}`)
    const seconds = 7 * 24 * 60 * 60
    const checkKey = `${REDIS_KEY.MOBILE_CHANGE_TOKEN_CHECK}:${userId}`
    await redis.setexAsync(checkKey, seconds, token)
    return token
}

export const checkMobileToken = async ({userId, token}) => {
    const checkKey = `${REDIS_KEY.MOBILE_CHANGE_TOKEN_CHECK}:${userId}`
    const ret = await redis.getAsync(checkKey)
    if (!ret || ret !== token) {
        return false
    } else {
        await redis.delAsync(checkKey)
        return true
    }
}

// commonToken拥有5分钟的有效时长
export const createCommonToken = async () => {
    const token = md5(`${(new Date()).getTime()}${randomize('*', 10)}`)
    const seconds = 5 * 60
    const checkKey = `${REDIS_KEY.COMMON_TOKEN_CHECK}:${token}`
    await redis.setexAsync(checkKey, seconds, token)
    return token
}

export const checkCommonToken = async ({token}) => {
    const checkKey = `${REDIS_KEY.COMMON_TOKEN_CHECK}:${token}`
    const ret = await redis.getAsync(checkKey)
    if (!ret || ret !== token) {
        return false
    } else {
        return true
    }
}

export const getAppType = ({clientType}) => {
    switch (clientType) {
        case CLIENT_TYPE.WECHAT:
            return APP_TYPE.WECHAT
        case CLIENT_TYPE.IOS:
        case CLIENT_TYPE.ANDROID:
            return APP_TYPE.APP
    }
}

export const generateTokenSecret = () => {
    return randomize('*', 10)
}

export const generatePwdSalt = () => {
    return randomize('*', 10)
}

export const generateEncryptedPwd = ({password, salt}) => {
    return md5(md5(`${password}${salt.slice(0, 5)}`) + salt.slice(-5).toString())
}

export const compareDate = (date1, date2, type = 'second') => {
    if (moment(date1).isSame(date2, type)) {
        return 0
    }
    if (moment(date1).isBefore(date2, type)) {
        return -1
    }
    if (moment(date1).isAfter(date2, type)) {
        return 1
    }
}

export const getDays = (date1, date2) => {
    return Math.abs(moment(date1).hour(0).minute(0).second(0).millisecond(0).diff(moment(date2).hour(0).minute(0).second(0).millisecond(0), 'days'))
}

export const generateIouNo = ({iouId, createTime}) => {
    const hashids = new Hashids('WWW.KKIOU.COM@0408', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
    return `${parseInt(moment(createTime).format('YYYYMMDD')).toString(16).toUpperCase().padStart(8, 'I')}${hashids.encode(iouId).toUpperCase()}`
}

export const encodeMobile = ({mobile}) => {
    if (!mobile) {
        return null
    }
    const hashids = new Hashids('WWW.KKIOU.COM@QYJV8XMXE5', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
    mobile = hashids.encode(mobile.toString().replace(/[^0-9]/g, ''))
    return mobile
}

export const decodeMobile = ({mobile}) => {
    if (!mobile) {
        return mobile
    }
    const hashids = new Hashids('WWW.KKIOU.COM@QYJV8XMXE5', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
    mobile = hashids.decode(mobile)[0].toString()
    return mobile
}

export const getSearchNameOrSearchMobile = ({searchContent}) => {
    let searchName
    let searchMobile
    searchContent = !searchContent ? searchContent : searchContent.trim()
    if (searchContent) {
        if ((/^[0-9]+$/g).test(searchContent)) {
            searchMobile = searchContent
        } else {
            searchName = searchContent
        }
    }
    return {searchName, searchMobile}
}

export const getImageSize = async ({url}) => {
    const {width, height} = await probe(url)
    return {width, height}
}

export const encodeChannelId = ({channelId}) => {
    if (!channelId) {
        return null
    }
    const hashids = new Hashids('WWW.KKIOU.COM@QYJV8XMXE5', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
    const channelNo = hashids.encode(channelId.toString().replace(/[^0-9]/g, ''))
    return channelNo
}

export const decodeChannelNo = ({channelNo}) => {
    if (!channelNo) {
        return null
    }
    const hashids = new Hashids('WWW.KKIOU.COM@QYJV8XMXE5', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')
    const channelId = hashids.decode(channelNo)[0].toString()
    return channelId
}
