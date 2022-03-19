// We want our code to start when the HTML document is fully loaded
window.addEventListener('load', initializeApp);

// our globals (globals are okay in a small application like this)
let gameBoard = new Array(9);
let turn = 0; // Keeps track if X or O player's turn
let winner = false;

// CREATE PLAYER function expression to assign it directly to an object
// no need for a "class" with constructor, global object would not work
// because of reference type
const player = function (name) {
    return {name};
};

// create two players
let playerOne = player("");
let playerTwo = player("");

// INITIALIZE APP
function initializeApp() {
    // focus our first inputField
    document.querySelector('.inputField').focus();

    // get the reference to our player form (form for both of the input fields)
    const addPlayerForm = document.getElementById('formPlayer');
    // link submit button with "start game" to the function "addPlayers" when clicked"
    addPlayerForm.addEventListener('submit', addPlayers);
}

// Add PLAYERS
function addPlayers(event) {
    // necessary to prevent submit button refreshing the page
    event.preventDefault();

    // check if one of the players has no name
    if (this.player1.value === '' || this.player2.value === '') {
        alert('You Must Enter a Name for Each Field');
        // quitting out of the function without further actions
        return;
    }

    // get the form container for both of the players
    const playerFormContainer = document.querySelector('.playerInputContainer');
    // add style/class to hide the container and show a blank screen
    playerFormContainer.classList.add('hiddenContainer');

    // assign the given names in the UI to the two player objects
    playerOne.name = this.player1.value;
    playerTwo.name = this.player2.value;

    // Debug purpose (DP): Verifying input is assigned correctly
    console.log({playerOne, playerTwo})

    // this is your starting point for round 2 and also the entry point
    // for the app to init & show the game board
    initBoard();
}

// Build Board
function initBoard() {

}
