//VARIABLES =====================================

// Array of all letters in the alphabet
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Array for possible words to guess
var puzzleWords = ["cardinals", "catcher", "pitcher", "incompletion", "lateral", "downtown", "mizzou", "dugout", "sabermetrics", "icing", "volley",
    "hurdles", "badminton", "wicket", "equestrian", "freestyle", "javelin", "knuckleball", "goalkeeper", "recruiting",
    "nascar", "offsides", "swish", "traveling", "softball"]

// Array for letters guessed so far, which is blank at the start of the game
var lettersGuessed = [];

// Variable that contains Wins
var wins = 0;

// Variable that contains Guesses Left
var guessesLeft;

// Variable that contains random puzzle selected
var currentPuzzle;

// Array that contains the individual letters of the current puzzle
var puzzleLetters = [];

// Variable that contains letter chosen by user
var userLetter;

// Variables that hold references to places in the HTML
var instructionsText = document.getElementById("instructions-text");
var winsText = document.getElementById("wins-text");
var puzzleText = document.getElementById("puzzle-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var lettersGuessedText = document.getElementById("lettersguessed-text");

// GLOBAL FUNCTION================================================

function startGame() {
    // Select current puzzle from array at random
    currentPuzzle = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
    // Convert currentPuzzle to an array of a string of letters
    puzzleLetters = currentPuzzle.split('');
    console.log(`Array of letters in the puzzle: ${puzzleLetters}`);guessesLeft = 7;
   
    // displays guesses left on screen
    guessesLeft = 7;
    guessesLeftText.textContent = guessesLeft;
    
    // empties lettersGuessed array, displays on screen
    lettersGuessed = [];
    lettersGuessedText.textContent = lettersGuessed;
    
    
    instructionsText.textContent = "Press a key to begin!";
    console.log("Game started");
    console.log(`Current puzzle selected: ${currentPuzzle}.`);

}

// MAIN PROCESS===============================================

// Function to start the game
startGame();

// Function that begins when a key is pressed
document.onkeyup = function (event) {

    // Store user choice as a variable, make it lowercase
    var userLetter = event.key.toLowerCase();

    // Verifies that user's choice is a letter and has not been guessed yet
    // - won't run if it's not
    if ((alphabet.includes(userLetter)) && (!lettersGuessed.includes(userLetter))) {

        // Check to see if letter is in the puzzle
        // If letter is not in the puzzle
        if (!puzzleLetters.includes(userLetter)) {
            // Reduce guesses left by 1
            guessesLeft--;
            guessesLeftText.textContent = guessesLeft;
            // Add letter guessed to array of letters guessed so far
            lettersGuessed.push(userLetter);
            lettersGuessedText.textContent = lettersGuessed;

            console.log(`Letters guessed: ${lettersGuessed}`);
            console.log(`Guesses remaining: ${guessesLeft}`);

            // Check if guesses remain to continue
            if (guessesLeft === 0) {
                // Will want to reveal the answer in the blanks - DON'T KNOW HOW YET
                alert('Sorry, you lost! Try again.');
                startGame();
            }
        }

        //   If letter is in the puzzle, 
        else {

            // Fill blank on screen with the letter - HAVEN'T FIGURED THIS OUT YET

            // Add letter to lettersGuessed array
            lettersGuessed.push(userLetter);
            lettersGuessedText.textContent = lettersGuessed;

            console.log(`Letters guessed: ${lettersGuessed}`);

            // Remove letter guessed from puzzleLetters array
            for (let i = 0; i < puzzleLetters.length; i++) {
                if (puzzleLetters[i] === userLetter) {
                    puzzleLetters.splice(i, 1);
                    console.log(`Letters remaining to guess in puzzle: ${puzzleLetters}`);
                }

            // Check if puzzle was solved or if more guesses need to be made
            // If puzzle solved:
            if (puzzleLetters.length === 0) {
                wins ++;
                winsText.textContent = wins;
                alert('You got it!');
                startGame();
            }


            }
        }
    }
    // Check to see if any more letters remain to be guessed

}
    















