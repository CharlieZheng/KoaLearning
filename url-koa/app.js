const Koa = require("koa")
const app = new Koa()
const controller = require("./controllers/controller")
const bodyParser = require('koa-bodyparser');

app.use(bodyParser())
app.use(a())
app.use(controller())
app.listen(3000)

function a() {
    return (ctx, next) => {
        console.log(ctx.body)
        next()
    }
}