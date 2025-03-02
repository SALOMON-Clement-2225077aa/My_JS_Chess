// ---
// Init variables
// ---
const gameBoard = document.querySelector('#gameBoard');
const coordinatesBox = document.querySelector('#coordinatesBox');
var playTurn = "white";
var lastSquareHiglighted = null;
var lastMovePlayed = [null, null];
var listSquareSelected = [];
var listLegalMovesDisplayed = [];

const startBoard = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn,   pawn,   pawn,  pawn, pawn,   pawn,   pawn,
    "",   "",     "",     "",    "" ,  "",     "",     "",
    "",   "",     "",     "",    "" ,  "",     "",     "",
    "",   "",     "",     "",    "" ,  "",     "",     "",
    "",   "",     "",     "",    "" ,  "",     "",     "",
    pawn, pawn,   pawn,   pawn,  pawn, pawn,   pawn,   pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]


// ---
//  Create the Game Board
// ---
function createBoard() {
    var square_id = 0;
    var isOddLine = true;
    startBoard.forEach(piece => {
        const square = document.createElement('div');
        square.classList.add("square");
        square.innerHTML = piece;
        if (square_id<16) {
            square.firstChild.classList.add('black');
            square.firstChild.firstChild.classList.add('player-black');
        }
        else if (square_id>=48) {
            square.firstChild.classList.add('white');
            square.firstChild.firstChild.classList.add('player-white');
        }
        square.setAttribute('square_id', square_id);
        addSquareColor(square, isOddLine, square_id);
        gameBoard.append(square);
        ++square_id;
        if(square_id%8==0) {
            isOddLine = !isOddLine;
        }
    });
}

function addSquareColor(square, isOddLine, square_id) {
    if(isOddLine) {
        if(square_id%2==0) {
            square.classList.add("light-square");
        }
        else {
            square.classList.add("dark-square");
        }
    }
    else {
        if(square_id%2==0) {
            square.classList.add("dark-square");
        }
        else {
            square.classList.add("light-square");
        }
    }
}


// ---
//  Create the coordinates around the board
// ---
function createCoordinates() {
    const abscissaCoordinates = document.getElementById('abscissa');
    const ordinateCoordinates = document.getElementById('ordinate');

    for (let i = 0; i < 8; i++) {
        const numLabel = document.createElement('p');
        numLabel.textContent = 8 - i;
        numLabel.classList.add("coordinate");
        ordinateCoordinates.appendChild(numLabel);
    }

    for (let i = 0; i < 8; i++) {
        const letterLabel = document.createElement('p');
        letterLabel.textContent = String.fromCharCode(97 + i);
        letterLabel.classList.add("coordinate");
        abscissaCoordinates.appendChild(letterLabel);
    }
}


// ---
//  Create the event listeners on the squares
// ---
function createListeners() {
    const allSquares = document.querySelectorAll("#gameBoard .square");
    allSquares.forEach(square => {
        square.addEventListener("click",leftClickOnSquare); // left click
        square.addEventListener("contextmenu",selectSquare); // right click
        square.addEventListener("dragstart",dragPiece);
    });
}

function leftClickOnSquare(e) {
    clickedSquare = e.currentTarget;
    pieceInside = clickedSquare.firstChild;
    if(clickedSquare.classList.contains("possibleMove") || clickedSquare.classList.contains("possibleTake")) {
        movePiece(lastSquareHiglighted,clickedSquare,pieceInside);
    }
    highlightSquare(clickedSquare);
    removeSelectedSquares();
    hidePreviousLegalMoves();
    if( pieceInside != null && ((pieceInside.classList.contains("black") && playTurn == "black") || (pieceInside.classList.contains("white") && playTurn == "white")) ) {
        showLegalMoves(gameBoard,clickedSquare);
    }
}

function dragPiece(e) {
    // TODO
    console.log(e.target);
}


// ---
// Function to move a selected piece to a legal position
// ---
function movePiece(lastSquareHiglighted, clickedSquare, pieceInside) {
    const pieceToMove = lastSquareHiglighted.firstChild;
    lastSquareHiglighted.removeChild(pieceToMove);
    const square_id = parseInt(clickedSquare.getAttribute("square_id"), 10);
    if(pieceInside == null) {
        clickedSquare.appendChild(pieceToMove);
    }
    else {
        clickedSquare.removeChild(clickedSquare.firstChild);
        clickedSquare.appendChild(pieceToMove);
    }
    if ((pieceToMove.id=="pawn")&&(((pieceToMove.classList.contains("black"))&&(square_id>=56))||(pieceToMove.classList.contains("white"))&&(square_id<8))) {
        pawnTransformation(clickedSquare, pieceToMove);
    }
    hilightPlayedMove(lastSquareHiglighted, clickedSquare);
    if(playTurn=="white") {playTurn = "black";}
    else if(playTurn=="black") {playTurn = "white";}
}


// ---
//  Call the functions to create the board
// ---
createBoard();
createCoordinates();
createListeners();