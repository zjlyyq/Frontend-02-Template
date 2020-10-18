export function creatElement(type, attributes, ...children) {
    // console.log(arguments);
    console.log(children);
    let dom ;
    if (typeof type === 'string') 
        dom = new ElementWrapper(type);
    else 
        dom = new type
    for (let attr in attributes) {
        dom.setAttribute(attr, attributes[attr])
    }
    let processChild = (children) => {
        for (let child of children) {
            if (typeof child === 'object' && (child instanceof Array)){
                processChild(child);
                continue;
            }
            if (typeof child === 'string')
                child = new TextWrapper(child);
            dom.appendChild(child);
        }
    }
    // if (children) {
    //     for (let child of children) {
    //         if (typeof child === 'string')
    //             child = new TextWrapper(child);
    //         dom.appendChild(child);
    //     }
    // }
    processChild(children);
    return dom;
}

export const STATE = Symbol('state');
export const ATTRIBUTE = Symbol('attribute');

export class Component{ 
    constructor() {
        console.log('Component constructor called');
        // this.root = this.render()
        this[ATTRIBUTE] = Object.create(null);
        this[STATE] = Object.create(null);
    }

    render() {
        return this.root;
    }

    mountTo(parent) {
        if (!this.root)
            this.render();
        parent.appendChild(this.root)
    }
    // setAttribute(attr, val) {
    //     this.root.setAttribute(attr, val);
    // }
    setAttribute(name, value) {
        this[ATTRIBUTE][name] = value;
    }
    appendChild(child) {
        // this.root.appendChild(node);
        child.mountTo(this.root);
    }
    triggerEvent(type, args) {
        this[ATTRIBUTE]["on" + type](new CustomEvent(type, {detail: args}));
    }
}

class TextWrapper extends Component {
    constructor(content) {
        console.log('TextWrapper constructor called')
        super();   // 将当前this赋值给父类的this
        this.root = document.createTextNode(content);
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        console.log('ElementWrapper constructor called')
        super();   // why
        this.root = document.createElement(type);
    }

    setAttribute(attr, val) {
        this.root.setAttribute(attr, val);
    }
}