const board = document.getElementById("board");
const status = document.getElementById("status");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const newGameButton = document.getElementById("new-game-button");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("button");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.onclick = () => makeMove(index);
        board.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (gameBoard[index] !== "" || !gameActive) return;
    gameBoard[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = gameActive ? `Player ${currentPlayer}'s turn` : status.textContent;
    createBoard();
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            showResult(`Player ${gameBoard[a]} wins!`);
            gameActive = false;
            return;
        }
    }
    if (!gameBoard.includes("")) {
        showResult("It's a draw!");
        gameActive = false;
    }
}

function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.classList.add("visible");
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    resultScreen.classList.remove("visible");
    createBoard();
}

newGameButton.addEventListener("click", resetGame);

createBoard();