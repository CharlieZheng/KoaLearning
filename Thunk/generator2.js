var nor = function () {

    return "function nor"
}
var gen = function* () {
   const rs =  yield nor
    console.log(rs)
}

const g = gen()
console.log(g.next().value())
g.next("第一个yield语句的返回值")