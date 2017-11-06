var nor = function () {

    return "function nor"
}
var gen = function* () {
   const rs =  yield nor
   rs("------------------------------")
}

const g = gen()
console.log(g.next().value())
g.next((msg)=>{
    console.log(msg)
})