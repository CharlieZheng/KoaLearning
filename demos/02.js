const Koa = require('koa');
const app = new Koa();


let sleep = async (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}

const lazy = async(ctx) => {
    await sleep(4)
    ctx.response.body = '{"Hello":"Hello"}';
    ctx.response.type = "text/json"

}
const main = async function (ctx) {
    await lazy(ctx)
};


// app.use(lazy);
app.use(main);
app.listen(3000);
