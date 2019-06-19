const _1 = async (ctx, next) => {
    ctx.render("index.html", {
        title: "Welcome"
    })
}

module.exports = {"GET /": _1}