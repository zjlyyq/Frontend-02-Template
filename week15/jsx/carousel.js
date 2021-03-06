import { Component } from './framwork';
import { Timeline, Animation} from './animations';
import enableGesture  from '../enableGesture';
import { STATE, ATTRIBUTE } from './framwork';

console.log('ATTRIBUTE', ATTRIBUTE)
class Carousel extends Component{
    constructor() {
        super();
    }
    render() {
        this.timer = null;
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        this[ATTRIBUTE].src.forEach(url => {
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
        // let position = 0;
        this[STATE].position = 0;

        const run = () => {
            this.timer = setInterval(() => {
                let current = children[this[STATE].position];
                let nextIndex = (this[STATE].position + 1) % children.length;;
                let next = children[nextIndex];

                // 先将下一帧图片移到轮播图可视区的下一格：
                next.style.transition = "none";
                next.style.transform = `translateX(${-100*(nextIndex-1)}%)`;
                
                t = Date.now();

                // 将当前帧左移一格, 当前图片的起始位置取决于当前图片的currentIndex
                timeline.add(new Animation(
                    current.style, 
                    "transform", 
                    (-1*this[STATE].position)*500, 
                    (-1*(this[STATE].position+1))*500, 
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

                this[STATE].position = nextIndex; 
                this.triggerEvent('Change', {position: this[STATE].position});
            }, 3000)
        }
        run();
        this.root.addEventListener('tap', event => {
            this.triggerEvent('Click', {data: this[ATTRIBUTE].src[this[STATE].position]});
        })
        this.root.addEventListener('start', event => {
            timeline.pause();
            clearTimeout(this.timer);
            // 动画开始运行， 并且还没结束。
            if (t && (Date.now() - t) < 500) {
                this[STATE].position -= 1;
                ax = ((Date.now() - t) / 500)*500;
                console.log('ax', ax)
            }
        })
        this.root.addEventListener('paning', event => {
            // console.log('position', position, ax)
            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x-x%500) / 500);
            let nears = [-1,0,1];
            nears.forEach(i => {
                let pos = current + i;
                pos = (pos % children.length+children.length)%children.length;
                children[pos].style.transition = "none"
                children[pos].style.transform = `translateX( ${-pos*500 + i*500 + x%500}px)`;
            })
        })
        this.root.addEventListener('end', event => {
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
            let current = this[STATE].position - ((x-x%500) / 500);
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
            this[STATE].position = (current-direction) % children.length;
            this[STATE].position = (this[STATE].position % children.length+children.length)%children.length;
            this.triggerEvent('Change', {position: this[STATE].position});
            run();
        })
        return this.root;
    }
    
    // setAttribute(name, value) {
    //     this.attributes[name] = value;
    // }
} 

export { Carousel }