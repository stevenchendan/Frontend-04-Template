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

function tokenize(source) {
  let result = null;
  while (true) {
    result = regexp.exec(source);
    if (!result) {
      break;
    }
    for (let i = 1; i <= dictionary.length; i++) {
      if (result[i]) {
        console.log(dictionary[i - 1]);
      }
    }
    console.log(result);
  }
}

tokenize("1024 + 10 * 25")
