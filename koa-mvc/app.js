"use strict"
const Koa = require("koa")
const app = new Koa()
const templating = require("./templating")
const bodyParser = require("koa-bodyparser")
const controller = require("./controller")
const isProduction = process.env.NODE_ENV === "production"
const cors = require("koa2-cors")
app.use(cors())
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next(); // 运行下一个中间件，在这之后的代码将在所有中间件执行完毕后执行
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
})

if (!isProduction) {
    let staticFiles = require("./static-files")
    app.use(staticFiles("/static/", __dirname + "/static"))

}
app.use(bodyParser())
/*
app.use(templating("koa-mvc/views", {
  noCache: !isProduction,
  watch: !isProduction
}))
*/
app.use(templating("views", {
    noCache: !isProduction,
    watch: !isProduction
}))

app.use(controller())
app.use(controller(`data_source`))
app.listen(3000)