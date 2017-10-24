const nunjucks = require("nunjucks")

function createEnv(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path
                ,{watch:true}), {}
               /* , {
                noCache: noCache,
                watch: watch
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            }*/
            )
   /* if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f])
        }
    }*/
    return env
}
const env = createEnv("views", {
    watch: true
    /*,    filters: {
        hex: function (n) {
            return "0x" + n.toString(16)
        }
    }*/
})

const s = env.render("hello.html", {name: "小明"
    , fruits:["苹果", "香蕉", "菠萝", "火龙果"]
, header: "头部"
, copyright:"copyr反反复复反反复复方法发ight"})
console.log(s)