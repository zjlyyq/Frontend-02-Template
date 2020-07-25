// abcabx
function isMatch(str) {
    let state = start;
    for(let c of str) {
        state = state(c);
        // console.log(c, state);
    }
    return state === end;
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
    if (c === "c") {
        return State3;
    }else {
        return start(c);
    }
}
//状态3：“abc"
function State3(c) {
    if (c === "a") {
        return State4;
    }else {
        return start(c);
    }
}
//状态4：“abca"
function State4(c) {
    if (c === "b") {
        return State5;
    }else {
        return State1(c);
    }
}
//状态5：“abcab"
function State5(c) {
    if (c === "x") {
        return end;
    }else {
        return State2(c);
    }
}
//状态6：“abcabx"
function end(c) {
    return end;
}