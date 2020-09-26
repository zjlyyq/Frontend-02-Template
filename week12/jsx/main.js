import { Component, creatElement } from './framwork.js' 
import { Carousel } from './carousel.js'
import img1 from './static/imgs/d846f329e073d0f7c8143da32a3ca832.jpg'
import img2 from './static/imgs/b4ff997b68f16f882c255aef8c833626.jpg'
import img3 from './static/imgs/5196d9fb7fcbbfb43450624045ae81c0.jpg'
import img4 from './static/imgs/97fbdb46b8ad6550dcdb4aa4a062f0bf.jpg'

class Div extends Component{
    constructor() {
        super();
        this.root = document.createElement('div');
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }

    setAttribute(attr, val) {
        this.root.setAttribute(attr, val);
    }

    appendChild(node) {
        this.root.appendChild(this.render());
    }
}

let catImgs = [
    img1 ,img2, img3, img4
]
let a = <Div class="a" id="app" >
    <p>p1</p>
    <p>p2</p>
    <Div style="color: green;"><strong>DIV</strong>DIV</Div>
    <p style="color: red;">p3 <span>span</span> </p>
    <img src='https://static001.geekbang.org/resource/image/51/c0/5196d9fb7fcbbfb43450624045ae81c0.jpg'/>
</Div>
let carousel = <Carousel src={ catImgs }/>
console.log(a)
// document.body.appendChild(a);
// a.mountTo(document.body);
carousel.mountTo(document.body);