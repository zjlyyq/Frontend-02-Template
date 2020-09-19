
function foo() {
    var myName = "极客时间"
    let test1 = 1
    const test2 = 2
    var innerBar = {
        getName:function(){
            console.log(test1)
            return myName
        },
        setName:function(newName){
            myName = newName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName("极客邦")
bar.getName()
console.log(bar.getName())


function fn() {
    var a = 10

    function f1() {
        console.log(a)
    };

    function f2() {
        console.log('f2')
    };

    f2();
    return f1;
};

let fff = new fn();
fff();