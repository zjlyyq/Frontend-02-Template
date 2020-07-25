// 使用状态机完成”abababx”的处理。
// abababx
function isMatch(str) {
    let state = start;
    for(let c of str) {
        state = state(c);
    }
    return state === end;
}
let cases = [
    'abababx',
    'abcbababc',
    'abababx',
    'ababababxbcabxa'
];
for(let str of cases) {
    console.log(isMatch(str));
}
//初始状态 状态0
function start(c) {
    if (c === "a") {
        return State1;
    }else {
        return start;
    }
}
//状态1：“a"
function State1(c) {
    if (c === "b") {
        return State2;
    }else {
        return start(c);
    }
}
//状态2：“ab"
function State2(c) {
    if (c === "a") {
        return State3;
    }else {
        return start(c);
    }
}
//状态3：“aba"
function State3(c) {
    if (c === "b") {
        return State4;
    }else {
        //重新从'状态a'开始匹配
        return State1(c);
    }
}
//状态4：“abab"
function State4(c) {
    if (c === "a") {
        return State5;
    }else {
        return start(c);
    }
}
//状态5：“ababab"
function State5(c) {
    if (c === "b") {
        return State6;
    }else {
        // 重新从状态aba开始匹配
        return State3(c);
    }
}
//状态5：“ababab"
function State6(c) {
    if (c === "x") {
        return end;
    }else {
        return start(c);
    }
}
//状态6：“abcabx"
function end(c) {
    return end;
}