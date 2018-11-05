const rows = 8;
const columns = 8;
let status = document.getElementById('status');
status.addEventListener('click', makeBoard);

let board = new Array(rows);
let picture = new Array(rows);
let tile = new Array(rows);
for (let i = 0; i < rows; i++) {
  board[i] = new Array(columns);
  picture[i] = new Array(columns);
  tile[i] = new Array(columns)
}
 
makeBoard();
 
function check(row, column) {
  if (column >= 0 && row >= 0 && column < columns && row < rows)
    return board[row][column];
}
 
function makeBoard() {
/* Preparar o tabuleiro inicial do jogo.
 * Nas 3 primeiras linhas, popular quadrados verdes (pretos) com pecas pretas
 * Nas 3 ultimas linhas, popular quadrados verdes (pretos) com pecas brancas
 * Nas outras linhas, popular com quadrados vazios
 * Adicionar event listener apenas em quadrados verdes (pretos)
 */
  for (let row = 0; row < rows; row++){
    for (let column = 0; column < columns; column++) {
      tile[row][column] = document.createElement('img');
      if((row + column)%2 == 0){
        /* 3 primeiras linhas */
        if(row < 3){
          tile[row][column].src = '../pictures/black_common_black_square.png';
        }
        else{
          /* 3 ultimas linhas */
          if(8 - row < 4){
            tile[row][column].src = '../pictures/white_common_black_square.png';
          }
          else {
            tile[row][column].src = '../pictures/empty_black_square.png';
          }
        }
        tile[row][column].row = row + 1;
        tile[row][column].column = column + 1;
        tile[row][column].addEventListener('mousedown', click);
      }
      else{
        tile[row][column].src = '../pictures/empty_white_square.png';
      }
      tile[row][column].style = 'position:absolute;height:30px; width: 30px';
      tile[row][column].style.top = 150 + row * 30;
      tile[row][column].style.left = 50 + column * 30;
      document.body.appendChild(tile[row][column]);
    }
  }
}
 
function click(event) {
  let source = event.target;
  console.log("Voce clicou em: coluna " + source.column + " linha: " + source.row); 
}
 