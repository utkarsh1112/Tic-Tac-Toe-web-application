// Select the status display element where game messages will be shown
const statusDisplay = document.querySelector('.game--status');

// variables to track the game state
let gameActive = true;     // determines if the game is still active
let currentPlayer = "X";         // keeps track of the current player ("X" or "O")
let gameState = ["", "", "", "", "", "", "", "", ""];  // array representing the game board

//messages for various game outcomes
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//Initialize the game status display with the current player's turn
statusDisplay.innerHTML = currentPlayerTurn();

//winning combinations for game board
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle a cell being played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Function to change the current player
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Function to validate the result of the game after a move
function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {         // check each winning condition
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        // ff any cell in the winning condition is empty, skip this condition
        if(a === '' || b === '' || c === '')
            continue;
        // check if all three values match (indicating a win)
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }
    //if a player has won, display the winning message and end the game
    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    //check for a draw (if there are no empty cells left)
    const roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    //If no win or draw, switch to the other player
    handlePlayerChange();
}

// Function to handle a cell click event
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//function to restart the game
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// add event listeners to all game cells for clicks
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
// add an event listener to the restart button
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
