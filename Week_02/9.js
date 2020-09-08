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

// tokenize("1024 + 10 * 25")

for (let token of tokenize("1024 + 10 * 25")) {
  console.log(token);
}