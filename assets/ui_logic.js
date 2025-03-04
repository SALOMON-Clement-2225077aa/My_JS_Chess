// ---
// Find html elements
// ---
const User_Interface = document.getElementById("UI");

const ui_top = document.getElementById("ui-top");
const ui_mid = document.getElementById("ui-mid");
const ui_bot = document.getElementById("ui-bot");

const moveLog = document.getElementById("moveWindow");
const divButtons = document.getElementById("buttonWindow");

const buttonSwitchGameMode = document.getElementById("switchGameMode");
const buttonRotateBoard = document.getElementById("rotateBoard");


// ---
// functions
// ---
function rotateBoard() {
    if (gameBoard.style.flexDirection === "column-reverse") {
        gameBoard.style.flexDirection = "";
    } else {
        gameBoard.style.flexDirection = "column-reverse";
    }
}
buttonRotateBoard.addEventListener("click", rotateBoard);


function update_ui(pieceToMove, startSquare_id, square_id, isTake, isEnPassant, isPawnTransformation, notation_isCastle) {

    const algebraicNotation = findAlgebraicNotation(pieceToMove, startSquare_id, square_id, isTake, isEnPassant, isPawnTransformation, notation_isCastle);
    if(algebraicNotation) {
        console.log(playTurn,algebraicNotation);
    }

}

function findAlgebraicNotation(pieceToMove, startSquare_id, square_id, isTake, isEnPassant, isPawnTransformation, notation_isCastle) {
    const columnLabels = ["a","b","c","d","e","f","g","h"]
    const pieceNameToAlgebraicNotation = { "pawn": "",
        "rook":"R", "knight":"N", "bishop":"B", "queen":"Q", "king":"K"
    }
    var startPosX = Math.abs(Math.floor(startSquare_id/8)-8);
    var startPosY = columnLabels[startSquare_id%8];
    var posX = Math.abs(Math.floor(square_id/8)-8);
    var posY = columnLabels[square_id%8];
    var pieceLetter = pieceNameToAlgebraicNotation[pieceToMove.id]
    var checkNotation = "";
    if(check.isBlackInCheck==true||check.isWhiteInCheck==true) { 
        var checkNotation = "+";
     }

    var algebraicNotation = pieceLetter + isTake + posY + posX + checkNotation;
    // pawn specific
    if(pieceLetter=="") {
        if(isTake=="x") {
            algebraicNotation = startPosY + isTake + posY + posX + checkNotation;
        }
        if(isEnPassant==" e.p.") {
            algebraicNotation = startPosY + "x" + posY + posX + checkNotation + isEnPassant;
        }
    }
    lastNotation = algebraicNotation;
    // castle
    if(notation_isCastle != "") {
        return notation_isCastle + checkNotation;
    }
    if(!isPawnTransformation) {
        return algebraicNotation;
    }
    
    return null;

}