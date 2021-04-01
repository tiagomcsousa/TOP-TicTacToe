const Player = (regist) => {

    this.regist = regist;

    const getRegist = () => {
        return regist;
    }

    return { getRegist };
};

const Gameboard = (() => {

    const board = [];

    const getBoard = () => {
        return board;
    }

    const initBoard = () => {
        for (let i = 0; i <= 8; i++) {
            board.push('');
        }
    };

    const setSquare = (index, regist) => {
        board[index] = regist;
    }

    const getSquare = (index) => {
        return board[index];
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return { getBoard, initBoard, getSquare, setSquare, reset };
})();


const DisplayController = (() => {
    const squares = document.querySelectorAll('.square');
    const playerTurn = document.getElementById('player-turn');

    const getPlayerTurn = () => {
        return playerTurn;
    }

    Gameboard.initBoard();

    const clearDisplay = () => {
        for (let i = 0; i <= 8; i++) {
            squares[i].textContent = '';
        }
    }

    squares.forEach((squareElement) => {
        squareElement.addEventListener("click", (e) => {
            if (e.target.textContent != "") return; /* to ignore clicked square already played */
            let targetIndex = e.target.id;
            GameController.play(targetIndex);
            squares[targetIndex].textContent = Gameboard.getSquare(targetIndex);
        })
    })
    return { clearDisplay, getPlayerTurn };
})();

const GameController = (() => {

    const player1 = Player("X");
    const player2 = Player("O");

    let roundNumber = 1;
    let isGameOver = false;

    const play = (index) => {
        Gameboard.setSquare(index, getPlayerTurnRegist());

        if (checkWin(Gameboard)) {
            alert("Player " + getPlayerTurnRegist() + " won!");
            isGameOver = true;
            Gameboard.reset();
            DisplayController.clearDisplay();
            GameController.resetGame();
            DisplayController.getPlayerTurn().textContent = "Player 'X' turn!";
            return;
        }
        if (roundNumber == 9) {
            alert("It's a draw!");
            console.log('draw');
            isGameOver = true;
            Gameboard.reset();
            GameController.resetGame();
            DisplayController.getPlayerTurn().textContent = "Player 'X' turn!";
            return;
        }

        roundNumber++;
        DisplayController.getPlayerTurn().textContent = "Player '" + getPlayerTurnRegist() + "' turn!";
    }

    const getPlayerTurnRegist = () => {
        return roundNumber % 2 == 1 ? player1.getRegist() : player2.getRegist();
    };

    const checkWinRows = (board) => {
        for (let i = 0; i < 3; i++) {
            let rowToCheck = [];
            for (let j = i * 3; j < i * 3 + 3; j++) {
                rowToCheck.push(board.getSquare(j));
            }
            if (rowToCheck.every(square => square == 'X') || rowToCheck.every(square => square == 'O')) {
                return true;
            }
        }
    }

    const checkWinColumns = (board) => {
        for (let i = 0; i < 3; i++) {
            let columnToCheck = [];
            for (let j = 0; j < 3; j++) {
                columnToCheck.push(board.getSquare(i + 3 * j));
            }
            if (columnToCheck.every(square => square == 'X') || columnToCheck.every(square => square == 'O')) {
                return true;
            }
        }
    }

    const checkWinDiagonal = (board) => {
        let diagonalDesc = [board.getSquare(0), board.getSquare(4), board.getSquare(8)];
        let diagonalAsc = [board.getSquare(6), board.getSquare(4), board.getSquare(2)];
        if (diagonalDesc.every(square => square == 'X') || diagonalDesc.every(square => square == 'O')) {
            return true;
        }
        if (diagonalAsc.every(square => square == 'X') || diagonalAsc.every(square => square == 'O')) {
            return true;
        }
    }


    const checkWin = (board) => {
        if (checkWinRows(board) || checkWinColumns(board) || checkWinDiagonal(board)) {
            return true;
        }
        return false;
    }


    const getIsGameOver = () => {
        return isGameOver;
    };

    const resetGame = () => {
        roundNumber = 1;
        isGameOver = false;
    }

    return { play, getIsGameOver, resetGame };

})();