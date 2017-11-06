const Koa = require("koa")
const Pug = require("koa-pug")
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")
const app = new Koa()
const mount = require("koa-mount")
const serve = require("koa-static")
const {resolve} = require("path")
const router = new Router()
app.use(bodyParser())
app.use(mount('/assets', serve('./views/assets')))
new Pug({
    viewPath: resolve(__dirname, "views"),
    debug: true,
    noCache: false,
    pretty: false,
    compileDebug: false,
    basedir: resolve(__dirname, "views"),
    helperPath: [
        {_: require('lodash')},
        {querystring: require('querystring')},
        {moment: require('moment')}
    ],
    app
})


router.get("/e", async(ctx) =>{
    console.log("/e")
})

router.all("/", async (ctx) => {
    ctx.render("index.pug", {user: {username: "43243"}})
})
app.use(router.routes())

app.listen(3000)