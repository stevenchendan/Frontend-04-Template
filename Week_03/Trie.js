//字典树 trie

//利用symbol不可重复特性 让代码变得更严谨
let $ = Symbol("$");
class Trie {
  constructor () {
    this.root = Object.create(null)
  }
  insert (words) {
    let node = this.root

    for (let n of words) {
      if (!node[n]) {
        node[n] = Object.create(null)
      }
      node = node[n]
    }
    if (!($ in node)) node[$] = 0
    node[$]++
  }
  most () {
    let mostWords = ''
    let mostLength = 0

    function visited (node, words) {
      if (node[$] && node[$] > mostLength) {
        mostWords = words
        mostLength = node[$]
      }
      for (let n in node) {
        visited(node[n], words + n)
      }
    }
    visited(this.root, '')
    return { mostWords, mostLength }
  }
}

//generate random words
function randomWord(length) {
  let s = "";
  for (let i = 0; i < length; i++) {
    s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0));
  }
  return s;
}
let trie = new Trie();

for (let i = 0; i < 100000; i++) {
  trie.insert(randomWord(4));
}

console.log(trie.most());
