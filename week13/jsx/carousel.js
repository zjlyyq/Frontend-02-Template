import { Component } from './framwork';
class Carousel extends Component{
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    render() {
        this.timer = null;
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        this.attributes.src.forEach(url => {
            let img = document.createElement('div');
            img.style.backgroundImage = `url('${url}')`
            this.root.appendChild(img);
        })
        let children = this.root.children;
        let currentIndex = 0, nextIndex = 1;
        let current = children[0], next = children[1];

        const run = () => {
            this.timer = setInterval(() => {
                current = children[currentIndex];
                nextIndex = (currentIndex + 1) % children.length;;
                next = children[nextIndex];

                // 先将下一帧图片移到轮播图可视区的下一格：
                next.style.transition = "none";
                next.style.transform = `translateX(${-100*(nextIndex-1)}%)`;

                // 将当前帧和下一帧图片左移一格
                setTimeout(() => {
                    next.style.transition = "";
                    next.style.transform = `translateX(${-100*nextIndex}%)`;
                    current.style.transform = `translateX(${-100*(currentIndex+1)}%)`;
                    console.log('currentIndex', currentIndex)
                    currentIndex = nextIndex; 
                }, 16);
            }, 3000)
        }
        run();

        let position = 0;
        this.root.addEventListener('mousedown', event => {
            let startX = 0, startY = 0;
            let offsetX;

            position = currentIndex;
            console.log('timeid', this.timer, position)
            if (this.timer)
                clearInterval(this.timer);
                this.timer = null;
            const move = (event) => {
                offsetX = event.clientX - startX;
                let nears = [-1,0,1];
                nears.forEach(i => {
                    let j = (position+i+children.length)%children.length
                    children[j].style.transition = "none"
                    children[j].style.transform = `translateX( ${-j*500 + i*500 + offsetX}px)`;
                })
                
            }

            const up = (event) => {
                if (!this.timer)
                    run()
                offsetX = event.clientX - startX ;
                console.log('mouseup', offsetX)
                position -= Math.round(offsetX / 500);
                position = (position+children.length)%children.length
                let nears = [-1,0,1];
                nears.forEach(i => {
                    let j = (position+i+children.length)%children.length
                    children[j].style.transition = ""
                    children[j].style.transform = `translateX( ${-j*500 + i*500}px)`;
                })
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
                currentIndex = position;
            }

            startX = event.clientX; startY = event.clientY;
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up)
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

export { Carousel }