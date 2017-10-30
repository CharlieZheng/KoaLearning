const fs =require( "fs")
/*fs.readFile("test.js", function (err, res) {
    console.log(res.toString())
})*/

const thunk = function (name) {
    return function (cb) {
        return fs.readFile(name, cb)
    }
}
thunk("test.js")( function (err, res) {
    console.log(res.toString())
})

