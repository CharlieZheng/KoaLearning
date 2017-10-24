const fetch = require("node-fetch")

function* gen(x, kk) {
    const result = yield (s) => {
        setTimeout(() => {
            console.log("gewrtfgre")
            s()
        }, 1000)

        return 32536
    }
    console.log(result)
}


const g = gen()
const result = g.next()
result.value(()=>{g.next(2000)})