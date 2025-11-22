// Game State
const gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    winner: null,
    isDraw: false,
    gameOver: false
};

// Win conditions (all 8 possible winning combinations)
const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// DOM Elements
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');
const statusMessage = document.getElementById('game-status');
const currentPlayerDisplay = document.getElementById('current-player-display');

// Initialize game
function initGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
        cell.textContent = '';
        cell.classList.remove('filled', 'disabled', 'player-x', 'player-o');
    });
    
    resetBtn.addEventListener('click', resetGame);
    updateDisplay();
}

// Handle cell click
function handleCellClick(index) {
    // Don't allow moves if game is over or cell is already filled
    if (gameState.gameOver || gameState.board[index] !== "") {
        return;
    }
    
    // Place the mark
    gameState.board[index] = gameState.currentPlayer;
    updateCell(index);
    
    // Check for win or draw
    checkGameStatus();
    
    // Switch player if game continues
    if (!gameState.gameOver) {
        gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
        updateDisplay();
    }
}

// Update a cell visually
function updateCell(index) {
    const cell = cells[index];
    const player = gameState.board[index];
    
    cell.classList.add('filled');
    
    if (player === "X") {
        cell.textContent = "🦄"; // Rainbow Unicorn for Player X
        cell.classList.add('player-x');
    } else {
        cell.textContent = "✨"; // Sparkle/Star for Player O
        cell.classList.add('player-o');
    }
}

// Check for win or draw
function checkGameStatus() {
    // Check for win
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (
            gameState.board[a] !== "" &&
            gameState.board[a] === gameState.board[b] &&
            gameState.board[a] === gameState.board[c]
        ) {
            gameState.winner = gameState.board[a];
            gameState.gameOver = true;
            displayWinner();
            disableAllCells();
            return;
        }
    }
    
    // Check for draw
    if (!gameState.board.includes("")) {
        gameState.isDraw = true;
        gameState.gameOver = true;
        displayDraw();
        disableAllCells();
        return;
    }
}

// Display winner message
function displayWinner() {
    const playerName = gameState.winner === "X" ? "Player 1 (🦄)" : "Player 2 (✨)";
    statusMessage.textContent = `🎉 ${playerName} Wins! Unicorn Victory! 🎉`;
    statusMessage.classList.add('victory');
    currentPlayerDisplay.textContent = '';
}

// Display draw message
function displayDraw() {
    statusMessage.textContent = "🌟 Magical Draw! 🌟";
    statusMessage.classList.add('draw');
    currentPlayerDisplay.textContent = '';
}

// Disable all cells
function disableAllCells() {
    cells.forEach(cell => {
        cell.classList.add('disabled');
    });
}

// Update display
function updateDisplay() {
    if (!gameState.gameOver) {
        const playerName = gameState.currentPlayer === "X" ? "Player 1 (🦄)" : "Player 2 (✨)";
        currentPlayerDisplay.textContent = `${playerName}'s turn`;
        statusMessage.textContent = '';
        statusMessage.classList.remove('victory', 'draw');
    }
}

// Reset game
function resetGame() {
    gameState.board = ["", "", "", "", "", "", "", "", ""];
    gameState.currentPlayer = "X";
    gameState.winner = null;
    gameState.isDraw = false;
    gameState.gameOver = false;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('filled', 'disabled', 'player-x', 'player-o');
    });
    
    updateDisplay();
}

// Initialize the game when page loads
initGame();

