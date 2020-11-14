/*----- constants -----*/
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
document.querySelector('section').addEventListener('click',handleLetterClick);

// Call init to restart game
document.getElementById('replay').addEventListener('click',init());

/*----- event listeners -----*/
function handleLetterClick(e){
    const letter = e.target.textContent;
    const char = secretWord.includes(letter) ? letter : '_' ;
    console.log(char);
}

/*----- functions -----*/
function render(){

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

init();