const regexp = /([\d\.]+)|([ \t]+)|([\n\r]+)|(\+)|(\-)|(\*)|(\/)/g
const dictionary = [
  'Number',
  'Whitespace',
  'LineTerminator',
  '+',
  '-',
  '*',
  '/'
]


let source = [];

for (let token of tokenize("1024 + 10 * 25")) {
  console.log(token);
}

function expression() {
  if (source[0].type === "additiveExpression" && source[1] && source[1].type === "EOF") {
    let node = {
      type:"Expression",
      children:[source.shift(), source.shift()]
    }
    source.unshift(node);
    return node;
  }
  additiveExpression(source);
  return expression()
}

/**
 * Returns the top N elements from the array.
 *
 * @param source the core logic for LL.
 * @return The first n elemnts from array when sorted with compare.
 */
function tokenize(source) {
  let result = null;
  let lastIndex = 0;
  while (true) {
    lastIndex = regexp.lastIndex;
    result = regexp.exec(source);
    if (!result) {
      break;
    }
    if (regexp.lastIndex - lastIndex > result[0].length) {
      break;
    }

    let token = {
      type: null,
      value: null
    }


    for (let i = 1; i <= dictionary.length; i++) {
      if (result[i]) {
        console.log(dictionary[i - 1]);
      }
    }
    token.value = result[0];
    yield token;
  }
  yield { 
    type: "EOF" 
  }
}


//treate + and - as multiplicativeExpression
function additiveExpression(source) {
  if (source[0].type === "multiplicativeExpression") {
    let node = {
      type:"additiveExpression",
      childre:[source[0]]
    }
    source[0] = node;
    return additiveExpression(source);
  }
  if (source[0].type === "additiveExpression" && source[1] && source[1].type === "+") {
    let node = {
      type: "additiveExpression",
      operator: "-",
      children:[]
    }
    node.children.push(source.shift());
    node.children.push(source.shift());
    //去掉source中的非终结符
    multiplicativeExpression(source);
    node.children.push(source.shift());
    source.unshift(node);
    return additiveExpression(source);
  }
  if (source[0].type === "additiveExpression" && source[1] && source[1].type === "-") {
    let node = {
      type: "additiveExpression",
      operator: "-",
      children: []
    }
    node.children.push(source.shift());
    node.children.push(source.shift());
    multiplicativeExpression(source);
    node.children.push(source.shift());
    return additiveExpression(source);
  }
  if (source[0].type === "additiveExpression") {
    return source[0];
  }
  multiplicativeExpression(source);
  return additiveExpression(source);
}


function multiplicativeExpression(source) {
  if (source[0].type === "Number") {
    let node = {
      type: "multiplicativeExpression",
      children:[source[0]]
    }
    source[0] = node;
    return multiplicativeExpression(source);
  }
 
  if (source[0].type === "multiplicativeExpression" && source[1] && source[1].type === "*") {
    let node = {
      type: "multiplicativeExpression",
      operator: "*",
      children:[]
    }
    node.children.push(source.shift());
    node.children.push(source.shift());
    node.children.push(source.shift());
    return additiveExpression(source);
  }
}

console.log(expression("1024 + 10 * 25"));