// # code mock debugger
let pattern = "abcabdd";
let str = "vabcabfsdfdsabcabsdfsfdfssdfs";
let machines = new Map();
function kmp() {
    let state = start;
    for (let c of str) {
        state = state(c);
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
    // console.log(next);
    for (let i = pattern.length-1;i > 0;i --) {
        if (i == (pattern.length-2)) {
            console.log("33333")
            machines.set(i, (c)=>{
                console.log(i, c);
                if (c === pattern[i+1]) {
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
                    return null;
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
                console.log(i, c);
                // if (i === 2) {
                //     console.log(machines.get(3)("a"));
                // }
                if (c == pattern[i+1]) {
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
}
machineFactory(str);
// console.log(machines);
console.log(kmp());

function end(c) {
    console.log('ed');
    return end;
}

function start(c) {
    console.log('start', c);
    if (c === pattern[0]) {
        return machines.get(0);
    }
    return start;
}