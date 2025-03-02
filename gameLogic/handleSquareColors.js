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

// ---
//  Right click on a square to make it red :
// ---
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
// Functions to display/hide the lasts moves played
// ---
function hilightPlayedMove(lastSquareHiglighted, clickedSquare) {
    highlightSquare(clickedSquare);
    hideLastPlayedMove();
    lastSquareHiglighted.classList.add("lastMove");
    clickedSquare.classList.add("lastMove");
    lastMovePlayed = [lastSquareHiglighted, clickedSquare];
}

function hideLastPlayedMove() {
    if(lastMovePlayed[0] != null) {
        lastMovePlayed[0].classList.remove("lastMove");
        lastMovePlayed[1].classList.remove("lastMove");
    }
}