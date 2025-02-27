// Display the legals moves on the gameBoard
function showLegalMoves(gameBoard, clickedSquare) {
    var square_id = parseInt(clickedSquare.getAttribute("square_id"), 10);
    var listLegalMoves = getPieceLegalMoves(gameBoard, square_id);

    console.log("possible moves:",listLegalMoves);
    // TODO -> display the legals moves on the gameBoard
}

// Input  --> gameBoard & squareId
// Output --> Info on the piece inside (either "null" or "{ name, team }")
function getContentOfSquare(gameBoard, square_id) {
    const square = gameBoard.querySelector(`[square_id="${square_id}"]`);
    const piece = square.querySelector(".piece");
    if (piece) {
        const name = piece.id;
        var team;
        if (piece.classList.contains("black")) {
            team = "black";
        }
        else {
            team = "white";
        }
        return { name, team };
    }
    return null;
}

// Input  --> gameBoard & squareId
// Output --> a list of every square the piece inside that can go
function getPieceLegalMoves(gameBoard, square_id) {
    const square = gameBoard.querySelector(`[square_id="${square_id}"]`);
    var pieceDiv = square.firstChild;
    if (pieceDiv == null) {return [];}
    var pieceId = pieceDiv.id;
    var pieceTeam = pieceDiv.className.slice(6);
    var legalMoves = [];
    console.log(pieceTeam,pieceId,":",square_id)

    // -----
    // PAWNS :
    if (pieceId == "pawn") {
        // ---
        // for white :
        if(pieceTeam == "white") {
            // one square ahead
            if(getContentOfSquare(gameBoard, square_id-8)==null) {
                legalMoves.push(square_id-8);
            }
            // two square ahead
            if(square_id>=48 && square_id<=55) {
                if(getContentOfSquare(gameBoard, square_id-8)==null && getContentOfSquare(gameBoard, square_id-16)==null) {
                    legalMoves.push(square_id-16);
                }
            }
            // eating left
            if(square_id%8 != 0) {
                if(getContentOfSquare(gameBoard, square_id-9) && getContentOfSquare(gameBoard, square_id-9).team == "black") {
                    legalMoves.push(square_id-9);
                }
            }
            // eating right
            if(square_id%8 != 7) {
                if(getContentOfSquare(gameBoard, square_id-7) && getContentOfSquare(gameBoard, square_id-7).team == "black") {
                    legalMoves.push(square_id-7);
                }
            }
            // TODO : en passant
            if(false) {

            }
            // Caution : if the pawn is on the last row it transforms
            // Caution : the pawn cannot move if it puts the king in danger
        }
        // ---
        // for black :
        if(pieceTeam == "black") {
            // one square ahead
            if(getContentOfSquare(gameBoard, square_id+8)==null) {
                legalMoves.push(square_id+8);
            }
            // two square ahead
            if(square_id>=8 && square_id<=15) {
                if(getContentOfSquare(gameBoard, square_id+8)==null && getContentOfSquare(gameBoard, square_id+16)==null) {
                    legalMoves.push(square_id+16);
                }
            }
            // eating left
            if(square_id%8 != 0) {
                if(getContentOfSquare(gameBoard, square_id+9) && getContentOfSquare(gameBoard, square_id+9).team == "white") {
                    legalMoves.push(square_id+9);
                }
            }
            // eating right
            if(square_id%8 != 7) {
                if(getContentOfSquare(gameBoard, square_id+7) && getContentOfSquare(gameBoard, square_id+7).team == "white") {
                    legalMoves.push(square_id+7);
                }
            }
            // TODO : en passant
            if(false) {

            }
            // Caution : if the pawn is on the last row it transforms
            // Caution : the pawn cannot move if it puts the king in danger
        }
    }

    // -----
    // ROOK :
    else if (pieceId == "rook") {
        // move left
        var numColumn = square_id%8;
        var tempPosition = square_id;
        while (numColumn-1 >= 0) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition-1);
            if(squareContent == null) {
                legalMoves.push(tempPosition-1);
                --numColumn;
                --tempPosition;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition-1);
                }
                break;
            }
        }
        // move right
        var numColumn = square_id%8;
        var tempPosition = square_id;
        while (numColumn+1 <= 7) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition+1);
            if(squareContent == null) {
                legalMoves.push(tempPosition+1);
                ++numColumn;
                ++tempPosition;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition+1);
                }
                break;
            }
        }
        // move up
        var numRow = Math.floor(square_id/8);
        var tempPosition = square_id;
        while (numRow-1 >= 0) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition-8);
            if(squareContent == null) {
                legalMoves.push(tempPosition-8);
                --numRow;
                tempPosition -= 8;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition-8);
                }
                break;
            }
        }
        // move down
        var numRow = Math.floor(square_id/8);
        var tempPosition = square_id;
        while (numRow+1 <= 7) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition+8);
            if(squareContent == null) {
                legalMoves.push(tempPosition+8);
                ++numRow;
                tempPosition += 8;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition+8);
                }
                break;
            }
        }
    }
    
    // -----
    // KNIGHT :
    else if (pieceId == "knight") {
    }
    
    // -----
    // BISHOP :
    else if (pieceId == "bishop") {
    }
    
    // -----
    // QUEEN :
    else if (pieceId == "queen") {
    }
    
    // -----
    // KING :
    else if (pieceId == "king") {
    }

    return legalMoves;
}