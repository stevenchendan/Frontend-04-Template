// find ab from string without regular expression(without state machine)
function findABFromString(str) {
  if (str === "" || str === undefined) {
    return false;
  }
  for (let i in str) {
    if (str.charAt(i) == "a") {
      if (str.charAt(i + 1)) {
        return true;
      }
    }
  }
  return false;
}

findABFromString("test");