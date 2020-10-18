import { Component, creatElement } from './framwork.js' 
import { Carousel } from './Carousel.js'
import { Timeline, Animation } from './animations.js'
import img1 from './static/imgs/d846f329e073d0f7c8143da32a3ca832.jpg'
import img2 from './static/imgs/b4ff997b68f16f882c255aef8c833626.jpg'
import img3 from './static/imgs/5196d9fb7fcbbfb43450624045ae81c0.jpg'
import img4 from './static/imgs/97fbdb46b8ad6550dcdb4aa4a062f0bf.jpg'
import { Button } from './Button.js'
import { List } from './List.js'
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
let cats = [
    {
        url: 'https://static001.geekbang.org/resource/image/d8/32/d846f329e073d0f7c8143da32a3ca832.jpg', 
        title: '白猫'
    }, 
    {
        url: 'https://static001.geekbang.org/resource/image/b4/26/b4ff997b68f16f882c255aef8c833626.jpg',
        title: '黄猫'
    }, 
    {
        url: 'https://static001.geekbang.org/resource/image/51/c0/5196d9fb7fcbbfb43450624045ae81c0.jpg', 
        title: '灰白猫'
    }, 
    {
        url: 'https://static001.geekbang.org/resource/image/97/bf/97fbdb46b8ad6550dcdb4aa4a062f0bf.jpg', 
        title: '黄白猫'
    }
]
let b = <Button style="background:pink;text-align:center;">content</Button>
// let list = <List style="text-align:center;">
//     <img src={img1} style="width:500px"></img>
//     <br></br>
//     <a href = "www.baidu.com">baidu</a>
// </List>

let l = <List data={cats}>
    {/* <h1>模板性children</h1> */}
    {
        (recode) => 
            <div>
                <img src={recode.url}/>
                <a href={recode.url}>{recode.title}</a>
            </div>
    }
</List>
// let a = <Div class="a" id="app" >
//     <p>p1</p>
//     <p>p2</p>
//     <Div style="color: green;"><strong>DIV</strong>DIV</Div>
//     <p style="color: red;">p3 <span>span</span> </p>
//     <img src='https://static001.geekbang.org/resource/image/51/c0/5196d9fb7fcbbfb43450624045ae81c0.jpg'/>
// </Div>

let carousel = <Carousel src={ catImgs } 
    onChange={ event => console.log(event.detail)}
    onClick={ event => console.log(event.detail) }
    />
carousel.mountTo(document.body);
b.mountTo(document.body);
l.mountTo(document.body);
// a.mountTo(document.body);
window.t1 = new Timeline();
window.t1.start();
window.animation = new Animation({}, 'a', 0, 100, 10000, null, null);
setTimeout(
    () => (window.t1.add(animation)), 5000
)