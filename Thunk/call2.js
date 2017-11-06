"use strict"

var a ={a: "gregre"}
var aa = {
    a: "hehe",
    show: function () {
        console.log(this.a)
    }
}
aa.show.call(a)