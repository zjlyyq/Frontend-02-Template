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
function kmp_search(str, pattern) {
    let n = str.length, m = pattern.length;
    let next = getNext(pattern);
    console.log(next);
    let pos = [];
    let i = 0,j = 0;
    while(i < n) {
        if (str[i] === pattern[j]) {
            j ++;
            if (j === m) {
                pos.push(i-m+1);
                j = next[m-1]+1;
            }
        }
        else {
            j = next[j] + 1;
            if (str[i] === pattern[j]) {
                j ++;
            }
        }
        i ++;
    }

    return pos;
}
console.log(kmp_search("rqwyaabcabfsdfdsabcabsd", "abcab"));