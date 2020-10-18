import { Component, creatElement} from './framwork';
import enableGesture  from '../enableGesture';
import { STATE, ATTRIBUTE } from './framwork';

export class List extends Component {
    constructor() {
        super();
        // this.render()
    }

    render() {
        this.children = this[ATTRIBUTE].data.map(this.template);
        this.root = (<div>{this.children}</div>).render();
        return this.root;
    }

    // setAttribute(attr, val) {
    //     if (!this.root) 
    //         this.render();
    //     this.root.setAttribute(attr, val);
    // }

    appendChild(child) {
        this.template = (child);
        this.render();
    }
}