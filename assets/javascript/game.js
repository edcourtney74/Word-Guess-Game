//VARIABLES =====================================

// Array of all letters in the alphabet
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Array for possible words to guess
var puzzleWords = ["cardinals", "catcher", "pitcher", "incompletion", "lateral", "downtown", "stadium", "dugout", "sabermetrics", "icing", "bobsled",
    "hurdles", "badminton", "wicket", "equestrian", "backstroke", "javelin", "slider", "goaltender", "recruiting",
    "nascar", "tailgating", "swish", "traveling", "decathlon"]

// Array for letters guessed wrongly so far, which is blank at the start of the game
var lettersGuessedWrongly = [];

// Array to display letters guessed wrongly so far
var lettersGuessedWronglyDisplay = [];

// Array for letters guessed correctly so far, which is blank at the start of the game
var lettersGuessedCorrectly = [];

// Variable that contains Wins
var wins = 0;

// Variable that contains the number of Guesses Left
var guessesLeft;

// Variable that contains the random puzzle selected
var currentPuzzle;

// Array that is a master that contains the individual letters of the current puzzle - this will not be manipulated
// This is primarily for use to fill in the blanks on the display
var masterPuzzleLetters = [];

// Same array as masterPuzzleLetters above but will be manipulated
var puzzleLetters = [];

// Array that substitutes letters for blanks for display
var blanks = [];

// Array that will hold display letters
var displayLetters = [];

// Variable that contains the displayLetters to show on the screen
var finalDisplayLetters;

// Variable that contains letter chosen by user
var userLetter;

// Array that contains puzzles previous played so they can't be played again until refresh
var removedPuzzles = [];

// Variables that hold references to places in the HTML
var instructionsText = document.getElementById("instructions-text");
var winsText = document.getElementById("wins-text");
var puzzleText = document.getElementById("puzzle-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var lettersGuessedText = document.getElementById("lettersguessed-text");
var previousPuzzleText = document.getElementById("previouspuzzle-text");

// GLOBAL FUNCTION================================================

function startGame() {
    // Select current puzzle from array at random
    currentPuzzle = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
    // Convert currentPuzzle to an array of a string of letters
    puzzleLetters = currentPuzzle.split('');
    // Convert currentPuzzle to an array of a string of letters - master copy to compare guesses to
    masterPuzzleLetters = currentPuzzle.split('');
    // Created same array as puzzleLetters, but to be converted to blanks
    displayLetters = currentPuzzle.split('');

    // Convert display letters into blanks (underscores)
    for (let i = 0; i < displayLetters.length; i++) {
        displayLetters.splice(i, 1, "_");
    }

    // Convert updated word with blanks to a string to display
    finalDisplayLetters = displayLetters.join("");

    // Displays puzzle with blanks on screen
    puzzleText.innerHTML = finalDisplayLetters;

    // displays guesses left on screen
    guessesLeft = 7;
    guessesLeftText.textContent = guessesLeft;

    // empties lettersGuessedWrongly array
    lettersGuessedWrongly = [];

    // empties lettersGuessedCorrectly array
    lettersGuessedCorrectly = [];

    // Displays no letters guessed so far on display
    lettersGuessedText.textContent = "None";

    console.log(puzzleWords);
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
    if ((alphabet.includes(userLetter)) && (!lettersGuessedWrongly.includes(userLetter)) && (!lettersGuessedCorrectly.includes(userLetter))) {

        // Check to see if letter is in the puzzle
        // If letter is not in the puzzle
        if (!puzzleLetters.includes(userLetter)) {
            // Reduce guesses left by 1
            guessesLeft--;
            guessesLeftText.textContent = guessesLeft;
            // Add letter guessed to array of letters guessed wrongly so far
            lettersGuessedWrongly.push(userLetter);

            // Convert letters guessed wrongly to a string to diplay
            lettersGuessedWronglyDisplay = lettersGuessedWrongly.join(" ");

            // Displays incorrect guesses on screen
            lettersGuessedText.textContent = lettersGuessedWronglyDisplay;

            // Check if guesses remain to continue
            if (guessesLeft === 0) {
                // Display modal saying the user lost
                $('#lostModal').modal('show');
                
                // Reveal answer
                previousPuzzleText.innerHTML = `Previous puzzle: ${currentPuzzle}`;

                // Remove this puzzle from word list so it doesn't come up again
                removedPuzzles = puzzleWords.indexOf(currentPuzzle);
                if (removedPuzzles > -1) {
                    puzzleWords.splice(removedPuzzles, 1);
                    console.log(`Number of puzzles remaining: ${puzzleWords.length}`);
                }

                // Check if any new puzzles remain
                if (puzzleWords.length > 0) {
                    // Start a new game
                    startGame();
                } else 
                    // Inform the user that they've played all the puzzles.
                    $('#allPlayedModal').modal('show');
                
                
                }
        }
        //   If letter is in the puzzle, 
        else {
            // For loop to see what position(s) the correct guess is in
            for (i = 0; i < masterPuzzleLetters.length; i++) {

                if (userLetter === masterPuzzleLetters[i]) {

                    // put userLetter in same index position in displayLetters array
                    displayLetters.splice(i, 1, userLetter);
                }
            }

            // Convert updated word with letters/blanks to a string to display
            finalDisplayLetters = displayLetters.join("");

            // Displays puzzle with correct guesses on screen
            puzzleText.innerHTML = finalDisplayLetters;

            // Add letter to lettersGuessed array
            lettersGuessedCorrectly.push(userLetter);

            // Remove letter guessed from puzzleLetters array
            // This lets us know when a puzzle is solved
            for (let i = 0; i < puzzleLetters.length; i++) {
                if (puzzleLetters[i] === userLetter) {
                    puzzleLetters.splice(i, 1);
                }
            }

            // Check if puzzle was solved or if more guesses need to be made
            if (puzzleLetters.length === 0) {
                // If puzzle solved:
                // Display correct answer
                previousPuzzleText.textContent = `Previous puzzle: ${currentPuzzle}`;

                // Show modal saying the user won;
                $('#winnerModal').modal('show');
    
                // Add to wins and display on the screen
                wins++;
                winsText.textContent = wins;

                // Remove this puzzle from word list so it doesn't come up again
                removedPuzzles = puzzleWords.indexOf(currentPuzzle);
                if (removedPuzzles > -1) {
                    puzzleWords.splice(removedPuzzles, 1);
                    console.log(`Number of puzzles remaining: ${puzzleWords.length}`);
                }

                // Check if any new puzzles remain
                if (puzzleWords.length > 0) {
                    // Start a new game
                    startGame();
                } else 
                    // Inform the user that they've played all the puzzles.
                    $('#allPlayedModal').modal('show')
                
            }
        }
    }
}



















