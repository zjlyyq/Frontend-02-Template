
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

    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '' || style[size] === undefined ) {
            // console.log('style[size]', style[size], element.tagName);
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
        style[mainSize] = 0;
        for (let item of items) {
            style[mainSize] += item.style[mainSize]
        }
        isAutoMainSize = true;
    }
    // 收集元素进行
    // 根据主轴尺寸，把元素分行，若设置了no-wrap，则强行分进第一行。
    let flexLine = [];
    let flexLines = [flexLine];
    // 主轴剩余空间
    let mainSpace = elementStyle[mainSize];  
    // 交叉轴占用尺寸（为什么一开始不等于elementStyle[crossSize]）
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
            // 子元素主轴尺寸比父元素还大，将子元素主轴尺寸压缩成父元素主轴尺寸大小
            if (itemStyle[mainSize] > elementStyle[mainSize]) {
                itemStyle[mainSize] = elementStyle[mainSize];
            }
            // 主轴剩余空间小于下一个子元素的主轴尺寸，换行
            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace;   //存储当前行主轴剩余空间
                flexLine.crossSpace = crossSpace;  //存储当前行交叉轴空间
                // 新建行
                flexLine = [item];
                flexLines.push(flexLine);
                mainSpace = elementStyle[mainSize];
                crossSpace = 0;
            }else {
                flexLine.push(item);
            }
            // 处理交叉轴尺寸
            if (itemStyle[crossSize]) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            } 
            // 主轴剩余尺寸要减去新入行的子元素的尺寸
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;
    if (style['flex-wrap'] === "nowrap" || isAutoMainSize) {
        flexLine.crossSpace = (style[crossSize] != undefined) ? style[crossSize] : crossSpace;
    }else {
        flexLine.crossSpace = crossSpace;
    }
    console.log(flexLines);

    // 主轴剩余尺寸小于0，说明元素的主轴尺寸是auto或flex-wrap是no-wrap，这两种场景会将所有子元素收进一行。
    if (mainSpace < 0) {
        let scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = 0;
        for (let item of items) {
            item.style[mainSize] *= scale;
            let itemStyle = getStyle(item);
            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }
            itemStyle[mainSize] *= scale;

            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + itemStyle[mainSize] * mainSign;
            currentMain = itemStyle[mainEnd];
        }
    }else {
        // 处理多行逻辑
        for (let line of flexLines) {
            let mainSpace = line.mainSpace;
            let flexTotal = 0;
            for (item of line) {
                let itemStyle = getStyle(item);
                if (itemStyle.flex) {
                    flexTotal += itemStyle.flex;
                    continue;
                }
            }
            if (flexTotal > 0) {  // 含有弹性元素，将剩余空间按比例分配给这些元素
                let currentMain = mainBase;
                items.filter(item => item.style[flex]).map(item => {
                    let itemStyle = getStyle(item);
                    itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = currentMain + itemStyle[mainSize] * mainSign;
                    currentMain = itemStyle[mainEnd];
                })
            }else {
                let currentMain = mainBase;
                let step = 0;
                if (style['flex-direction'] === 'flex-start') {
                    currentMain = mainBase;
                    step = 0;
                }   
                if (style['flex-direction'] === 'flex-end') {
                    currentMain = mainSpace * mainSign + mainBase;
                    step = 0;
                }
                if (style['flex-direction'] === 'center') {
                    currentMain = mainSpace * mainSign / 2;
                    step = 0;
                }
                if (style['flex-direction'] === 'center') {
                    currentMain = mainSpace * mainSign / 2 + mainBase;
                    step = 0;
                }
                // 间隔体现在元素间
                if (style['flex-direction'] === 'space-bewteen') {
                    currentMain = mainBase;
                    step = mainSpace / (line.length-1) * mainSign;
                }
                // 前后有间隔
                if (style['flex-direction'] === 'space-around') {
                    step = mainSpace / line.length * mainSign;
                    currentMain = step / 2 + mainBase;
                }
                for(let item of line) {
                    let itemStyle = getStyle(item);
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + itemStyle[mainSize] * mainSign;
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        }
    }
}

module.exports = layout