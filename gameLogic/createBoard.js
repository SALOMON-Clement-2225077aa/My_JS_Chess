// ---
// Init variables
// ---
const gameBoard = document.querySelector('#gameBoard');
const coordinatesBox = document.querySelector('#coordinatesBox');
var lastSquareHiglighted = null;
var listSquareSelected = [];

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
    highlightSquare(clickedSquare);
    removeSelectedSquares();
    showLegalMoves(gameBoard,clickedSquare);
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
    console.log(listSquareSelected);
}

function removeSelectedSquares() {
    for (let i = listSquareSelected.length - 1; i >= 0; i--) {
        listSquareSelected[i].classList.remove("selected");
        listSquareSelected.splice(i, 1);
    }
}


// ---
//  Call the functions to create the board
// ---
createBoard();
createCoordinates();
createListeners();