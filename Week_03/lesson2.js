//利用symbol不可重复特性 让代码变得更严谨
let $ = Symbol("$");
class Trie {
  constructor() {
    this.root = Object.create(null);
  }
  insert(word) {
    console.log(word);
    console.log(this.root);
    let node = this.root;
    for (let c of word) {
      if (!node[c]) {
        node[c] = Object.create(null);
      }
      node = node[c];
    }
    if (!$ in node) {
      node[$] = 0;
    }
    node[$]++;
  }
  most () {
    let maxLength = 0;
    let maxWord = null;
    
    let visit = (node, word) => {
      // console.log(node);
      //find the end point of the words
      if (node[$] && node[$] > maxLength) {
        maxLength = node[$];
        maxWord = word;
      }
      for (let p in node) {
        visit(node[p], word + p);
      }
    }
    visit(this.root, "");
    // console.log(maxWord);
    // console.log(maxLength);
    return { maxWord, maxLength };
  }
}

//generate random words
function randomWord(length) {
  let s = "";
  for (let i = 0; i < length; i++) {
    s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0));
  }
  console.log("s", s);
  return s;
}
let trie = new Trie();

for (let i = 0; i < 100000; i++) {
  trie.insert(randomWord(4));
}

console.log(trie.most());
console.log(trie);
