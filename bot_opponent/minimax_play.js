function minimax_makeMove() {
    legalMovesForBot = getBotMoves();
    console.log(legalMovesForBot);
    minimax_playRandomLegalMove(legalMovesForBot);
    playTurn = "white";
}

function getBotMoves() {
    const allSquares = gameBoard.childNodes;
    var legalMovesForBot = [];
    allSquares.forEach(square => {
        const square_id = parseInt(square.getAttribute("square_id"), 10);
        const piece = getContentOfSquare(gameBoard, square_id);
        if(piece != null && piece.team === "black") {
            const pieceLegalMoves = getPieceLegalMoves(gameBoard, square_id, true);
            if(pieceLegalMoves.length > 0) {
                legalMovesForBot.push({
                    key:   square_id,
                    value: pieceLegalMoves
                });
            }
        }
    });
    return legalMovesForBot;
}

function minimax_playRandomLegalMove(legalMovesForBot) {
    const randomIndex = Math.floor(Math.random() * legalMovesForBot.length);
    const randomItem = legalMovesForBot[randomIndex];

    const randomValueIndex = Math.floor(Math.random() * randomItem.value.length);
    const randomValue = randomItem.value[randomValueIndex];

    bot_movePiece(randomItem.key, randomValue);
}



function bot_movePiece(startSquare_id, endSquare_id) {
    const startSquare = gameBoard.querySelector(`[square_id="${startSquare_id}"]`);
    const endSquare = gameBoard.querySelector(`[square_id="${endSquare_id}"]`);

    const pieceToEat = endSquare.firstChild;
    pieceToMove = startSquare.firstChild;
    startSquare.removeChild(pieceToMove);

    if(pieceToEat == null) {
        endSquare.appendChild(pieceToMove);
    }
    else {
        endSquare.removeChild(endSquare.firstChild);
        endSquare.appendChild(pieceToMove);
    }
}