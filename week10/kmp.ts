interface Pattern {
    length: number
}
interface Array<T> {
    fill(value: T): Array<T>;
}
// 接口约束，此算法适用于任何拥有length属性的对象模式匹配
function kmp<T extends Pattern>(source: T, patter: T): number[] {

    let matchs: number[] = [];
    /**
     * next数组表示，当在某位置匹配失败时，下一个匹配点应该在哪里
     * 例如：模式串：aabcaabedfsa ,当在7位e字符处匹配失败，由于前面已经aab是能自匹配的，下一个匹配点应该是aab后面的c字符
     */
    let next: number[] = new Array<number>(patter.length).fill(0)
    {
        let i = 1, j = 0;
        while(i < patter.length) {
            if (patter[i] === patter[j]) {
                ++i,++j
                next[i] = j
            }else {
                if (j != 0) {
                    j = next[j]
                }else {
                    i ++
                }
            }
        }
    }
    // console.log(next)
    {
        let i = 0, j = 0
        while(i < source.length) {
            if (patter[j] === source[i]) {
                j ++, i ++
                if (j === patter.length) {
                    matchs.push(i-j);
                    j = 0;
                    i = i - patter.length + 1;
                }
            }else {
                if (j > 0) {
                    j = next[j];
                }else {
                    i ++
                }
            }
        }
    }
    return matchs
}

console.log(kmp('abcdaabcdabceabcdaabcdabcewerwe', 'abcdabce'));
console.log(kmp('ddddddddddd', 'dddddddd'));
console.log(kmp([1,2,3,4,5,6,7,4,5,6], [4,5,6]));