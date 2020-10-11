import { Component, creatElement} from './framwork';
import enableGesture  from '../enableGesture';
import { STATE, ATTRIBUTE } from './framwork';

export class Button extends Component {
    constructor() {
        super();
        // this.render()
    }

    render() {
        this.childContainer = <span />;
        this.root = (<div>{this.childContainer}</div>).render();
        return this.root;
    }

    appendChild(child) {
        if (!this.childContainer) 
            this.render();
        this.childContainer.appendChild(child);
    }

    setAttribute(attr, val) {
        if (!this.root) 
            this.render();
        this.root.setAttribute(attr, val);
    }
}