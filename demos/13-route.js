const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

const redirect = ctx => {
  ctx.response.redirect('/fe');
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const main1 = ctx => {
    ctx.response.body = 'Hello World1';
};


app.use(route.get('/fe', main));
app.use(route.get('/redirect', redirect));

// app.use(main1);
app.listen(3000);
