// ---
// Init variables
// ---
const gameBoard = document.querySelector('#gameBoard');
const coordinatesBox = document.querySelector('#coordinatesBox');
var playTurn = "white";
var check = {"isBlackInCheck":false, "isWhiteInCheck":false};
var lastSquareHiglighted = null;
var lastMovePlayed = [null, null];
var listSquareSelected = [];
var listLegalMovesDisplayed = [];
// Special Moves
var isEnPassantIdToRemove = false;
var blackKingHaveMoved = false;
var blackRook_columnA_HaveMoved = false;
var blackRook_columnH_HaveMoved = false;
var whiteKingHaveMoved = false;
var whiteRook_columnA_HaveMoved = false;
var whiteRook_columnH_HaveMoved = false;
var lastNotation = "";

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
    var notation_isTake = "";
    var notation_isCastle = "";
    var notation_isEnPassant = "";
    var notation_isPawnTransformation = "";
    const pieceToMove = lastSquareHiglighted.firstChild;
    lastSquareHiglighted.removeChild(pieceToMove);
    const startSquare_id = parseInt(lastSquareHiglighted.getAttribute("square_id"), 10);
    const square_id = parseInt(clickedSquare.getAttribute("square_id"), 10);
    if(pieceInside == null) {
        clickedSquare.appendChild(pieceToMove);
        // Secial moves
        // --
        // en passant
        if(isEnPassantIdToRemove) {
            if((pieceToMove.classList.contains("white"))&&(isEnPassantIdToRemove==square_id+8) ) {
                const squareToRemove = gameBoard.querySelector(`[square_id="${isEnPassantIdToRemove}"]`);
                squareToRemove.removeChild(squareToRemove.firstChild);
                notation_isEnPassant = " e.p.";
            }
            if((pieceToMove.classList.contains("black"))&&(isEnPassantIdToRemove==square_id-8) ) {
                const squareToRemove = gameBoard.querySelector(`[square_id="${isEnPassantIdToRemove}"]`);
                squareToRemove.removeChild(squareToRemove.firstChild);
                notation_isEnPassant = " e.p.";
            }
            isEnPassantIdToRemove = false;
        }
        // castle
        if(pieceToMove.id=="king") {
            if(pieceToMove.classList.contains("white")) {
                if(startSquare_id==60 && square_id==58) {
                    const square56 = gameBoard.querySelector(`[square_id="${56}"]`);
                    var rookToMove = square56.firstChild;
                    square56.removeChild(rookToMove);
                    const square59 = gameBoard.querySelector(`[square_id="${59}"]`);
                    square59.appendChild(rookToMove);
                    notation_isCastle = "O-O-O";
                }
                else if(startSquare_id==60 && square_id==62) {
                    const square63 = gameBoard.querySelector(`[square_id="${63}"]`);
                    var rookToMove = square63.firstChild;
                    square63.removeChild(rookToMove);
                    const square61 = gameBoard.querySelector(`[square_id="${61}"]`);
                    square61.appendChild(rookToMove);
                    notation_isCastle = "O-O";
                }
            }
            if(pieceToMove.classList.contains("black")) {
                if(startSquare_id==4 && square_id==2) {
                    const square0 = gameBoard.querySelector(`[square_id="${0}"]`);
                    var rookToMove = square0.firstChild;
                    square0.removeChild(rookToMove);
                    const square3 = gameBoard.querySelector(`[square_id="${3}"]`);
                    square3.appendChild(rookToMove);
                    notation_isCastle = "O-O-O";
                }
                else if(startSquare_id==4 && square_id==6) {
                    const square7 = gameBoard.querySelector(`[square_id="${7}"]`);
                    var rookToMove = square7.firstChild;
                    square7.removeChild(rookToMove);
                    const square5 = gameBoard.querySelector(`[square_id="${5}"]`);
                    square5.appendChild(rookToMove);
                    notation_isCastle = "O-O";
                }
            }
        }
    }
    else {
        clickedSquare.removeChild(clickedSquare.firstChild);
        clickedSquare.appendChild(pieceToMove);
        notation_isTake = "x";
    }
    // Special moves and variables
    if(pieceToMove.id=="king" && pieceToMove.classList.contains("black")) {blackKingHaveMoved = true;}
    if(pieceToMove.id=="king" && pieceToMove.classList.contains("white")) {whiteKingHaveMoved = true;}
    if(startSquare_id==0||square_id==0) {blackRook_columnA_HaveMoved = true;}
    if(startSquare_id==7||square_id==7) {blackRook_columnH_HaveMoved = true;}
    if(startSquare_id==56||square_id==56) {whiteRook_columnA_HaveMoved = true;}
    if(startSquare_id==63||square_id==63) {whiteRook_columnH_HaveMoved = true;}
    if ((pieceToMove.id=="pawn")&&(((pieceToMove.classList.contains("black"))&&(square_id>=56))||(pieceToMove.classList.contains("white"))&&(square_id<8))) {
        pawnTransformation(clickedSquare, pieceToMove);
        notation_isPawnTransformation = true;
    }
    hilightPlayedMove(lastSquareHiglighted, clickedSquare);
    check = findCheck(gameBoard);
    update_ui(pieceToMove,startSquare_id,square_id,notation_isTake,notation_isEnPassant,notation_isPawnTransformation,notation_isCastle);
    if(playTurn=="white") {playTurn = "black";}
    else if(playTurn=="black") {playTurn = "white";}
}


// ---
//  Call the functions to create the board
// ---
createBoard();
createCoordinates();
createListeners();