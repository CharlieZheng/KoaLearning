"use strict"
const {randomBytes} = require("crypto")

/*
this.num = "Hello, it's me."
var name = "call1.js"
var age = 10
var kk = {
    child() {
        console.log(this);
    }
}
kk.child()

console.log(this)
console.log(this.num)
console.log(global.name)
console.log(age)*/
console.log(randomBytes(4).toString("hex"))