
function getStyle(element) {
    if (!element.style) {
        element.style = {}
    }

    for (let prop in element.computedStyle) {
        let p = element.computedStyle[prop];
        element.style[prop] = element.computedStyle[prop].value;

        if (element.style[prop].toString().match('/px$/')) {
            element.style[prop] = parseInt(element.style[prop])
        }
        if (element.style[prop].toString().match('/^[0-9\.]+$/')) {
            element.style[prop] = parseInt(element.style[prop])
        }
    }

    return element.style;
}

function layout(element) {
    if (!element.computedStyle) {
        return;
    }
    let elementStyle = getStyle(element);

    if (elementStyle.display != "flex") {
        return;
    }

    // 获取子元素（过滤文本节点）
    let items = element.children.filter(e => e.type === "element");

    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
    })

    let style = elementStyle;

    if (style)
}

module.exports = {
    layout: layout
}