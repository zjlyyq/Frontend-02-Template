function fn() {
    var a = 10

    function f1() {
        console.log(a)
    };

    function f2() {
        console.log('f2')
    };

    f2();
};

let fff = fn.f1;
fff();