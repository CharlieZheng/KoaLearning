import redis from 'redis'
import bluebird from 'bluebird'
import {ENV_PRODUCTION, REDIS} from '../config'
import {logger} from '../utils/log'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const options = {
    host: REDIS.host,
    port: REDIS.port
}
if (ENV_PRODUCTION) {
    options.password = REDIS.password
}
const client = redis.createClient(options)

client.on('connect', () => {
    logger.debug('REDIS数据库已连接')
})

client.on('ready', () => {
    logger.debug('REDIS数据库已准备好')
})

client.on('error', (err) => {
    logger.debug('REDIS数据库错误:%s', err)
})

export default client
