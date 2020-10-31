export function creatElement(type, attributes, ...children) {
    console.log(arguments);
    let dom ;
    if (typeof type === 'string') 
        dom = new ElementWrapper(type);
    else 
        dom = new type
    for (let attr in attributes) {
        dom.setAttribute(attr, attributes[attr])
    }
    if (children) {
        for (let child of children) {
            if (typeof child === 'string') {
                let textNode = new TextWrapper(child);
                textNode.mountTo(dom.root)
            } else {
                child.mountTo(dom.root)
            }
        }
    }
    return dom;
}

export class Component{ 
    constructor() {
        console.log('Component constructor called');
        // this.root = this.render()
    }

    render() {
        return document.createElement('div');
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
    setAttribute(attr, val) {
        this.root.setAttribute(attr, val);
    }
    
    appendChild(node) {
        this.root.appendChild(node);
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
}