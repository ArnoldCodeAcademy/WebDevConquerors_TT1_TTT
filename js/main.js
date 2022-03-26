// We want our code to start when the HTML document is fully loaded
window.addEventListener('load', initializeApp);

// our globals (globals are okay in a small application like this)
let gameBoard = new Array(9);
let turn = 0; // Keeps track if X or O player's turn

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

    // reference to replay button element to add an handler in next line
    let replayButton = document.querySelector('.replayButton');
    // adds a new event listener to make the the "clear board" button actionable by
    // resetting the board when clicked
    replayButton.addEventListener('click', resetBoard);
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

    // queries the game board to modify it in the next line
    const boardMain = document.querySelector('.boardMain');
    //removes the style of hiddenContainer from the board to finally display it
    boardMain.classList.remove('hiddenContainer');


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
    // get a reference to the HTML container/wrapper element with the style of "reset"
    let resetContainer = document.querySelector('.reset');
    // enables the visibility of the entire container containing the button "clear board"
    resetContainer.classList.remove('resetHidden');

    // function to handle resizing the window (not needed if you use flexbox or CSS-Grid)
    onResize();
    //add handler (also called listeners) to handle each cell that is clickable
    addCellClickListener();
    // function to interactively change the text above the board
    // to indicate who's turn currently is on
    changeBoardHeaderNames();
}

// directly add a handler to the event of type "resize" -> onResize()
window.addEventListener("resize", onResize);

function onResize() {
    // get a reference to all elements with the style of "boardCell"
    let allCells = document.querySelectorAll('.boardCell');
    // get the offsetWidth of the first cell to properly adjust sizes
    let cellHeight = allCells[0].offsetWidth;

    // looping over each cells applying the correct height
    for (let i = 0; i < allCells.length; i++) {
        //directly apply the height as a property of a css class
        allCells[i].style.height = cellHeight + 'px';
    }
}

// function to add cell click listener/handler
function addCellClickListener() {
    // get a reference to all cells, just like in onResize()-function
    // could also be stored globally
    const cells = document.querySelectorAll('.boardCell');

    // again looping over all cells
    for (let i = 0; i < cells.length; i++) {
        // apply a listener onto each cell with the handler of makeMove()-function
        cells[i].addEventListener('click', makeMove);
    }
}

// function to change the texts over the board indicating which player's turn
function changeBoardHeaderNames() {
    // get a reference (ref) to the player text element
    let currentPlayerText = document.querySelector('.boardPlayerTurn');
    // distinction for player with "X" as symbol
    if (getCurrentPlayer() === 'X') {
        // adjust the innerHTML of the reference from 3 lines above
        // by creating new HTML elements inside
        // you need the backticks ` ` to write html and the ${} syntax to query
        // for the variable content, otherwise it would be just text and not interpreted
        // try it with using " " instead of ` `
        currentPlayerText.innerHTML = `
        Your turn, <span class="name">${playerOne.name}</span>!`
        // or for player with "O" as symbol
    } else {
        // adjust the innerHTML of the reference from 3 lines above
        // by creating new HTML elements inside
        // you need the backticks ` ` to write html and the ${} syntax to query
        // for the variable content, otherwise it would be just text and not interpreted
        // try it with using " " instead of ` `
        currentPlayerText.innerHTML = `
        <span class="name">${playerTwo.name}</span>, now you!
        <div class="winner"></div>
      `
    }
}

// function to traverse the click into a cell to a made move
function makeMove(event) {

    // get the current cell as number that has been clicked
    let currentCell = parseInt(event.currentTarget.firstElementChild.dataset.id);
    // find the correct cell HTML element reference to add a token (X or O),
    // data-id is a custom HTML attribute
    let cellToAddToken = document.querySelector(`[data-id='${currentCell}']`);

    // check if the cell we clicked on is NOT empty
    // it is best practice better to check for falsy case first and simply return instead vice versa
    if (cellToAddToken.innerHTML !== '') {
        return;

    } else { // if the cell is empty
        // if it is player "X"
        if (getCurrentPlayer() === 'X') {
            cellToAddToken.textContent = getCurrentPlayer();
        } else { // if it is player "O"
            cellToAddToken.textContent = getCurrentPlayer();
        }
    }

    // Update turn count so next player can choose
    turn++;

    // Changes the player's turn indication
    changeBoardHeaderNames();
}

// function to return the current player
function getCurrentPlayer() {
    // remainder division
    // 0 % 2 = 0, 1 % 2 = 1
    return turn % 2 === 0 ? 'X' : 'O';
    // ternary operator "?" is like an if else
    // syntax condition ? return when condition true : return when condition false
    // turn % 2 === 0 ends in true when 0 % 2
    // turn % 2 === 0 ends in false when 1 % 2
}

// reset the game board by clearing all entries
function resetBoard() {
    // assigning to the global variable of gameboard a fresh new array
    // call is done via constructor, Array has the fixed length of 9
    gameBoard = new Array(9)

    // get all cells of the board
    let cells = document.querySelectorAll('.mark');
    // when iterating arrays, instead of a for loop you can also use a foreach
    cells.forEach(square => {
        // square is a temp variable made up to represent one element of the array
        square.textContent = ''; // set the content to empty string
    });

    turn = 0;

    // resets the player's turn text to restart also with player "X"
    let currentPlayerText = document.querySelector('.boardPlayerTurn');
    currentPlayerText.innerHTML = `
    <span class="name">${playerOne.name}</span>, you are up!
    <div class="winner"></div>
  `
    // adds new listeners since the array got newly created, all listeners are gone
    addCellClickListener();
}

