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

var cptMoves = 0;

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
    if(check.isBlackInCheck==true) {
        var blackCheckmate = isCheckmate("black")
        if(blackCheckmate) {
            displayPopUpEndGame("white");
        }
    }
    if(check.isWhiteInCheck==true) {
        var whiteCheckmate = isCheckmate("white")
        if(whiteCheckmate) {
            displayPopUpEndGame("black");
        }
    }
    const algebraicNotation = findAlgebraicNotation(pieceToMove, startSquare_id, square_id, isTake, isEnPassant, isPawnTransformation, notation_isCastle);
    if(algebraicNotation) {
        displayAlgebraicNotation(playTurn, algebraicNotation)
    }
}

function displayAlgebraicNotation(playTurn, algebraicNotation) {
    if (playTurn === "white") {
        cptMoves += 1;

        var row = document.createElement("div");
        row.classList.add("row-" + cptMoves);
        row.classList.add("row");
        if (cptMoves % 2 === 0) {
            row.classList.add("even");
        }

        var rowID = document.createElement("div");
        rowID.classList.add("rowID");
        rowID.innerHTML = cptMoves + ".";

        var whiteMove = document.createElement("div");
        whiteMove.classList.add("whiteMove");
        whiteMove.innerHTML = algebraicNotation;

        var blackMove = document.createElement("div");
        blackMove.classList.add("blackMove");

        row.appendChild(rowID);
        row.appendChild(whiteMove);
        row.appendChild(blackMove);
        moveLog.appendChild(row);
    } 
    else if (playTurn === "black") {
        var lastRow = moveLog.lastElementChild;
        if (lastRow) {
            var blackMove = lastRow.querySelector(".blackMove");
            if (blackMove) {
                blackMove.innerHTML = algebraicNotation;
            }
        }
    }
    scrollToBottom();
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
        if(someoneIsCheckmate == true) {
            checkNotation = "#";
        }
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

function scrollToBottom() {
    moveLog.scrollTop = moveLog.scrollHeight;
}

function displayPopUpEndGame(winner) {
    alert(winner + " won !!!");
}