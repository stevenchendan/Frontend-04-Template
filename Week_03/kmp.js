
/**
 * Kmp algorithnm to compare two different string
 *
 * @param source the core logic for LL.
 * @param pattern first n elemnts from array when sorted with compare.
 */
function kmp (source, pattern) {
  //compute table
  let table = new Array(pattern.length).fill(0);
  {
    //make the variable to be local scope rather than global scope
    let i = 0, j = 0;
    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        ++j, ++i;
        table[i] = j;
      } else {
        if (j > 0) {
          j = table[j];
        } else {
          table[i] = j;
          ++i;
        }
      }
    }
  }
  
  {
    //i is the index of source, j is the index of pattern
    let i = 0, j = 0;
    while (i < source.length) {
      if (j === pattern.length) {
        return true;
      }
      if (pattern[j] === source[i]) {
        ++i, ++j;
      } else {
        if (j > 0) {
          j = table[j];
        } else {
          table[i] = j;
          ++i;
        }
      }
    }
    return false;
  }
  console.log(table);
}

console.log(kmp("hello", "ll"));


