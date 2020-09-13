
/**
 * Kmp algorithnm to compare two different string
 *
 * @param source the core logic for LL.
 * @param pattern first n elemnts from array when sorted with compare.
 */
function kmp (source, pattern) {
  //compute table
  let table = new Array(pattern.length).fill(0);
  
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
  console.log(table);
  //

}

kmp("", "abcdabcd")
