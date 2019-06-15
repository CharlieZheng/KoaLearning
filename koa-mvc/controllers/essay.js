const {query} = require("../data_source/base/query.js")
let createEssay = async (ctx, next) => {
    let title = ctx.request.body.title
    let content = ctx.request.body.content
    let author = ctx.request.body.author
    let createTime = new Date().getTime()
    if (!title ||
        !content ||
        !author) {
        ctx.status = 400
        ctx.response.body = '{"error":"作者、标题或内容不能为空"}'
        ctx.response.type = "text/json"
        return
    }
    let sql = `insert into essay (createTime, author, title, essayContent) values (${createTime}, '${author}', '${title}', '${content}')`
    console.log(sql)
    let result = await query(sql)


    console.log(JSON.stringify(result))
    ctx.response.body = result
    ctx.response.code = 200
    ctx.response.type = "text/json"

}
let getEssayList = async (ctx, next) => {
    let sql = `select essayId, essayContent, title, author from essay`
    let result = await query(sql)


    ctx.response.body = result
    ctx.response.code = 200
    ctx.response.type = "text/json"

}
module.exports = {
    "POST /essay/createEssay": createEssay,
    "GET /essay/essayList": getEssayList
}