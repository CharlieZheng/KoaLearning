const {query} = require(`./base/query.js`)
let create_table = `create table if not exists user (
                    user_id int(5) not null auto_increment,
                    user_name varchar(255) not null,
                    user_phone varchar(255) not null,
                    primary key (user_id)
);`.replace(/[\r\n]/g, "")

let query_table = (tableName) => `select * from ${tableName}`
let insert_table = (tableName, {key, val}) => `insert into ${tableName} (${key}) values (${val})`

module.exports = {
    "GET /create_table": async (ctx, next) => {
        console.log(`创建 user 表`)
        await query(create_table)
        ctx.render("table_mgr.html")
    },

    "POST /user/insert": async (ctx, next) => {
        let user_id = ctx.request.body.user_id
        let user_name = ctx.request.body.user_name
        let user_phone = ctx.request.body.user_phone

        console.log(`插入 user ${user_id} ${user_name} ${user_phone}`)
        if (!user_id) user_id = 1
        if (!user_name) user_name = "郑汉荣"
        if (!user_phone) user_phone = '13500052765'
        let userId = await query(`select user_id from user where user_id = "${user_id}"`)
        console.log(`查询结果：${userId}`)
        let temp = insert_table(`user`, {
                key: [`user_id`, `user_name`, `user_phone`],
                val: [`${user_id || 1}`, `"${user_name || "郑汉荣"}"`, `"${user_phone || "13500052765"}"`]
            }
        )
        console.log(temp)
        await query(temp)


        ctx.render("table_mgr.html")
    },
}