const rows = 8;
const columns = 8;
let selectedRow = 0;
let selectedColumn = 0;
let turn = -1; // -1 when whites turn, 1 when blacks turn
let pieceSelected = 0; // 0 when no piece has been selected. selected piece's type identifier when a piece has been selected
let board = document.getElementById('board');
let tile = new Array(rows);
let possibleMoves = new Array(0);
for (let i = 0; i < rows; i++) {
  tile[i] = new Array(columns)
}

 nameUm = "Lucas";
 nameDois = "Jun";
 
makeBoard(nameUm, nameDois);

function passTurn(){
  pieceSelected = 0;
  selectedRow = 0;
  selectedColumn = 0;
  turn = turn * -1;
}

function setPossibleMove(tile){
  tile.src = "../pictures/available_move_black_square.png";
  possibleMoves.push(tile);
}

function clearPossibleMoves(){
  for(let i = possibleMoves.length; i > 0; i--){
    possibleMoves.pop().src = "../pictures/empty_black_square.png";
  }
}

function findSimpleMoves(source){
  let side = -1;
  let frontSides = [source.row + 1 * turn, 0];
  //check front moves
  while(side <= 1){
    frontSides[1] = source.column + side * turn;
    if(frontSides[0] >= 0 && frontSides[0] < rows){
      if(frontSides[1] >= 0 && frontSides[1] < columns){
        if(tile[frontSides[0]][frontSides[1]].piece == 0){
          setPossibleMove(tile[frontSides[0]][frontSides[1]]);
        }
      }
    }
  side += 2;
  }
}

function removePieceFromBoard(row, column){
  tile[row][column].piece = 0;
  tile[row][column].src = "../pictures/empty_black_square.png";
}

function selectPiece(source){
  pieceSelected = source.piece;
  selectedRow = source.row;
  selectedColumn = source.column;
}

function canMovePieceToTile(row, column){
 let myMove = possibleMoves.filter(possibleMove => {
    return possibleMove.column === column && possibleMove.row === row;
  })
  return myMove.length > 0;
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
  if(source.piece * turn > 0){ //Select/reselect a piece
    clearPossibleMoves();
    selectPiece(source);
    findSimpleMoves(source);
  }
  if(pieceSelected != 0){
    /*Where to move the selected piece?*/
    
    if(source.piece == 0){ 
      if(canMovePieceToTile(source.row, source.column)){
        console.log("MEXER");
        removePieceFromBoard(selectedRow, selectedColumn);
        clearPossibleMoves();
        placePieceOnBoard(source.row, source.column, pieceSelected);
        passTurn();
      }
      console.log("NAO MEXER");
    }
    else{
      board.message = "Please select an empty space to move your piece"
    }
  }
}
 