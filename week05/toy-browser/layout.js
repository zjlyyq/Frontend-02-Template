
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
    if (style['flex-wrap'] === undefined) style['flex-wrap'] = 'nowrap';
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
    
    // 计算主轴尺寸
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

   
    /*
    计算交叉轴:
    交叉轴基本规则解释：flex-wrap属性，默认是nowrap， 也就是强行收到一行。
    如果元素没有定义交叉轴尺寸，则会由子元素的交叉轴尺寸撑起，
    如果元素定义了交叉轴尺寸，子元素也定义了，则各显示各的，也就是说子元素可能会超出
    */
    // crossSpace;   // 交叉轴剩余空间(前面已经定义过, 不必重复定义)
    if (!style[crossSize]) { // auto size
        style[crossSize] = 0;
        crossSpace = 0;
        flexLines.map(line => style[crossSize] += line.crossSpace);
    }else {
        crossSpace = style[crossSize];
        flexLines.map(line => crossSpace -= line.crossSpace);
    }

    // 检查交叉轴排布方向
    if (style['flex-wrap'] === 'wrap-reverse') {
        crossBase = style[crossSize];
    }else {
        crossBase = 0;
    }

    let lineSize = style[crossSize] / flexLines.length;  // 不知道做什么的
    let step = 0;
    // 之前我一直不太清楚align-content属性的作用，只是用align-items
    if (style['align-content'] === 'flex-start') {
        crossBase = 0;
        step = 0;
    }
    if (style['align-content'] === 'flex-end') {
        crossBase += crossSign * crossSpace;
        step = 0;
    }
    if (style['align-content'] === 'space-around') {
        step = crossSpace/flexLines.length;
        crossBase += crossSign * step / 2;
    }
    if (style['align-content'] === 'center') {
        step = 0;
        crossBase += crossSign * crossSpace / 2;
    }
    if (style['align-content'] === 'space-bewteen') {
        step = crossSpace/(flexLines.length-1);
        crossBase += 0;
    }
    if (style['align-content'] === 'stretch') {
        step = 0;
        crossBase = 0;
    }

    for (let line of flexLines) {
        let lineCrossSize = style['align-content'] === 'stretch' ? 
            line.crossSpace + crossSpace / line.length : 
            line.crossSpace;

        for (let item of line) {
            let itemStyle = getStyle(item);
            let align = itemStyle['alignSelf'] || style['align-items'];

            if (!itemStyle[crossSize] === undefined) {
                itemStyle[crossSize] = (align === 'stretch') ? 
                    lineCrossSize : 0;
            }
            if (align === 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + itemStyle[crossSize] * crossSign;
            }
            if (align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if (align === 'center') {
                itemStyle[crossEnd] = crossBase + crossSign * (lineCrossSize-itemStyle[crossSize])/2;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * temStyle[crossSize];
                // itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
        }
        crossBase += crossSign * (lineCrossSize + step);
    }

}

module.exports = layout