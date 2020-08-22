
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    // Getter
    get area() {
        return this.calcArea();
    }

    // Setter
    set width(newValue) {
        setTimeout(() => {
            console.log('setter', newValue);
        }, 0)
    }

    // Method
    calcArea() {
        return this.height * this.width;
    }
}

let rect = new Rectangle(10, 50);
rect.width = 12;
console.log(rect.area)

function foo(a = 1, ...other) {
    console.log(a, other)
}
foo(1, 2, 34)
function strictStatement(){
    "use strict";
    let a = 12;
    b = 2;
}
strictStatement();
console.log(b);


