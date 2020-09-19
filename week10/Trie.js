class Trie {
    constructor() {
        this.root = {};
        this.END_OF_WORD = Symbol('$');
    }
    insert(word) {
        let node = this.root;
        for(let c of word){
            if (node[c] === void 0) {
                node[c] = {};
            }
            node = node[c];
        }
        node[this.END_OF_WORD] = true;
    }

    search(word) {
        let node = this.root;
        for(let c of word){
            if (node[c] === void 0) {
                return false;
            }
            node = node[c];
        }
        return node[this.END_OF_WORD] != undefined;
    }

    startsWith(word) {
        let node = this.root;
        for(let c of word){
            if (node[c] === void 0) {
                return false;
            }
            node = node[c];
        }
        return true;
    }
}

function generateTrieTree() {
    return new Trie()
}

tree = new Trie()
tree.insert('hello')
console.log(tree);
console.log(tree.search('hello'))