function add(a, b) {
    console.log(a + b + this.c)
}

function sub(a, b) {
    console.log(a - b)
}

add.call({c: 4}, 3, 1)
add.apply({c: 4}, [3,5])