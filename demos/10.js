const fs = require('fs.promised');
const Koa = require('koa');
const app = new Koa();

const main = async function (ctx, next) {
   await setTimeout(() => {
        ctx.response.type = 'html';
        ctx.response.body =await fs.readFile('./demos/template.html', 'utf8');
    }, 3000)

};

app.use(main);
app.listen(3000);
