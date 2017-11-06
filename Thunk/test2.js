const fs = require("fs")
const Thunk = function (f) {
    return function () {
        const args = Array.prototype.slice.call(arguments)
        return function (cb) {
            args.push(cb)
            return f.apply(this, args)
        }
    }
}

const readFileThunk = Thunk(fs.readFile)
readFileThunk("test2.js")(function (err, res) {
    console.log(res)
})