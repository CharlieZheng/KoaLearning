const fs = require("fs")
const Thunk = function (f) {
    return function () {
        const args = Array.prototype.slice.call(arguments)
        return function (cb) {
            args.push(cb)
            return f.apply(null, args)
        }
    }
}

const readFileThunk = Thunk(fs.readFile)
readFileThunk("test2.js")(function (err, res) {
    console.log(res.toString())
})


function f(args1, args2){
    console.log(`${args1} + ${args2}`)
}
f.apply(this, ["e", "f"])