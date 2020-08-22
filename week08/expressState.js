
class Cls{
    constructor(n){
      console.log("cls", n);
      return class {
        constructor(n) {
          console.log("returned", n);
        }
      }
    }
  }
  
  new new Cls(1); 
  console.log("--------分割线---------")
  new (new Cls(1));
  console.log("--------分割线---------")
  new (new Cls)(1);
  console.log("--------void---------")
  void function iife() {
    var bar = function () {
        console.log('bar')
    };
    var baz = function () {
        console.log('baz')
    };
    var foo = function () {
        bar();
        baz();
     };
    var biz = function () {};

    foo();
    biz();
}();