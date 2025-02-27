// ---
// Init variables
// ---
const gameBoard = document.querySelector('#gameBoard');
const coordinatesBox = document.querySelector('#coordinatesBox');

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
            square.classList.add("dark-square");
        }
        else {
            square.classList.add("light-square");
        }
    }
    else {
        if(square_id%2==0) {
            square.classList.add("light-square");
        }
        else {
            square.classList.add("dark-square");
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
//  Create the square listeners
// ---
function createListeners() {
    const allSquares = document.querySelectorAll("#gameBoard .square");
    allSquares.forEach(square => {
        square.addEventListener("click",showPossibleMoves);
        square.addEventListener("dragstart",dragPiece);
    });
}

function showPossibleMoves(e) {
    clickedSquare = e.currentTarget;
    pieceInside = clickedSquare.firstChild;
    console.log(clickedSquare);
    console.log(pieceInside);
}

function dragPiece(e) {
    // TODO
    console.log(e.target);
}


// ---
//  Call the functions
// ---
createBoard();
createCoordinates();
createListeners();