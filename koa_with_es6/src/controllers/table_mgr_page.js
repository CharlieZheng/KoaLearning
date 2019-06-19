const _2 = async (ctx, next) => {
    ctx.render("table_mgr.html", {
        title: "Sign In OK",
        name: "Mr Node"
    })

}

module.exports = {"GET /table_mgr": _2}