const fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
        <p>Name: <input name="llllllll" value="koa"/></p>
        <p>Password: <input name="password" type="password"/></p>
        <p><input type="submit" value="Submit"/></p>
        </form>`;
}

const fn_signin = async (ctx, next) => {
    const password = ctx.request.body.password || ""
    const name = ctx.request.body.llllllll || ""
    console.log(`name: ${name}, psw: ${password}`)
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
}
module.exports = {
    "GET /": fn_index,
    "POST /signin": fn_signin
}