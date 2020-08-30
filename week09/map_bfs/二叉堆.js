class Sorted {
    constructor(data, compare) {
        this.heap = [];
        this.size = 0;
        this.compare = compare?compare:(a, b) => a-b;
        data.forEach(element => {
            this.give(element);
        });
    }

    take() {
        if (this.size === 0) return;
        let min = this.heap[0];
        let cur = 0, value = this.heap[this.size-1];
        this.heap.pop();
        this.size -= 1;
        while(cur < this.size-1) {
            let l = 2 * cur + 1, r = 2 * cur + 2;
            if (l >= this.size ) break;
            if (r >= this.size) {
                if (this.compare(this.heap[l], value) >= 0) break;
                this.heap[cur] = this.heap[l];
                cur = l;
            }else {
                let next = this.compare(this.heap[l], this.heap[r]) > 0? r : l;
                if (this.compare(this.heap[next], value) >= 0) break;
                this.heap[cur] = this.heap[next];
                cur = next;
            }
        }
        this.heap[cur] = value;
        return min;
    }

    give(value) {
        this.heap.push(value);
        this.size += 1;
        let cur = this.size-1;
        while(cur > 0) {
            let pre = Math.floor((cur - 1) / 2);
            if (this.compare(this.heap[pre], value) > 0) {
                this.heap[cur] = this.heap[pre];
            }else {
                break;
            }
            cur = pre;
        }
        this.heap[cur] = value;
    }
}