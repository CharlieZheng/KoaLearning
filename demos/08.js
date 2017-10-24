const Koa = require('koa');
const app = new Koa();

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  ctx.response.body = `${Date.now()} ${ctx.request.method} ${ctx.request.url}`
  next();
}

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(logger);
app.use(main); // 这里指logger里的next
app.listen(3000);
