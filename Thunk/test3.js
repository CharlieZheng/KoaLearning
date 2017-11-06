const thunkify = require("thunkify")
const fs = require("fs")
const readFileThunk = thunkify(fs.readFile)
readFileThunk("test3.js")(function (err, res) {
    console.log(res)
})