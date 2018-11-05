const rows = 8;
const columns = 8;
let board = document.getElementById('board');

let tile = new Array(rows);
for (let i = 0; i < rows; i++) {
  tile[i] = new Array(columns)
}

 nameUm = "Lucas";
 nameDois = "Jun";
 
makeBoard(nameUm, nameDois);

function makeBoard(nameOne, nameTwo) {
/* Preparar o tabuleiro inicial do jogo.
 * Nas 3 primeiras linhas, popular quadrados verdes (pretos) com pecas pretas
 * Nas 3 ultimas linhas, popular quadrados verdes (pretos) com pecas brancas
 * Nas outras linhas, popular com quadrados vazios
 * Adicionar event listener apenas em quadrados verdes (pretos)
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
        /* 3 primeiras linhas */
        if(row < 3){
          tile[row][column].piece = 1;   //black common
          tile[row][column].src = "../pictures/black_common_black_square.png";
        }
        else{
          /* 3 ultimas linhas */
          if(8 - row < 4){
            tile[row][column].piece = -1;  //white common
            tile[row][column].src = "../pictures/white_common_black_square.png";
          }
          else {
            tile[row][column].piece = 0;
            tile[row][column].src = "../pictures/empty_black_square.png";
          }
        }
        tile[row][column].row = row + 1;
        tile[row][column].column = column + 1;
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
  console.log(row);
  board.appendChild(nameTwoHTML);
}
 
function click(event) {
  let source = event.target;
  console.log("Voce clicou em: coluna " + source.column + " linha: " + source.row);
  if(source.piece < 0) {
    console.log("Peca branca!");
  }
  if(source.piece > 0) {
    console.log("Peca preta!");
  }
}
 