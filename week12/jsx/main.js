class Div {
    constructor() {
        this.root = document.createElement('div');
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }

    setAttribute(attr, val) {
        this.root.setAttribute(attr, val);
    }

    appendChild(node) {
        this.root.appendChild(node);
    }
}

let a = <Div class="a" id="app" >
    <p>p1</p>
    <p>p2</p>
    <Div style="color: green;"><strong>DIV</strong>DIV</Div>
    <p style="color: red;">p3 <span>span</span> </p>
    <img src = ""/>
</Div>

console.log(a)
// document.body.appendChild(a);
a.mountTo(document.body);