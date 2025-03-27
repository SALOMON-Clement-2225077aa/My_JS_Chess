function minimax_makeMove() {
    legalMovesForBot = getBotMoves();
    var hasBotPlayed = minimax_playRandomLegalMove(legalMovesForBot);
    if(hasBotPlayed) {
        playTurn = "white";
    }
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
    if (legalMovesForBot.length === 0) {
        displayPopUpDraw();
        return false;
    };
    const randomIndex = Math.floor(Math.random() * legalMovesForBot.length);
    const randomItem = legalMovesForBot[randomIndex];

    const randomValueIndex = Math.floor(Math.random() * randomItem.value.length);
    const randomValue = randomItem.value[randomValueIndex];

    bot_movePiece(randomItem.key, randomValue);
    return true;
}



function bot_movePiece(startSquare_id, endSquare_id) {
    var notation_isTake = "";
    var notation_isCastle = "";
    var notation_isEnPassant = "";
    var notation_isPawnTransformation = "";
    var soundEvent = "movePiece";

    const startSquare = gameBoard.querySelector(`[square_id="${startSquare_id}"]`);
    const endSquare = gameBoard.querySelector(`[square_id="${endSquare_id}"]`);

    const pieceToEat = endSquare.firstChild;
    pieceToMove = startSquare.firstChild;
    startSquare.removeChild(pieceToMove);

    if(pieceToEat == null) {
        endSquare.appendChild(pieceToMove);

        // Secial moves
        // --
        // en passant
        if(isEnPassantIdToRemove) {
            if((pieceToMove.classList.contains("black"))&&(isEnPassantIdToRemove==endSquare_id-8) ) {
                const squareToRemove = gameBoard.querySelector(`[square_id="${isEnPassantIdToRemove}"]`);
                squareToRemove.removeChild(squareToRemove.firstChild);
                notation_isEnPassant = " e.p.";
                soundEvent = "takePiece";
            }
            isEnPassantIdToRemove = false;
        }
        // castle
        if(pieceToMove.id=="king") {
            if(pieceToMove.classList.contains("black")) {
                if(startSquare_id==4 && endSquare_id==2) {
                    const square0 = gameBoard.querySelector(`[square_id="${0}"]`);
                    var rookToMove = square0.firstChild;
                    square0.removeChild(rookToMove);
                    const square3 = gameBoard.querySelector(`[square_id="${3}"]`);
                    square3.appendChild(rookToMove);
                    notation_isCastle = "O-O-O";
                    soundEvent = "castle";
                }
                else if(startSquare_id==4 && endSquare_id==6) {
                    const square7 = gameBoard.querySelector(`[square_id="${7}"]`);
                    var rookToMove = square7.firstChild;
                    square7.removeChild(rookToMove);
                    const square5 = gameBoard.querySelector(`[square_id="${5}"]`);
                    square5.appendChild(rookToMove);
                    notation_isCastle = "O-O";
                    soundEvent = "castle";
                }
            }
        }

    }
    else {
        endSquare.removeChild(endSquare.firstChild);
        endSquare.appendChild(pieceToMove);
        notation_isTake = "x";
        soundEvent = "takePiece";
    }

    // Special moves and variables
    if(pieceToMove.id=="king" && pieceToMove.classList.contains("black")) {blackKingHaveMoved = true;}
    if(startSquare_id==0||endSquare_id==0) {blackRook_columnA_HaveMoved = true;}
    if(startSquare_id==7||endSquare_id==7) {blackRook_columnH_HaveMoved = true;}
    if ((pieceToMove.id=="pawn")&&(((pieceToMove.classList.contains("black"))&&(endSquare_id>=56)))) {
        pawnTransformation(clickedSquare, pieceToMove, true);
        notation_isPawnTransformation = true;
    }
    hilightPlayedMove(startSquare, endSquare);
    check = findCheck(gameBoard);
    if(check.isBlackInCheck||check.isWhiteInCheck) {soundEvent = "inCheck";}
    update_ui(pieceToMove,startSquare_id,endSquare_id,notation_isTake,notation_isEnPassant,notation_isPawnTransformation,notation_isCastle);
    playSound(soundEvent);
}