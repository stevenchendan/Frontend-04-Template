function findAFromString(str) {
  if (str === "" || str === undefined) {
    return null;
  }
  let strArray = str.split('');

  for (let i = 0; i < strArray.length; i++) {
    if (str[i].toLowerCase() == 'a') {
      return i;
    }
  }
  return null;
}

let result = findAFromString("testaa");
console.log(result)