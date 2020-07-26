class kmp_state_machine{

    constructor(str) {
        this.str = str;
        this.states = new Map();
        this._end = () => {
            return this._end;
        }
    }

    // 构建失败转移数组
    _getNext(pattern) {
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

    // 构建状态机
    _buildStatesMachines(pattern) {
        this.states = new Map();
        let m = pattern.length;
        let next = this._getNext(pattern);
        this._start = (c) => {
            if (c === pattern[0]) {
                return this.states.get(0);
            }
            return this._start;
        }
        for(let i = 0;i <= next.length-2;i ++) {
            this.states.set(i, (c) => {
                if (c == pattern[i+1]) {
                    return this.states.get(i+1);
                }
                else {
                    return next[i+1] === -1?this._start(c)
                            :this.states.get(next[i+1]+1)(c);
                }
            })
        }
        this.states.set(m-1, (c) => this._end);
    }

    search(pattern) {
        this._buildStatesMachines(pattern);
        let state = this._start;
        for (let c of this.str) {
            state = state(c);
        }
        console.log(state===this._end?`"${pattern}" is found`:`"${pattern}" is not found`);
    }
}

let model_string = "vabscabddddababcabdabcabddabcabddcabcadbddabsdfsfdfssdfs";
let ksm = new kmp_state_machine(model_string);
ksm.search("abcabddabcabdd");
ksm.search("abcabddabcsabdd");
ksm.search("abcabddabcabdddd");
ksm.search("abcabddab");