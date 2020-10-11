import { Component, creatElement} from './framwork';
import enableGesture  from '../enableGesture';
import { STATE, ATTRIBUTE } from './framwork';

export class List extends Component {
    constructor() {
        super();
        // this.render()
        this.root = document.createElement('div');
    }

    render() {
        return this.root;
    }

    setAttribute(attr, val) {
        if (!this.root) 
            this.render();
        this.root.setAttribute(attr, val);
    }
}