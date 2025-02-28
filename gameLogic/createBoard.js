// ---
// Init variables
// ---
const gameBoard = document.querySelector('#gameBoard');
const coordinatesBox = document.querySelector('#coordinatesBox');
var playTurn = "white";
var lastSquareHiglighted = null;
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
        if (square_id>=48) {
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
//  Functions to highlight and select/unselect pieces
// ---
function highlightSquare(clickedSquare) {
    if(clickedSquare.classList.contains("highlighted")) {
        clickedSquare.classList.remove("highlighted");
        lastSquareHiglighted = null;
    }
    else {
        clickedSquare.classList.add("highlighted");
        if(lastSquareHiglighted!=null) {
            lastSquareHiglighted.classList.remove("highlighted");
        }
        lastSquareHiglighted = clickedSquare;
    }
}

function selectSquare(e) {
    e.preventDefault();
    rightClickedSquare = e.currentTarget;
    if (rightClickedSquare.classList.contains("selected")) {
        rightClickedSquare.classList.remove("selected");
        const index = listSquareSelected.indexOf(rightClickedSquare);
        if (index !== -1) {listSquareSelected.splice(index, 1);}
    }
    else {
        rightClickedSquare.classList.add("selected");
        listSquareSelected.push(rightClickedSquare);
    }
}

function removeSelectedSquares() {
    for (let i = listSquareSelected.length - 1; i >= 0; i--) {
        listSquareSelected[i].classList.remove("selected");
        listSquareSelected.splice(i, 1);
    }
}


// ---
// Functions to display/hide the legals moves on the gameBoard
// ---
function showLegalMoves(gameBoard, clickedSquare) {
    var square_id = parseInt(clickedSquare.getAttribute("square_id"), 10);
    var listLegalMoves = getPieceLegalMoves(gameBoard, square_id);
    listLegalMoves.forEach(legalMove => {
        const square = gameBoard.querySelector(`[square_id="${legalMove}"]`);
        if(lastSquareHiglighted != null) {
            if( getContentOfSquare(gameBoard, legalMove) == null) {
                square.classList.add("possibleMove");
                listLegalMovesDisplayed.push(square);
            }
            else {
                square.classList.add("possibleTake");
                listLegalMovesDisplayed.push(square);
            }
        }
    });
}

function hidePreviousLegalMoves() {
    for (let i = listLegalMovesDisplayed.length - 1; i >= 0; i--) {
        listLegalMovesDisplayed[i].classList.remove("possibleMove");
        listLegalMovesDisplayed[i].classList.remove("possibleTake");
        listLegalMovesDisplayed.splice(i, 1);
    }
}


// ---
// Function to move a selected piece to a legal position
// ---
function movePiece(lastSquareHiglighted, clickedSquare, pieceInside) {
    pieceToMove = lastSquareHiglighted.firstChild;
    lastSquareHiglighted.removeChild(pieceToMove);
    if(pieceInside == null) {
        clickedSquare.appendChild(pieceToMove);
    }
    else {
        clickedSquare.removeChild(clickedSquare.firstChild);
        clickedSquare.appendChild(pieceToMove);
    }
    highlightSquare(clickedSquare);
    if(playTurn=="white") {playTurn = "black";}
    else if(playTurn=="black") {playTurn = "white";}
}


// ---
//  Call the functions to create the board
// ---
createBoard();
createCoordinates();
createListeners();