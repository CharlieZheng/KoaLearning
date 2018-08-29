
const axios = require('axios')
const sha1 = require('js-sha1')
const qs = require('qs')
const $ = axios.create({
  baseURL: 'http://api-cn.ronghub.com',
  headers: {
    'App-Key': 'vnroth0kvbqzo', 'Content-Type': 'application/x-www-form-urlencoded',
    'Host': 'api-cn.ronghub.com', 'User-Agent': ''
  }
})
const getToken = async (ctx, next) => {
  const p = {
    'userId': ctx.query.userId,
    'name': ctx.query.name,
    'portraitUri': ctx.query.portraitUri
  }
  const appSecret = 'ovtv0tYjEHM8'
  const nonce = parseInt(Math.random() * Number.MAX_SAFE_INTEGER)
  const timestamp = new Date().getTime()
  const signature = sha1(`${appSecret}${nonce}${timestamp}`)
  let response
  try {
    response = await $.post('/user/getToken.json', qs.stringify(p), { headers: { Nonce: nonce, Timestamp: timestamp, Signature: signature } })
  } catch (e) {
    console.log(`error: ${e.code}`)
    ctx.response.body = 'error'
    return
  }
  if (!response ||
    !response.data) {
    ctx.response.body = 'error'
    return
  }
  const data = response.data
  ctx.response.body = data
}

const refresh = async (ctx, next) => {
  ctx.response.body = 'refresh'
}

module.exports = {
  "GET /user/getToken": getToken,
  "GET /user/refresh": refresh
}