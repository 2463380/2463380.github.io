/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

/*----- app's state (variables) -----*/
let board;
var turn = "X";
let win;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);


/*----- functions -----*/
//regard si un joueur a gagner
function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
};

//fonction qu'il fait a chaque tour et le changement de joueur
function handleTurn() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    board[idx] = turn;
    let imageUrl = turn === 'X' ? './image/imageX.jpg' : './image/imageO.png';
    board[idx] = imageUrl;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    render();
};

//board
function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    render();
};
//affiche
function render() {
    //Met des image dans le html et si rien met rien
    board.forEach(function(mark, index) {
        if (mark) {
            squares[index].innerHTML = `<img src="${mark}" alt="player" class="game-piece">`;
        } else {
            squares[index].textContent = "";
        }
    });
    //egaliter
    if (win === 'T') {
        messages.textContent = `C'est une égalité`;
    } 
    //X gagne
    else if (win === './image/imageX.jpg') {
        messages.innerHTML = `<p id="win-text">Le gagnant est: <img src="./image/imageX.jpg" alt="Player X wins!" class="game-piece2"></p>`;
        PointX();
    }
    //O gagne 
    else if (win === './image/imageO.png') {
        messages.innerHTML = `<p id="win-text">Le gagnant est: <img src="./image/imageO.png" alt="Player O wins!" class="game-piece2"></p>`;
        PointO();
    } 
    //tour
    else {
        //X tour
        if (turn === 'X') {
            messages.innerHTML = `<p id="win-text">C'est le tour des <img src="./image/imageX.jpg" alt="Player X's turn" class="game-piece2"></p>`;
        } 
        //O tour
        else {
            messages.innerHTML = `<p id="win-text">C'est le tour des <img src="./image/imageO.png" alt="Player O's turn" class="game-piece2"></p>`;
        }
    }
};

init();

//point X
let compteurx = localStorage.getItem('compteurx');
compteurx = compteurx ? parseInt(compteurx) : 0;

//fait +1 au localStorage
function PointX(){
    compteurx++;
    localStorage.setItem('compteurx', compteurx);
    document.getElementById('pointX').textContent = compteurx;
};
document.getElementById('pointX').textContent = compteurx;

//Point O
let compteurO = localStorage.getItem('compteurO');
compteurO = compteurO ? parseInt(compteurO) : 0;

//fait +1 au localStorage
function PointO(){
    compteurO++;
    localStorage.setItem('compteurO', compteurO);
    document.getElementById('pointO').textContent = compteurO;
};
document.getElementById('pointO').textContent = compteurO;

//Dialog

//variable dialog
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

//creer un localStorage
if (localStorage.getItem('ouverture') === null) {
    localStorage.setItem('ouverture', 0);
}

//montre le dialog
function showDialog() {
    if (localStorage.getItem('ouverture') === '0') {
        dialog.showModal();
    } else {
        dialog.close();
    }
}
showDialog();

//ferme le dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

//ferme le dialog et apparait plus
document.getElementById("fermerToujours").addEventListener("click", () => {
    localStorage.setItem('ouverture', 1);
    dialog.close();
});