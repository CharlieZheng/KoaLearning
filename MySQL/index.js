const mysql = require("promise-mysql")

const acl = mysql.createPool({
  host: "localhost",
  database: "admin",
  user: "root",
  password: "88888888",
  port: 3306
})

acl.on("connection", (conn) => {
  conn.on("error", err => { console.log("数据库连接失败") })
  conn.on("end", err => { console.log("数据库连接结束") })
})
acl.query()