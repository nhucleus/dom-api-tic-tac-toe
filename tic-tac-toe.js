const key = 'tic-tac-toe-game-state';
let currentPlayerSymbol = 'x';
let squareValues = ['', '', '', '', '', '', '', '', ''];
let gameStatus = "";

function saveGameState() {
    const state = {
        currentPlayerSymbol,
        squareValues,
        gameStatus,
    };

    window.localStorage.setItem(key, JSON.stringify(state));
}

function loadGameState() {
    const savedState = window.localStorage.getItem(key);
    if (savedState === null) return;
    
    const state = JSON.parse(savedState);
    currentPlayerSymbol = state.currentPlayerSymbol;
    squareValues = state.squareValues;
    gameStatus = state.gameStatus;

    for (let i = 0; i < 9; i += 1) {
        if (squareValues[i] !== '') {
            const img = document.createElement('img');
            img.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${squareValues[i]}.svg`;
            document
            .getElementById(`square-${i}`)
            .appendChild(img);
        }
    }
    if (gameStatus !== '') {
    document
        .getElementById('game-status')
        .innerText = `Winner: ${gameStatus.toUpperCase()}`;
    document
        .getElementById('new-game')
        .disabled = false;
    document 
        .getElementById('give-up')
        .disabled = true;
    } else {
    document
        .getElementById('game-status')
        .innerText = '';
    document
        .getElementById('new-game')
        .disabled = true;
    document 
        .getElementById('give-up')
        .disabled = false;
    }
}

function checkGameStatus() {
	for (let i = 0; i < 9; i += 3) {
        if (squareValues[i] !== ""
                && squareValues[i] === squareValues[i + 1]
                && squareValues[i] === squareValues[i + 2]) {
            gameStatus	= squareValues[i];
            break;
        }
    }

    for (let i = 0; i < 3; i += 1) {
        if (squareValues[i] !== ""
                && squareValues[i] === squareValues[i + 3]
                && squareValues[i] === squareValues[i + 6]) {
            gameStatus	= squareValues[i];
            break;
        }
    }

    if (squareValues[0] !== ""
            && squareValues[0] === squareValues[4]
            && squareValues[0] === squareValues[8]) {
        gameStatus = squareValues[0];

    }

    if (squareValues[2] !== ""
            && squareValues[2] === squareValues[4]
            && squareValues[2] === squareValues[6]) {
        gameStatus = squareValues[2];

    }

    let boardIsFilled = true;
    for (let i = 0; i < 9; i += 1) {
        if (squareValues[i] === "") {
            boardIsFilled = false;
            break;
        }

    }

    if (boardIsFilled) {
        gameStatus = "None";
    }

    if (gameStatus !== "") {
        document
            .getElementById("game-status")
            .innerText = `"Winner:" ${gameStatus.toLocaleUpperCase()}`;

    document
        .getElementById('new-game')
        .disabled = false;
    }
}


window.addEventListener('DOMContentLoaded', () => {
loadGameState();

document
    .getElementById('tic-tac-toe-board')
    .addEventListener('click', (event) => {
        const targetId = event.target.id;

        if (!targetId.startsWith('square-')) return;

        const squareIndex = Number.parseInt(targetId[targetId.length - 1]);

        if (squareValues[squareIndex] !== '') return;

        const img = document.createElement('img');
        img.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${currentPlayerSymbol}.svg`;
        event.target.appendChild(img);

        squareValues[squareIndex] = currentPlayerSymbol;

        if (currentPlayerSymbol === 'x') {
            currentPlayerSymbol = 'o';
        } else {
            currentPlayerSymbol = 'x';
        }

        checkGameStatus();
        saveGameState();
    });

    document
    .getElementById('new-game')
    .addEventListener('click', () => {
        gameStatus = '';
        document
            .getElementById('game-status')
            .innerHTML = '';
        for (let i = 0; i < 9; i += 1) {
        document
            .getElementById(`square-${i}`)
            .innerHTML = '';
        }
        currentPlayerSymbol = 'x';

        document
            .getElementById('new-game')
            .disabled = true;
        squareValues = ['', '', '', '', '', '', '', '', ''];
        document
            .getElementById("give-up")
            .disabled = false;

        saveGameState();
    });

    document
        .getElementById("give-up")
        .addEventListener("click", event => {
            if (currentPlayerSymbol === "x") {
                gameStatus = "o";
            } else {
                gameStatus = "x";
            }

            document
                .getElementById("game-status")
                .innerText = `"Winner:" ${gameStatus.toLocaleUpperCase()}`;

            document
                .getElementById("give-up")
                .disabled =true;
            document
                .getElementById("new-game")
                .disabled = false;

            saveGameState();
           })
});
