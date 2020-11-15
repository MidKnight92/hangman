/*----- constant(s) -----*/
const WORDS = [
    'ARRAY', 'FUNCTION', 'BINARY', 'VARIABLE', 'BOOLEAN',
    'REACT', 'COMPUTER SCIENCE', 'ANGULAR', 'TERMINAL', 'GIT',
    'GITHUB', 'AJAX', 'OBJECT', 'MOCHA', 'CHAI'
]



/*----- app's state (variables) -----*/
let secretWord;
let guessWord;
let gameStatus; // null = in progress; 👎 = lose; 👍 = win;
let wrongLetters;



/*----- cached element references -----*/
const guessEl = document.getElementById('guess');

const replayBtn = document.getElementById('replay');


/*----- event listener(s) -----*/
document.querySelector('section').addEventListener('click',handleLetterClick);

// Call init to restart game
document.getElementById('replay').addEventListener('click', init);



/*----- function(s) -----*/

// Respond to user interaction, update state and call render
function handleLetterClick(e){
    // Get letter
    const letter = e.target.textContent;

    // ERROR HANDLING - Exit function if the following conditions exist 
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
        // Upate string
        guessWord = updateGuess;
    } else {
        wrongLetters.push(letter);
    }
    render();
}

// Render transfers all state to the DOM
function render(){
    // Set guess(El)ement content to guessWord
    guessEl.textContent = guessWord;
    replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden'; 
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



/*----- invoke function(s) -----*/
init();