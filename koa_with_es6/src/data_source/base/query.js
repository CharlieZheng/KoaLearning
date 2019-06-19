let mysql = require('promise-mysql')
let mysql_config = require('./mysql_config.js')

let pool = mysql.createPool(mysql_config)
let query = (sql, val) => {
    return new Promise(
        (resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) return reject(err)
                connection.query(sql, val, (err, fields) => {
                    if (err) return reject(err)
                    resolve(fields)
                    connection.release()
                })
            })
        }
    )
}
module.exports = {query}