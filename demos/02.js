const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.body = '{"Hello":"Hello"}';
  ctx.response.type = "text/json"
};

app.use(main);
app.listen(3000);
