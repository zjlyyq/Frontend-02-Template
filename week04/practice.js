function findCharA(str) {
    return [...str].map(char => char === "a"?char:"").join("");
}

function findCharAB(str) {
    // pos记录”ab“的下标
    let pos = [];

    for(let i = 0;i < str.length-1;i ++) {
        if (str[i] === 'a' && str[i+1] === "b") {
            pos.push(i);
        }
    }

    return pos;
}


function findCharAB2(str) {
    let flagA = false;

    for(let c of str) {
        if (c === 'a') {
            flagA = true;
        }
        else if(flagA && c === 'b'){
            return true;
        }
        else {
            flagA = false;
        }
    }

    return false;
}

console.log(findCharAB2("dsfsdab"));

function findCharABCDEF(str) {
    let flagA = false, flagB = false, flagC = false, 
    flagD = false, flagE = false;

    for(let c of str) {
        if (c === 'a') {
            flagA = true;
        }
        else if (flagA && c === 'b') {
            flagB = true;
            flagA = false;
        }
        else if(flagB && c === 'c') {
            flagC = true;
            flagB = false;
        }
        else if(flagC && c === 'd') {
            flagD = true;
            flagC = false;
        }
        else if(flagD && c === 'e') {
            flagE = true;
            flagD = false;
        }
        else if(flagE && c === 'f') {
            return true;
        }
        else {
            flagA = flagB = flagC = flagD = flagE = false;
        }
    }
    return false;
}
console.log(findCharABCDEF("sdfhsdfdshabcdef"));
console.log(findCharABCDEF("aabbcdeff"));
console.log(findCharAB("sjsfjsgsdfabdjfhdjkhabbjshdjfhsjabjsdf"));