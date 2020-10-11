import { Component } from './framwork';
import { Timeline, Animation} from './animations';
import enableGesture  from '../enableGesture';
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
        // 设置监听
        enableGesture(this.root);
        // 设置动画时间线
        let timeline = new Timeline();
        timeline.start();
        let t = 0;   // 记录动画开始时间
        let ax = 0;  // 记录动画产生的偏移
        let children = this.root.children;
        let currentIndex = 0, nextIndex = 1;
        let current = children[0], next = children[1];

        const run = () => {
            this.timer = setInterval(() => {
                let position = currentIndex;
                // console.log('position', position);
                current = children[currentIndex];
                nextIndex = (currentIndex + 1) % children.length;;
                next = children[nextIndex];

                // 先将下一帧图片移到轮播图可视区的下一格：
                next.style.transition = "none";
                next.style.transform = `translateX(${-100*(nextIndex-1)}%)`;
                
                t = Date.now();

                // 将当前帧左移一格, 当前图片的起始位置取决于当前图片的currentIndex
                timeline.add(new Animation(
                    current.style, 
                    "transform", 
                    (-1*position)*500, 
                    (-1*(position+1))*500, 
                    500, 
                    0, 
                    null, 
                    v => `translateX(${v}px)`)
                );
                // 将下一帧图片左移一格
                timeline.add(new Animation(
                    next.style, 
                    "transform", 
                    (-1*(nextIndex-1))*500,  // 下一帧图片已经被移到translateX(${-100*(nextIndex-1)}%)的位置
                    (-1*nextIndex)*500, 
                    500, 
                    0, 
                    null, 
                    v => `translateX(${v}px)`)
                );

                currentIndex = nextIndex; 
            }, 3000)
        }
        run();

        let position = 0;
        this.root.addEventListener('start', event => {
            timeline.pause();
            clearTimeout(this.timer);
            if (t)
                ax = ((Date.now() - t) / 500)*500;
        })
        this.root.addEventListener('paning', event => {
            let x = event.clientX - event.startX - ax;
            let current = position - ((x-x%500) / 500);
            let nears = [-1,0,1];
            nears.forEach(i => {
                let pos = current + i;
                pos = (pos % children.length+children.length)%children.length;
                children[pos].style.transition = "none"
                children[pos].style.transform = `translateX( ${-pos*500 + i*500 + x%500}px)`;
            })
        })
        this.root.addEventListener('end', event => {
            // console.log('catch end and ax = ', ax);
            timeline.reset();
            timeline.start();
            let x = event.clientX - event.startX - ax;
            ax = 0;
            t = null;
            let direction = Math.round((x % 500) / 500); // -1 0 1

            if (event.isFlick) {
                if (event.velocity < 0) {
                    direction = Math.ceil((x % 500) / 500);
                }else {
                    direction = Math.floor((x % 500) / 500);
                }
                console.log('direction', direction)
            }
            let current = position - ((x-x%500) / 500);
            let nears = [-1,0,1];
            nears.forEach(i => {
                let pos = current + i;
                pos = (pos % children.length+children.length)%children.length;
                timeline.add(new Animation(
                    children[pos].style,
                    "transform", 
                    -pos*500 + i*500 + x%500,  // 下一帧图片已经被移到translateX(${-100*(nextIndex-1)}%)的位置
                    -pos*500 + i*500 + direction * 500, 
                    500, 
                    0, 
                    null, 
                    v => `translateX(${v}px)`)
                );
            })
            position = currentIndex = (current-direction) % children.length;
            position = currentIndex = (position % children.length+children.length)%children.length;
            run();
        })
        return this.root;
    }
    
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    mountTo(parent) {
        // console.log(this.attributes.src)
        parent.appendChild(this.render());
    }
} 

export { Carousel }