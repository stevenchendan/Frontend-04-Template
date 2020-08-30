let pattern = [
  [2, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
];

let color = 1;

function show() {
  let boardWidth = 3;
  let boardHeight = 3;
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
  pattern[x][y] = color;
  color = 3 - color;
  show();
}

show(pattern);