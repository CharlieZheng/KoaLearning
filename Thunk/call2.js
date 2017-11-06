"use strict"

var fregfr ={a: "gregre"}
var aa = {
    a: "hehe",
    show: function () {
        console.log(this.a)
    }
}
aa.show.call(aa.a)
aa.show.call(fregfr)