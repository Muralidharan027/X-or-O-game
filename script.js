document.addEventListener('DOMContentLoaded', () => {
    const statusDisplay = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const winAnimation = document.getElementById('winAnimation');
    const winnerPage = document.getElementById('winnerPage');
    const winnerText = document.getElementById('winnerText');

    let gameActive = true;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];

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

    const messages = {
        playerTurn: () => `Player ${currentPlayer}'s Turn`,
        win: () => `Player ${currentPlayer} Wins!`,
        draw: () => `Game Ended in a Draw!`
    };

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = messages.win();
            statusDisplay.classList.add('winner');
            gameActive = false;
            
            // Start the win sequence
            winAnimation.classList.add('active');
            
            // After 2 seconds (animation complete), show winner page
            setTimeout(() => {
                winAnimation.classList.remove('active');
                winnerText.textContent = `Player ${currentPlayer} Wins!`;
                winnerPage.classList.add('active');
            }, 2000);
            
            return;
        }

        const roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.textContent = messages.draw();
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = messages.playerTurn();
    }

    function handleReset() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.textContent = messages.playerTurn();
        statusDisplay.classList.remove('winner');
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('x', 'o');
        });
        winAnimation.classList.remove('active');
        winnerPage.classList.remove('active');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleReset);
});