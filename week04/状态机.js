
/**
 * 状态机函数
 */
function isMatch(str) {
    let state = start;
    for(let c of str) {
        state = state(c);
    }
    return state === end;
}
let cases = [
    'sdkfks',
    'abcdefss',
    'ababcdef',
    'abccabx'
];
for(let str of cases) {
    console.log(isMatch(str));
}
function start(c) {
    if (c === "a") {
        return FoundA;
    }else {
        return start;
    }
}
function FoundA(c) {
    if (c === "b") {
        return FoundC;
    }else {
        return start(c);
    }
}
function FoundC(c) {
    if (c === "c") {
        return FoundD;
    }else {
        return start(c);
    }
}
function FoundD(c) {
    if (c === "d") {
        return FoundE;
    }else {
        return start(c);
    }
}
function FoundE(c) {
    if (c === "e") {
        return FoundF;
    }else {
        return start(c);
    }
}
function FoundF(c) {
    if (c === "f") {
        return end;
    }else {
        return start(c);
    }
}
function end(c) {
    return end;
}