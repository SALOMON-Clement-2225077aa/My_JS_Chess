// ---
// Find html elements
// ---
const User_Interface = document.getElementById("UI");

const popup = document.querySelector('#popup-endgame');
const ui_top = document.getElementById("ui-top");
const ui_mid = document.getElementById("ui-mid");
const ui_bot = document.getElementById("ui-bot");

const moveLog = document.getElementById("moveWindow");
const divButtons = document.getElementById("buttonWindow");

const buttonSwitchGameMode = document.getElementById("switchGameMode");
const buttonRotateBoard = document.getElementById("rotateBoard");

const buttonRematch = document.getElementById("rematch");
const buttonQuit = document.getElementById("quit");
const buttonReset = document.getElementById("reset");
const buttonGameMode = document.getElementById("switchGameMode");

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
    else if (playTurn === "black" || playTurn === "minimax") {
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
    const white = document.querySelector('#icon_p1');
    const black = document.querySelector('#icon_p2');
    const topDivWinnerName = document.querySelector('#winnerName');
    if(winner=="black") {
        white.classList.remove("winner");
        black.classList.remove("looser");
        white.classList.add("looser");
        black.classList.add("winner");
        topDivWinnerName.innerHTML = "Black won !";
        let scoreElement = document.getElementById("scoreBlack");
        let currentScore = parseInt(scoreElement.innerText);
        scoreElement.innerText = currentScore + 1;
    }
    else if(winner=="white") {
        white.classList.remove("looser");
        black.classList.remove("winner");
        white.classList.add("winner");
        black.classList.add("looser");
        topDivWinnerName.innerHTML = "White won !";
        let scoreElement = document.getElementById("scoreWhite");
        let currentScore = parseInt(scoreElement.innerText);
        scoreElement.innerText = currentScore + 1;
    }
    popup.style.display = "";
}

function displayPopUpDraw() {
    const popupStyle = window.getComputedStyle(popup);
    if(popupStyle.display=="none") {
        const topDivWinnerName = document.querySelector('#winnerName');
        topDivWinnerName.innerHTML = "it's a Draw !";
        popup.style.display = "";
    }
}

buttonQuit.addEventListener("click", function () {
    popup.style.display = "none";
});
buttonGameMode.addEventListener("click", function() {
    var confirmChange = false;
    if(moveLog.hasChildNodes()) {
        confirmChange = confirm("You're about to change opponent and reset the board?");
    }
    else {
        confirmChange = true;
    }
    if(confirmChange) {
        resetBoard();
        var ui_title = document.getElementById("ui_title");
        if(ui_title.innerText == "Play against Minimax!") {
            ui_title.innerHTML = "Play against your friends!";
            buttonGameMode.innerText = "Play against Minimax!";
            opponent = "friend";
        }
        else if (ui_title.innerText == "Play against your friends!") {
            ui_title.innerHTML = "Play against Minimax!";
            buttonGameMode.innerText = "Play against your friends!";
            opponent = "minimax";
        }
    }
})
buttonReset.addEventListener("click", function() {
    if(confirm("You're about to reset the board?")) {
        resetBoard();
    }
});
buttonRematch.addEventListener("click", resetBoard);

function resetVariables() {
    playTurn = "white";
    check = {"isBlackInCheck":false, "isWhiteInCheck":false};
    someoneIsCheckmate = false;
    lastSquareHiglighted = null;
    lastMovePlayed = [null, null];
    listSquareSelected = [];
    listLegalMovesDisplayed = [];
    // Special Moves
    isEnPassantIdToRemove = false;
    blackKingHaveMoved = false;
    blackRook_columnA_HaveMoved = false;
    blackRook_columnH_HaveMoved = false;
    whiteKingHaveMoved = false;
    whiteRook_columnA_HaveMoved = false;
    whiteRook_columnH_HaveMoved = false;
    lastNotation = "";
}

function resetBoard() {
    resetVariables();
    gameBoard.innerHTML = "";
    createBoard();
    createListeners();
    cptMoves = 0;
    moveLog.innerHTML = "";
    popup.style.display = "none";
}