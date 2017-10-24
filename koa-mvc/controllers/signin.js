
const _2 = async (ctx, next) => {
    let email = ctx.request.body.email || "",
        psw = ctx.request.body.psw || ""
    if (email === "admin@example.com" && psw === "123456") {
        ctx.render("signin-ok.html", {
            title: "Sign In OK",
            name: "Mr Node"
        })
    } else {
        ctx.render("signin-failed.html", {
            title: "Sign In Failed"
        })
    }
}

module.exports={"POST /signin":_2}