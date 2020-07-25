// 用状态机实现：字符串“abcabx”的解析
// 可能同时进入两种状态，用列表保存。
function isMatch(str) {
    let states = [start];
    for(let c of str) {
        // 使用集合保存下一个状态列表
        let set = new Set();
        for (let state of states) {
            state(c).forEach(s => {
                set.add(s);
            });
        }
        // 状态集合转为状态列表
        states = [...set];
    }
    return states.includes(end);
}
let cases = [
    'abcabx',
    'abcbababc',
    'ababcdef',
    'abababcabxa'
];
for(let str of cases) {
    console.log(isMatch(str));
}
//初始状态 状态0
function start(c) {
    if (c === "a") {
        return [State1];
    }else {
        return [start];
    }
}
//状态1：“a"
function State1(c) {
    if (c === "b") {
        return [State2];
    }else {
        return [start(c)];
    }
}
//状态2：“ab"
function State2(c) {
    if (c === "c") {
        return [State3];
    }else {
        return start(c);
    }
}
//状态3：“abc"
function State3(c) {
    if (c === "a") {
        return [State4, State1];
    }else {
        return start(c);
    }
}
//状态4：“abca"
function State4(c) {
    if (c === "b") {
        return [State5,State2];
    }else {
        return start(c);
    }
}
//状态5：“abcab"
function State5(c) {
    if (c === "x") {
        return [end];
    }else {
        return start(c);
    }
}
//状态6：“abcabx"
function end(c) {
    return [end];
}