const rows = 8;
const columns = 8;
let selectedRow = 0;
let selectedColumn = 0;
let turn = -1; // -1 when whites turn, 1 when blacks turn
let pieceSelected = 0; // 0 when no piece has been selected. selected piece's type identifier when a piece has been selected
let board = document.getElementById('board');
let killStreak = false;
let canKill = false;
let tile = new Array(rows);
let possibleMoves = new Array(0);
for (let i = 0; i < rows; i++) {
  tile[i] = new Array(columns)
}
var playerName1 = "Player 1";
var playerName2 = "Player 2";
playerName1 = getPlayerNames("nameOne");
playerName2 = getPlayerNames("nameTwo");

function getPlayerNames(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
  }
  return(false);
}


makeBoard(playerName1, playerName2);

function passTurn(){
  pieceSelected = 0;
  selectedRow = 0;
  selectedColumn = 0;
  turn = turn * -1;
  killStreak = false;
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
        else{
          if(tile[frontSides[0]][frontSides[1]].piece * turn < 0){
            checkKillThisPiece(frontSides[0], frontSides[1], frontSides[0] + turn, frontSides[1] + side*turn);
          }
        }
      }
    }
  side += 2;
  }
}

function findKillingStreakMoves(sourceRow, sourceColumn){
  let i = -1;
  let j = -1;
  while(i < 2){
    while(j < 2){
      if((sourceRow + 2*i) < rows && (sourceColumn + 2*j) < columns && (columns && sourceRow + 2*i) > -1 && (sourceColumn + 2*j) > -1){ 
        if(tile[sourceRow + i][sourceColumn + j].piece * turn < 0){
          checkKillThisPiece(sourceRow + i, sourceColumn + j, sourceRow + 2*i, sourceColumn  + 2*j);
        }
      }
      j = j + 2;
    }
    j = -1;
    i = i + 2;
  }
  if(possibleMoves.length == 0) killStreak = false;
  else killStreak = true;

}

function checkKillThisPiece(victimRow, victimColumn, goingRow, goingColumn){
  if(goingRow < rows && goingColumn < columns && goingRow >= 0 && goingColumn >= 0){
    if(tile[goingRow][goingColumn].piece == 0){
      setPossibleMove(tile[goingRow][goingColumn]);
    }
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
      tile[row][column].src = "../pictures/white_common_black_square.png";
      break;
    case -2: 
      tile[row][column].src = "../pictures/white_special_black_square.png";
      break;
  }
}

function movePiece(source){
  removePieceFromBoard(selectedRow, selectedColumn);
  clearPossibleMoves();
  placePieceOnBoard(source.row, source.column, pieceSelected);
  if(source.row - selectedRow > 1 || source.row - selectedRow < -1){
    removePieceFromBoard((source.row + selectedRow)/2, (source.column + selectedColumn)/2);
    findKillingStreakMoves(source.row, source.column);
  }
  if(killStreak){
    selectPiece(source);
  }
  else{
    passTurn();
  }
  
}

function makeBoard(playerNames) {
/* Initialize the game board
 * On the first 3 rows, populate green squares with black pieces
 * On the last 3 rows, populate green squares with white pieces
 * on other rows, populate with empty squares
 * Add event listener only on green squares
 */
  let nameOneHTML = document.createElement("h1");
  nameOneHTML.innerHTML = playerName1;
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
  nameTwoHTML.innerHTML = playerName2;
  nameTwoHTML.style = "position:absolute; text-align: center; margin-left: auto;";
  nameTwoHTML.style.top = (row + 1) * 64;
  board.appendChild(nameTwoHTML);
}

function click(event) {
  let source = event.target;
  if(source.piece * turn > 0 && !killStreak){ //Select/reselect a piece
    clearPossibleMoves();
    selectPiece(source);
    findSimpleMoves(source);
  }
  if(pieceSelected != 0){
    /*Where to move the selected piece?*/
    
    if(source.piece == 0){ 
      if(canMovePieceToTile(source.row, source.column)){
        movePiece(source);
      }
    }
    else{
      board.message = "Please select an empty space to move your piece"
    }
  }
}
 