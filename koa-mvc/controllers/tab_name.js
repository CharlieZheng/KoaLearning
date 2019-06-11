const {query} = require("../data_source/base/query.js")
let getTabList = async (ctx, next) => {
    let result = await query(`select * from tab_name`)
    result = JSON.stringify(result)
    // result.forEach((
    //     item
    // ) =>{
    //     item.
    // })
    ctx.response.body = result
    ctx.response.code = 200
    ctx.response.type = "text/json"
}
module.exports = {
    "GET /tab/tabList": getTabList
}