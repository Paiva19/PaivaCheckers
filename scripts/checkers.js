const rows = 8;
const columns = 8;
let selectedRow = 0;
let selectedColumn = 0;
let pieceSelected = 0; // 0 when no piece has been selected. selected piece's type identifier when a piece has been selected
let board = document.getElementById('board');

let tile = new Array(rows);
for (let i = 0; i < rows; i++) {
  tile[i] = new Array(columns)
}

 nameUm = "Lucas";
 nameDois = "Jun";
 
makeBoard(nameUm, nameDois);

function removePieceFromBoard(row, column){
  tile[row][column].piece = 0;
  tile[row][column].src = "../pictures/empty_black_square.png";
}

function placePieceOnBoard(row, column, piece){
  tile[row][column].piece = piece;   //piece type identifier
  switch(piece){
    case 1: 
      tile[row][column].src = "../pictures/black_common_black_square.png";
      break;
    case 2: 
      tile[row][column].src = "../pictures/black_special_black_square.png";
      break;
    case -1: 
      console.log("yay");
      tile[row][column].src = "../pictures/white_common_black_square.png";
      break;
    case -2: 
      tile[row][column].src = "../pictures/white_special_black_square.png";
      break;
  }
}

function makeBoard(nameOne, nameTwo) {
/* Initialize the game board
 * On the first 3 rows, populate green squares with black pieces
 * On the last 3 rows, populate green squares with white pieces
 * on other rows, populate with empty squares
 * Add event listener only on green squares
 */
  let nameOneHTML = document.createElement("h1");
  nameOneHTML.innerHTML = nameOne;
  nameOneHTML.style = "position:absolute; text-align: center; margin-left: auto;";
  nameOneHTML.style.top = 0;
  board.appendChild(nameOneHTML);

  board.message = "";
  let row;
  let column;
  for (row = 0; row < rows; row++){
    for (column = 0; column < columns; column++) {
      tile[row][column] = document.createElement("img");
      if((row + column)%2 == 0){
        /* 3 first rows */
        if(row < 3){
          placePieceOnBoard(row, column, 1);
        }
        else{
          /* 3 last rows */
          if(8 - row < 4){
            placePieceOnBoard(row, column, -1)
          }
          else {
            removePieceFromBoard(row, column);
          }
        }
        tile[row][column].row = row;
        tile[row][column].column = column;
        tile[row][column].addEventListener("mousedown", click);
      }
      else{
        tile[row][column].src = "../pictures/empty_white_square.png";
      }
      tile[row][column].style = "position:absolute;height:64px; width: 64px";
      tile[row][column].style.top = 75 + row * 64;
      tile[row][column].style.left = 50 + column * 64;
      board.appendChild(tile[row][column]);
    }
  }
  let nameTwoHTML = document.createElement("h1");
  nameTwoHTML.innerHTML = nameTwo;
  nameTwoHTML.style = "position:absolute; text-align: center; margin-left: auto;";
  nameTwoHTML.style.top = (row + 1) * 64;
  board.appendChild(nameTwoHTML);
}
 
function click(event) {
  let source = event.target;
  
  if(pieceSelected != 0){
    /*Where to move the selected piece?*/
    if(source.piece == 0){  
      removePieceFromBoard(selectedRow, selectedColumn);
      placePieceOnBoard(source.row, source.column, pieceSelected);
      pieceSelected = 0;
    }
    else{
      board.message = "Please select an empty space to move your piece"
    }
  }
  else{
    if(source.piece < 0){
      pieceSelected = source.piece;
      selectedRow = source.row;
      selectedColumn = source.column;
    }
    else{
      board.message = "Please select a valid space"
    }
  }
}
 