import { Component, creatElement } from './framwork.js' 
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
class Carousel extends Component{
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        this.attributes.src.forEach(url => {
            let img = document.createElement('div');
            img.style.backgroundImage = `url('${url}')`
            this.root.appendChild(img);
        })
        let children = this.root.children;
        let currentIndex = 0, nextIndex, current, next;
        current = children[currentIndex];
        nextIndex = (currentIndex + 1) % children.length;
        next = children[nextIndex];
        // setInterval(() => {
        //     current = children[currentIndex];
        //     nextIndex = (currentIndex + 1) % children.length;;
        //     next = children[nextIndex];
        //     // 先将下一元素移到下一格：
        //     next.style.transition = "none";
        //     next.style.transform = `translateX(${-100*(nextIndex-1)}%)`;
        //     setTimeout(() => {
        //         next.style.transition = "";
        //         next.style.transform = `translateX(${-100*nextIndex}%)`;
        //         current.style.transform = `translateX(${-100*(currentIndex+1)}%)`;
        //         currentIndex = nextIndex;
        //     }, 16);
        // }, 3000)
        let position = 0;
        this.root.addEventListener('mousedown', event => {
            let offset;
            const move = (event) => {
                offset = event.clientX - startX ;
                for (let child of children) {
                    child.style.transition = "none";
                    child.style.transform = `translateX( ${-position*500 + offset}px)`;
                }
            }

            const up = (event) => {
                offset = event.clientX - startX ;
                console.log('mouseup', offset)
                position -= Math.round(offset / 500);
                for (let child of children) {
                    child.style.transition = "";
                    child.style.transform = `translateX( ${-100*(position)}%)`;
                }
                this.root.removeEventListener('mousemove', move);
                this.root.removeEventListener('mouseup', up);
            }

            let startX = 0, startY = 0;
            console.log('mousedown');
            startX = event.clientX; startY = event.clientY;
            this.root.addEventListener('mousemove', move);
            this.root.addEventListener('mouseup', up)
        })

        return this.root;
    }
    
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    mountTo(parent) {
        console.log(this.attributes.src)
        parent.appendChild(this.render());
    }
} 
let catImgs = [
    'https://static001.geekbang.org/resource/image/d8/32/d846f329e073d0f7c8143da32a3ca832.jpg',
    'https://static001.geekbang.org/resource/image/b4/26/b4ff997b68f16f882c255aef8c833626.jpg',
    'https://static001.geekbang.org/resource/image/51/c0/5196d9fb7fcbbfb43450624045ae81c0.jpg',
    'https://static001.geekbang.org/resource/image/97/bf/97fbdb46b8ad6550dcdb4aa4a062f0bf.jpg'
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