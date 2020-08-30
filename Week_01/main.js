let pattern = [
  [2, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
]

function show() {
  let boardWidth = 3;
  let boardHeight = 3;
  let board = document.getElementById("board");
  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText = 
        pattern[j][i] === 2 ? "❌" :
        pattern[j][i] === 1 ? "⭕️" : "";
      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }
}

show(pattern);