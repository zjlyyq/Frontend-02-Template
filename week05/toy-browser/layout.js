
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
    console.log(element.tagName)
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

    ['wifth', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '' || style[size] === undefined ) {
            console.log('style[size]', style[size], element.tagName);
            style[size] = null;
        }
    })

    if (!style['flex-direction'] || style['flex-direction'] === 'auto') {
        style['flex-direction'] = 'row';
    }
    if (!style['align-items'] || style['align-items'] === 'auto') {
        style['align-items'] = 'stretch';
    }
    if (!style['justify-content'] || style['justify-content'] === 'auto') {
        style['align-items'] = 'flex-start';
    }
    
    let mainSize, mainStart, mainEnd, mainSign, mainBase,
    crossSize, crossStart, crossEnd, crossSign, crossBase;

    if (style['flex-direction'] === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossEnd = 'bottpm';
        crossStart = 'top';
    }
    if (style['flex-direction'] === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossEnd = 'bottpm';
        crossStart = 'top';
    }
    if (style['flex-direction'] === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossEnd = 'left';
        crossStart = 'right';
    }
    if (style['flex-direction'] === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossEnd = 'left';
        crossStart = 'right';
    }
    if (style['flex-direction'] === 'wrap-reverse') {
        let tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    }else {
        crossBase = 0;
        crossSign = 1;
    }

    let isAutoMainSize = false;
    if (!style[mainSize] || style[mainSize] === 'auto') {
        style[mainBase] = 0;
        for (let item in items) {
            style[mainSize] += item.elementStyle[mainSize]
        }
        isAutoMainSize = true;
    }

    let flexLine = [];
    let flexLines = [flexLine];
    // 主轴剩余空间
    let mainSpace = elementStyle[mainSize];  
    let crossSpace = 0;

    for (let item of items) {
        let itemStyle = getStyle(item);
        if (!itemStyle[mainSize]) {
            itemStyle[mainSize] = 0;
        }
        if (itemStyle.flex) {  //子元素可升缩， 一定可以入行，且不对剩余空间有影响
            flexLine.push(item);
        }else if (style['flex-wrap'] === "nowrap" || isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if (itemStyle[crossSize]) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            flexLine.push(item);
        }else {
            if (itemStyle[mainSize] > elementStyle[mainSize]) {
                itemStyle[mainSize] = elementStyle[mainSize];
            }
            // 主轴剩余空间小于下一个子元素的主轴大小，换行
            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainBase;
                flexLine.crossSpace = crossSpace;
                flexLine = [item];
                flexLines.push(flexLine);
                // mainSpace = elementStyle[mainSize] - itemStyle[mainSize];
                crossSpace = 0;
            }else {
                flexLine.push(item);
            }
            if (itemStyle[crossSize]) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            } 
            mainSpace -= itemStyle[mainSize]; 
        }
    }
    flexLine.mainSpace = mainSpace;

    console.log(flexLines);
}

module.exports = layout