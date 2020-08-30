let pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
let boardWidth = 3;
let boardHeight = 3;
let symbol = 1;

function show() {
  let board = document.getElementById("board");
  //refresh the board
  board.innerHTML = "";
  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText = 
        pattern[i][j] === 2 ? "❌" :
        pattern[i][j] === 1 ? "⭕️" : "";
      
      cell.addEventListener("click", () => move(i, j));
      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }
}


function move(x, y) {
  pattern[x][y] = symbol;
  if (check(pattern, symbol)) {
    alert(symbol == 2 ? "❌ is winner!" : "⭕️ is winner!");
  }
  symbol = 3 - symbol;
  show();
  if (willWin(pattern, symbol)) {
    console.log(symbol == 2 ? "❌ will win!" : "⭕️ win win!");
  }
}


function check(pattern, symbol) {
  //check columns
  for (let i = 0; i < boardWidth; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== symbol) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  //check rows
  for (let i = 0; i < boardWidth; i++) {
    let win = true;
    for (let j = 0; j < boardHeight; j++) {
      if (pattern[j][i] !== symbol) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  {
    let win = true;
    for (let j = 0; j < boardHeight; j++) {
      if (pattern[j][2 - j] !== symbol) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  {
    let win = true;
    for (let j = 0; j < boardHeight; j++) {
      if (pattern[j][j] !== symbol) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
}

function clone(pattern) {
  return JSON.parse(JSON.stringify(pattern));
}

function willWin(pattern, symbol) {
  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      //if not empty skip
      if (pattern[i][j]) {
        continue;
      }
      //clone this board
      let tempPattern = clone(pattern);
      //make a move
      tempPattern[i][j] = symbol;
      //check the move made by AI
      if (check(tempPattern, symbol)) {
        return true;
      }
    }
  }
  return false;
}

show(pattern);