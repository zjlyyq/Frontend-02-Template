// # code mock debugger
let pattern = "abcab";
let str = "vabcabfsdfdsabcabsd";
let machines = new Map();
function kmp() {
    let state = start;

    for (let c of str) {
        state = state(c);
        console.log(state);
    }

    return state === end;
}
function getNext(pattern) {
    let m = pattern.length;
    let next = new Array(m).fill(-1);
    for(let i = 0;i < m;i ++) {
        let j = i-1;
        while(j >= 0) {
            if (pattern[next[j]+1] === pattern[i]){
                next[i] = next[j]+1;
                break;
            }
            j = next[j];
        }
    }
    return next;
}

function machineFactory() {
    let next = getNext(pattern);
    console.log(next);
    for (let i = pattern.length-1;i > 0;i --) {
        if (i == pattern.length-2) {
            machines.set(i, (c)=>{
                if (c === str[i+1]) {
                    return end;
                }
                else {
                    return start;
                }
            })
        }
        else {
            machines.set(i, (c)=>{
                if (c === str[i+1]) {
                    return this.next;
                }
                else {
                    return null;
                }
            })
        }
    } 
    for(let i = 0;i < next.length-2;i ++) {
        if (next[i] == -1) {
            machines.set(i, (c) => {
                if (c == pattern[i]) {
                    return machines.get(i+1);
                }
                else {
                    return start(c);
                }
            })
        }
        else {
            machines.set(i, (c) => {
                if (c == pattern[i]) {
                    return machines.get(i+1);
                }
                else {
                    return machines.get(next[i]+1)(c);
                }
            })
        }
    }  
    debugger
}
machineFactory(str);
// console.log(machines);
console.log(kmp());

function end(c) {
    return end;
}

function start(c) {
    if (c === pattern[0]) {
        return machines.get(0);
    }
    return start;
}