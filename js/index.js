/*----- constant(s) -----*/

const WORDS = [
    'ARRAY', 'FUNCTION', 'BINARY', 'VARIABLE', 'BOOLEAN',
    'REACT', 'COMPUTER SCIENCE', 'ANGULAR', 'TERMINAL', 'GIT',
    'GITHUB', 'AJAX', 'OBJECT', 'MOCHA', 'CHAI'
];

const PANEL_WIDTH = 15;
const INCORRECT_GUESS_LIMIT = 6;

///////////////////////////////////////

/*----- app's state (variables) -----*/

let secretWord;
let guessWord;
let gameStatus; // null = in progress; 👎 = lose; 👍 = win;
let wrongLetters;

//////////////////////////////////////////

/*----- cached element references -----*/

const guessEl = document.getElementById('guess');

const replayBtn = document.getElementById('replay');

const gallowsEl = document.getElementById('gallows');

const letterBtns = document.querySelectorAll('section > button');

const msgEl = document.getElementById('msg');

//////////////////////////////////

/*----- event listener(s) -----*/

document.querySelector('section').addEventListener('click',handleLetterClick);

// Call init to restart game
document.getElementById('replay').addEventListener('click', init);

////////////////////////////

/*----- function(s) -----*/

function getGameSatus(){
    if (secretWord === guessWord) return '👍';
    if (guessWord !== secretWord && wrongLetters.length >= INCORRECT_GUESS_LIMIT) return'👎';
    return null;    
}

function renderMessage(){
    let remainingGuesses = INCORRECT_GUESS_LIMIT - wrongLetters.length;
    if (wrongLetters.length === INCORRECT_GUESS_LIMIT){
        msgEl.textContent = 'You Lose!';
    } else if (guessWord === secretWord ){
        msgEl.textContent = 'You Won!';
    }  else if (wrongLetters.length >= 4 ){
        msgEl.textContent = `Be Careful! Chances Left: ${remainingGuesses}`;
    }  else if (wrongLetters.length >= 2 ){
        msgEl.textContent = `You can do this! Stay Focused! Chances Left: ${remainingGuesses}`;
    } else {
        msgEl.textContent = 'Good Luck!';
    }
}

// Respond to user interaction, update state and call render
function handleLetterClick(e){
    // Get letter
    const letter = e.target.textContent;

    // ERROR HANDLING - Exit function if one of the following conditions exist 
        // Check user clicked on a single letter not any space in between letters
        // Check if gameStatus === true (player either won or lose)
    if (e.target.tagName !== 'BUTTON' || gameStatus){
        return;
    }
    let updateGuess = '';
    // Check if letter is in secret word else push letter into wrongLetters array
    if (secretWord.includes(letter)) {
        for (let i = 0; i < secretWord.length; i++){
            updateGuess += secretWord.charAt(i) === letter ? letter : guessWord.charAt(i);
        }
        // Upate guessWord string
        guessWord = updateGuess;
    } else {
        wrongLetters.push(letter);
    }
    gameStatus = getGameSatus();
    render();
}

// Render transfers all state to the DOM
function render(){
    // Set guess(El)ement content to guessWord
    guessEl.textContent = guessWord;
    replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden'; 
    // Change img position with each wrong guess
    gallowsEl.style.backgroundPositionX = `-${wrongLetters.length * PANEL_WIDTH}vmin`;
    renderButtons();
    renderMessage();
}

function renderButtons(){
    letterBtns.forEach((btn) => {
        const letter = btn.textContent;
        btn.disabled = guessWord.includes(letter) || wrongLetters.includes(letter);
        if (guessWord.includes(letter)){
            btn.className = 'valid-letter';
        } else if (wrongLetters.includes(letter)){
            btn.className = 'invalid-letter';
        } else {
            btn.className = '';
        }
    });
}

function init(){
    const randomIdx = Math.floor(Math.random() * WORDS.length);
    secretWord = WORDS[randomIdx];
    guessWord = '';
    // replace guessWord with underscores for char in secretWord that contain letters
    guessWord = secretWord.replace(/[A-Z]/g, '_');
    gameStatus = null;
    wrongLetters = [];
    render();
}

//////////////////////////////////

/*----- invoke function(s) -----*/

init();

/////