window.onload = function() {
  var gameInterval;
  var gameArray = [
    //Row 
    [-1,1,-1,-1,-1,-1,-1,9,-1],
    //Row 
    [-1,-1,4,-1,-1,-1,2,-1,-1],
    //Row 
    [-1,-1,8,-1,-1,5,-1,-1,-1],
    //Row 
    [-1,-1,-1,-1,-1,-1,-1,3,-1],
    //Row 
    [2,-1,-1,-1,4,-1,1,-1,-1],
    //Row 
    [-1,-1,-1,-1,-1,-1,-1,-1,-1],
    //Row 
    [-1,-1,1,8,-1,-1,6,-1,-1],
    //Row 
    [-1,3,-1,-1,-1,-1,-1,8,-1],
    //Row 
    [-1,-1,6,-1,-1,-1,-1,-1,-1]   
  ];
  var solutionArray;
  var input = "";
  var inputCellsArray = [];
  var onClickCell = "";
  var table = document.getElementById("sudoku-board");
  for (var i = 0, row; row = table.rows[i]; i++) {
    for (var j = 0, col; col = row.cells[j]; j++) {
      row.cells[j].setAttribute("id", "" + i + j);
    }  
  }

  function sameBlock(x1, y1, x2, y2) {
    let firstRow = Math.floor(y1 / 3) * 3;
    let firstCol = Math.floor(x1 / 3) * 3;
    return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
  }
 
  function sameRow(y1, y2) {
    return y1 == y2;
  }
 
  function sameColumn(x1, x2) {
    return x1 == x2;
  }

  function checkInput(x1, y1, x2, y2) {
    if (x1 == x2 && y1 == y2) { return false; }
    return sameBlock(x1, y1, x2, y2) || sameRow(y1, y2) || sameColumn(x1, x2);
  }

  function pad(val) {
    var valString = val + "";
    return (valString.length < 2) ? ("0" + valString) : valString;
  }

  minutesLabel = document.getElementById("minutes");
  secondsLabel = document.getElementById("seconds");
  var sudokuCells = document.querySelectorAll("#sudoku-board td");

  var sudokuInputHandler = function (event) {
    if (!input) { return; }
    this.innerText = input;
    input = "";
    inputCellsArray.push(this);
    onClickCell.classList.remove("on-click");
    for (var i = 0; i < sudokuCells.length; i++) {
      if (sudokuCells[i].innerText == this.innerText) {
        if (checkInput(sudokuCells[i].id.slice(0,1), sudokuCells[i].id.slice(1), this.id.slice(0,1), this.id.slice(1))) {
          this.classList.add("error");
          return;
        }
      }
    }
    this.classList.remove("error");
    this.classList.add("user-input");
  }
  
  var paletteCells = document.querySelectorAll("#numbers-palette td");
  
  var paletteInputHandler = function (event) {
    input = this.innerText;
    if (onClickCell) {
      onClickCell.classList.remove("on-click");
    }
    this.classList.add("on-click");
    onClickCell = this;
  }

  startBtn = document.getElementById("start-btn");

  startBtn.onclick = function() {
    var totalSeconds = 0;
    inputCellsArray = [];
    
    function setTime() {
      ++totalSeconds;
      minutesLabel.innerText = pad(parseInt(totalSeconds / 60));
      secondsLabel.innerText = pad(totalSeconds % 60);
    }

    secondsLabel.innerText = "00";
    minutesLabel.innerText = "00";
    clearInterval(gameInterval);
    gameInterval = setInterval(setTime, 1000);
    resetBtn.disabled = false;
    solveBtn.disabled = false;
    for (var i = 0, row; row = table.rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        row.cells[j].classList.remove("const");
        row.cells[j].classList.remove("user-input");  
        row.cells[j].classList.remove("error");
        if (gameArray[i][j] == "-1") {
          row.cells[j].innerText = "";
        } else {
          row.cells[j].innerText = gameArray[i][j];
          row.cells[j].classList.add("const");
        }
      }  
    }
    for (var i = 0; i < paletteCells.length; i++) {
      paletteCells[i].addEventListener("click", paletteInputHandler);
    }
    for (var i = 0; i < sudokuCells.length; i++) {
      if (sudokuCells[i].classList.contains("const")) { continue; }
      sudokuCells[i].addEventListener("click", sudokuInputHandler);
    }
 };

 solveBtn = document.getElementById("solve-btn");

 solveBtn.onclick = function() {
    secondsLabel.innerText = "00";
    minutesLabel.innerText = "00";
    clearInterval(gameInterval);
    for (var i = 0; i < paletteCells.length; i++) {
      paletteCells[i].removeEventListener("click", paletteInputHandler);
    }
    for (var i = 0; i < sudokuCells.length; i++) {
      sudokuCells[i].removeEventListener("click", sudokuInputHandler);
      sudokuCells[i].classList.remove("user-input");
      sudokuCells[i].classList.remove("const");
      sudokuCells[j].classList.remove("error");
    }
    inputCellsArray = [];
    solveBtn.disabled = true;
    resetBtn.disabled = true;
 }

 resetBtn = document.getElementById("reset-btn");

 resetBtn.onclick = function() {
  for (var i = 0, row; row = table.rows[i]; i++) {
    for (var j = 0, col; col = row.cells[j]; j++) {
      row.cells[j].innerText = gameArray[i][j] == "-1" ? "" : gameArray[i][j];
      row.cells[j].classList.remove("user-input");  
      row.cells[j].classList.remove("error");
    }  
  }
  inputCellsArray = [];
 }
}
