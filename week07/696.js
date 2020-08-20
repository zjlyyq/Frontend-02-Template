/**
 * @param {string} s
 * @return {number}
 */
/**
 * 00110011
 * 
 */
var countBinarySubstrings = function(s) {
    let counter = {0: 0, 1: 0};
    let last = "", ans = 0;
    [...s].forEach(c => {
        if (c === last) {
            counter[c] += 1;
            return;
        }
        ans += Math.min(counter['0'], counter['1']);
        counter[c] = 1; 
        last = c;
    })
    return ans + Math.min(counter['0'], counter['1']);;
};     