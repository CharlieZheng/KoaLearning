var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);
const co = require("co")
var gen = function* (){
    var r1 = yield readFile('call1.js');
    console.log(r1.toString());
    var r2 = yield readFile('call2.js');
    console.log(r2.toString());
};


/*// 执行方式1
var g = gen();

var r1 = g.next();
r1.value(function(err, data){
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function(err, data){
        if (err) throw err;
        g.next(data);
    });
});*/
co(gen).then(() =>{console.log("执行完成！")})