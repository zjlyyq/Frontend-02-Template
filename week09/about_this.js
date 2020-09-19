var bar = {
    myName: "bar name",
    printName: function () {
        // console.log()
        console.log(this.myName)
    }
}

function foo() {
    let myName = "foo name"
    return bar.printName
}
let myName = "global name"
let _printName = foo()

_printName()   // global name
bar.printName() // global name


var myObj = {
    name: "Ops!",
    showThis: function () {
        console.log(this)
        function bar() { 
            console.log(this) 
        }
        let func = () => {
            console.log(this)
        }
        bar()
        func()
    }
}
myObj.showThis()