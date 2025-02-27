// ---
// Init variables
// ---

const gameBoard = document.querySelector('#gameBoard');
const coordinatesBox = document.querySelector('#coordinatesBox');

const startBoard = [
    "B_rook", "B_Knight", "B_Bishop", "B_Queen", "B_King", "B_Bishop", "B_Knight", "B_rook",
    "B_pawn", "B_pawn"  , "B_pawn"  , "B_pawn" , "B_pawn", "B_pawn"  , "B_pawn"  , "B_pawn",
    ""      ,  ""       ,  ""       ,  ""      ,  ""     ,  ""       ,  ""       ,  ""     ,
    ""      ,  ""       ,  ""       ,  ""      ,  ""     ,  ""       ,  ""       ,  ""     ,
    ""      ,  ""       ,  ""       ,  ""      ,  ""     ,  ""       ,  ""       ,  ""     ,
    ""      ,  ""       ,  ""       ,  ""      ,  ""     ,  ""       ,  ""       ,  ""     ,
    "W_pawn", "W_pawn"  , "W_pawn"  , "W_pawn" , "W_pawn", "W_pawn"  , "W_pawn"  , "W_pawn",
    "W_rook", "W_Knight", "W_Bishop", "W_Queen", "W_King", "W_Bishop", "W_Knight", "W_rook",
]

// ---
//  Create Game Board
// ---

function createBoard() {
    var square_id = 0;
    var isOddLine = true;
    startBoard.forEach(tile => {
        const square = document.createElement('div');
        square.classList.add("square");
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
            square.classList.add("dark-square")
        }
        else {
            square.classList.add("light-square")
        }
    }
    else {
        if(square_id%2==0) {
            square.classList.add("light-square")
        }
        else {
            square.classList.add("dark-square")
        }
    }
}

createBoard();

function createCoordinates() {
    const abscissaCoordinates = document.getElementById('abscissa');
    const ordinateCoordinates = document.getElementById('ordinate');

    for (let i = 0; i < 8; i++) {
        const numLabel = document.createElement('p');
        numLabel.textContent = 8 - i;
        numLabel.classList.add("coordinate")
        ordinateCoordinates.appendChild(numLabel);
    }

    for (let i = 0; i < 8; i++) {
        const letterLabel = document.createElement('p');
        letterLabel.textContent = String.fromCharCode(97 + i);
        letterLabel.classList.add("coordinate")
        abscissaCoordinates.appendChild(letterLabel);
    }
}

createCoordinates();