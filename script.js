// Mock data for demonstration
const athletes = [
    { name: "LeBron James", sport: "Basketball", rookieYear: 2003, college: "None", proTeam: "Los Angeles Lakers", jerseyNumber: 23, allStarAppearances: 19 },
    { name: "Tom Brady", sport: "Football", rookieYear: 2000, college: "Michigan", proTeam: "Tampa Bay Buccaneers", jerseyNumber: 12, allStarAppearances: 15 },
    // Add more athletes...
];

let targetAthlete;
let guessCount = 0;

function startNewGame() {
    targetAthlete = athletes[Math.floor(Math.random() * athletes.length)];
    guessCount = 0;
    document.getElementById('guessCount').textContent = `Guess 1 of 10`;
    document.getElementById('guessResults').innerHTML = '';
    document.getElementById('gameOver').style.display = 'none';
}

function checkGuess() {
    const guessInput = document.getElementById('guessInput');
    const guessedAthlete = athletes.find(a => a.name.toLowerCase() === guessInput.value.toLowerCase());
    
    if (!guessedAthlete) {
        alert('Athlete not found. Try again.');
        return;
    }

    guessCount++;
    document.getElementById('guessCount').textContent = `Guess ${guessCount} of 10`;

    const result = compareAthletes(guessedAthlete, targetAthlete);
    displayResult(result);

    if (guessedAthlete.name === targetAthlete.name || guessCount === 10) {
        endGame(guessedAthlete.name === targetAthlete.name);
    }

    guessInput.value = '';
}

function compareAthletes(guessed, target) {
    const result = {};
    for (const key in guessed) {
        if (guessed[key] === target[key]) {
            result[key] = 'green';
        } else if (['rookieYear', 'jerseyNumber'].includes(key) && Math.abs(guessed[key] - target[key]) <= 5) {
            result[key] = 'yellow';
        } else {
            result[key] = 'grey';
        }
    }
    return result;
}

function displayResult(result) {
    const resultDiv = document.createElement('div');
    for (const [key, value] of Object.entries(result)) {
        const attributeDiv = document.createElement('div');
        attributeDiv.className = `attribute ${value}`;
        attributeDiv.textContent = `${key}: ${athletes[0][key]}`;
        resultDiv.appendChild(attributeDiv);
    }
    document.getElementById('guessResults').appendChild(resultDiv);
}

function endGame(isWin) {
    const gameOverDiv = document.getElementById('gameOver');
    const gameOverMessage = document.getElementById('gameOverMessage');
    gameOverDiv.style.display = 'block';
    if (isWin) {
        gameOverMessage.textContent = 'Congratulations! You guessed correctly!';
    } else {
        gameOverMessage.textContent = `Game Over. The correct answer was ${targetAthlete.name}.`;
    }
}

document.getElementById('guessButton').addEventListener('click', checkGuess);
document.getElementById('newGameButton').addEventListener('click', startNewGame);

startNewGame();
