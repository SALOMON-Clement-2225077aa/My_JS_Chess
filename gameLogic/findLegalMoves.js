// Input  --> gameBoard & squareId
// Output --> Info on the piece inside (either "null" or "{ name, team }")
// -------------------------
// | GET CONTENT OF SQUARE |
// -------------------------
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
// -------------------------
// | GET PIECE LEGAL MOVES |
// -------------------------
function getPieceLegalMoves(gameBoard, square_id, realCase = true) {
    const square = gameBoard.querySelector(`[square_id="${square_id}"]`);
    var pieceDiv = square.firstChild;
    if (pieceDiv == null) {return [];}
    var pieceId = pieceDiv.id;
    var pieceTeam = pieceDiv.className.slice(6);
    var legalMoves = [];

    // -----
    // PAWNS :
    // -----
    if (pieceId == "pawn") {
        // ---
        // for white :
        if(pieceTeam == "white") {
            // one square ahead
            if(getContentOfSquare(gameBoard, square_id-8)==null) {
                if(realCase) {
                    var fakeBoard = simulateMove(gameBoard, square_id, square_id-8);
                    var testPosition = findCheck(fakeBoard);
                    if(!testPosition.isWhiteInCheck) {
                        legalMoves.push(square_id-8);
                    }
                }
            }
            // two square ahead
            if(square_id>=48 && square_id<=55) {
                if(getContentOfSquare(gameBoard, square_id-8)==null && getContentOfSquare(gameBoard, square_id-16)==null) {
                    if(realCase) {
                        var fakeBoard = simulateMove(gameBoard, square_id, square_id-16);
                        var testPosition = findCheck(fakeBoard);
                        if(!testPosition.isWhiteInCheck) {
                            legalMoves.push(square_id-16);
                        }
                    }
                }
            }
            // eating left
            if(square_id%8 != 0) {
                if(getContentOfSquare(gameBoard, square_id-9) && getContentOfSquare(gameBoard, square_id-9).team == "black") {
                    if(realCase) {
                        var fakeBoard = simulateMove(gameBoard, square_id, square_id-9);
                        var testPosition = findCheck(fakeBoard);
                        if(!testPosition.isWhiteInCheck) {
                            legalMoves.push(square_id-9);
                        }
                    }
                }
            }
            // eating right
            if(square_id%8 != 7) {
                if(getContentOfSquare(gameBoard, square_id-7) && getContentOfSquare(gameBoard, square_id-7).team == "black") {
                    if(realCase) {
                        var fakeBoard = simulateMove(gameBoard, square_id, square_id-7);
                        var testPosition = findCheck(fakeBoard);
                        if(!testPosition.isWhiteInCheck) {
                            legalMoves.push(square_id-7);
                        }
                    }
                }
            }
            // TODO -> en passant
            if(false) {

            }
            // TODO -> if the pawn is on the last row it transforms
        }
        // ---
        // for black :
        if(pieceTeam == "black") {
            // one square ahead
            if(getContentOfSquare(gameBoard, square_id+8)==null) {
                if(realCase) {
                    var fakeBoard = simulateMove(gameBoard, square_id, square_id+8);
                    var testPosition = findCheck(fakeBoard);
                    if(!testPosition.isBlackInCheck) {
                        legalMoves.push(square_id+8);
                    }
                }
            }
            // two square ahead
            if(square_id>=8 && square_id<=15) {
                if(getContentOfSquare(gameBoard, square_id+8)==null && getContentOfSquare(gameBoard, square_id+16)==null) {
                    if(realCase) {
                        var fakeBoard = simulateMove(gameBoard, square_id, square_id+16);
                        var testPosition = findCheck(fakeBoard);
                        if(!testPosition.isBlackInCheck) {
                            legalMoves.push(square_id+16);
                        }
                    }
                }
            }
            // eating left
            if(square_id%8 != 0) {
                if(getContentOfSquare(gameBoard, square_id+9) && getContentOfSquare(gameBoard, square_id+9).team == "white") {
                    if(realCase) {
                        var fakeBoard = simulateMove(gameBoard, square_id, square_id+9);
                        var testPosition = findCheck(fakeBoard);
                        if(!testPosition.isBlackInCheck) {
                            legalMoves.push(square_id+9);
                        }
                    }
                }
            }
            // eating right
            if(square_id%8 != 7) {
                if(getContentOfSquare(gameBoard, square_id+7) && getContentOfSquare(gameBoard, square_id+7).team == "white") {
                    if(realCase) {
                        var fakeBoard = simulateMove(gameBoard, square_id, square_id+7);
                        var testPosition = findCheck(fakeBoard);
                        if(!testPosition.isBlackInCheck) {
                            legalMoves.push(square_id+7);
                        }
                    }
                }
            }
            // TODO -> en passant
            if(false) {

            }
            // TODO -> if the pawn is on the last row it transforms
        }
    }

    // -----
    // ROOK :
    // -----
    else if (pieceId == "rook") {
        // move left
        var tempNumColumn = square_id%8;
        var tempPosition = square_id;
        while (tempNumColumn-1 >= 0) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition-1);
            if(squareContent == null) {
                legalMoves.push(tempPosition-1);
                --tempNumColumn;
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
        var tempNumColumn = square_id%8;
        var tempPosition = square_id;
        while (tempNumColumn+1 <= 7) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition+1);
            if(squareContent == null) {
                legalMoves.push(tempPosition+1);
                ++tempNumColumn;
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
    // -----
    else if (pieceId == "knight") {
        var numRow = Math.floor(square_id/8);
        var numColumn = square_id%8;
        // UP-UP-LEFT & UP-UP-RIGHT
        if(numRow>=2) {
            // left
            if(numColumn>=1) {
                var squareContent = getContentOfSquare(gameBoard, square_id-17);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id-17);
                }
            }
            // right
            if(numColumn<=6) {
                var squareContent = getContentOfSquare(gameBoard, square_id-15);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id-15);
                }
            }
        }
        // LEFT-LEFT-UP & RIGHT-RIGHT-UP
        if(numRow>=1) {
            // left
            if(numColumn>=2) {
                var squareContent = getContentOfSquare(gameBoard, square_id-10);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id-10);
                }
            }
            // right
            if(numColumn<=5) {
                var squareContent = getContentOfSquare(gameBoard, square_id-6);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id-6);
                }
            }
        }
        // LEFT-LEFT-DOWN & RIGHT-RIGHT-DOWN
        if(numRow<=6) {
            // left
            if(numColumn>=2) {
                var squareContent = getContentOfSquare(gameBoard, square_id+6);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id+6);
                }
            }
            // right
            if(numColumn<=5) {
                var squareContent = getContentOfSquare(gameBoard, square_id+10);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id+10);
                }
            }
        }
        // DOWN-DOWN-LEFT & DOWN-DOWN-RIGHT
        if(numRow<=5) {
            // left
            if(numColumn>=1) {
                var squareContent = getContentOfSquare(gameBoard, square_id+15);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id+15);
                }
            }
            // right
            if(numColumn<=6) {
                var squareContent = getContentOfSquare(gameBoard, square_id+17);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id+17);
                }
            }
        }
    }
    
    // -----
    // BISHOP :
    // -----
    else if (pieceId == "bishop") {
        // move up left
        var tempNumColumn = square_id%8;
        var tempNumRow = Math.floor(square_id/8);
        var tempPosition = square_id;
        while (tempNumColumn-1 >= 0 && tempNumRow-1 >=0) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition-9);
            if(squareContent == null) {
                legalMoves.push(tempPosition-9);
                --tempNumColumn;
                --tempNumRow;
                tempPosition-=9;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition-9);
                }
                break;
            }
        }
        // move up right
        var tempNumColumn = square_id%8;
        var tempNumRow = Math.floor(square_id/8);
        var tempPosition = square_id;
        while (tempNumColumn+1 <= 7 && tempNumRow-1 >=0) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition-7);
            if(squareContent == null) {
                legalMoves.push(tempPosition-7);
                ++tempNumColumn;
                --tempNumRow;
                tempPosition-=7;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition-7);
                }
                break;
            }
        }
        // move down left
        var tempNumColumn = square_id%8;
        var tempNumRow = Math.floor(square_id/8);
        var tempPosition = square_id;
        while (tempNumColumn-1 >= 0 && tempNumRow+1 <=7) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition+7);
            if(squareContent == null) {
                legalMoves.push(tempPosition+7);
                --tempNumColumn;
                ++tempNumRow;
                tempPosition+=7;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition+7);
                }
                break;
            }
        }
        // move down right
        var tempNumColumn = square_id%8;
        var tempNumRow = Math.floor(square_id/8);
        var tempPosition = square_id;
        while (tempNumColumn+1 <= 7 && tempNumRow+1 <=7) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition+9);
            if(squareContent == null) {
                legalMoves.push(tempPosition+9);
                ++tempNumColumn;
                ++tempNumRow;
                tempPosition+=9;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition+9);
                }
                break;
            }
        }
    }
    
    // -----
    // QUEEN :
    // -----
    else if (pieceId == "queen") {
        // ---
        // Rook moves :
        // ---
        // move left
        var tempNumColumn = square_id%8;
        var tempPosition = square_id;
        while (tempNumColumn-1 >= 0) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition-1);
            if(squareContent == null) {
                legalMoves.push(tempPosition-1);
                --tempNumColumn;
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
        var tempNumColumn = square_id%8;
        var tempPosition = square_id;
        while (tempNumColumn+1 <= 7) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition+1);
            if(squareContent == null) {
                legalMoves.push(tempPosition+1);
                ++tempNumColumn;
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
        // ---
        // Bishop moves
        // ---
        // move up left
        var tempNumColumn = square_id%8;
        var tempNumRow = Math.floor(square_id/8);
        var tempPosition = square_id;
        while (tempNumColumn-1 >= 0 && tempNumRow-1 >=0) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition-9);
            if(squareContent == null) {
                legalMoves.push(tempPosition-9);
                --tempNumColumn;
                --tempNumRow;
                tempPosition-=9;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition-9);
                }
                break;
            }
        }
        // move up right
        var tempNumColumn = square_id%8;
        var tempNumRow = Math.floor(square_id/8);
        var tempPosition = square_id;
        while (tempNumColumn+1 <= 7 && tempNumRow-1 >=0) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition-7);
            if(squareContent == null) {
                legalMoves.push(tempPosition-7);
                ++tempNumColumn;
                --tempNumRow;
                tempPosition-=7;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition-7);
                }
                break;
            }
        }
        // move down left
        var tempNumColumn = square_id%8;
        var tempNumRow = Math.floor(square_id/8);
        var tempPosition = square_id;
        while (tempNumColumn-1 >= 0 && tempNumRow+1 <=7) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition+7);
            if(squareContent == null) {
                legalMoves.push(tempPosition+7);
                --tempNumColumn;
                ++tempNumRow;
                tempPosition+=7;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition+7);
                }
                break;
            }
        }
        // move down right
        var tempNumColumn = square_id%8;
        var tempNumRow = Math.floor(square_id/8);
        var tempPosition = square_id;
        while (tempNumColumn+1 <= 7 && tempNumRow+1 <=7) {
            var squareContent = getContentOfSquare(gameBoard, tempPosition+9);
            if(squareContent == null) {
                legalMoves.push(tempPosition+9);
                ++tempNumColumn;
                ++tempNumRow;
                tempPosition+=9;
            }
            else {
                if(squareContent.team != pieceTeam) {
                    legalMoves.push(tempPosition+9);
                }
                break;
            }
        }
    }
    
    // -----
    // KING :
    // -----
    else if (pieceId == "king") {
        var numRow = Math.floor(square_id/8);
        var numColumn = square_id%8;
        // ---
        // THE 3 UPS
        if(numRow>=1) {
            // up left
            if(numColumn>=1) {
                var squareContent = getContentOfSquare(gameBoard, square_id-9);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id-9);
                }
            }
            // up
            var squareContent = getContentOfSquare(gameBoard, square_id-8);
            if(squareContent == null || squareContent.team != pieceTeam) {
                legalMoves.push(square_id-8);
            }
            // up right
            if(numColumn<=6) {
                var squareContent = getContentOfSquare(gameBoard, square_id-7);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id-7);
                }
            }
        }
        // ---
        // THE 2 MIDS
        // -
        // left
        if(numColumn>=1) {
            var squareContent = getContentOfSquare(gameBoard, square_id-1);
            if(squareContent == null || squareContent.team != pieceTeam) {
                legalMoves.push(square_id-1);
            }
        }
        if(numColumn<=6) {
            var squareContent = getContentOfSquare(gameBoard, square_id+1);
            if(squareContent == null || squareContent.team != pieceTeam) {
                legalMoves.push(square_id+1);
            }
        }
        // ---
        // THE 3 DOWNS
        if(numRow<=6) {
            // down left
            if(numColumn>=1) {
                var squareContent = getContentOfSquare(gameBoard, square_id+7);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id+7);
                }
            }
            // down
            var squareContent = getContentOfSquare(gameBoard, square_id+8);
            if(squareContent == null || squareContent.team != pieceTeam) {
                legalMoves.push(square_id+8);
            }
            // up right
            if(numColumn<=6) {
                var squareContent = getContentOfSquare(gameBoard, square_id+9);
                if(squareContent == null || squareContent.team != pieceTeam) {
                    legalMoves.push(square_id+9);
                }
            }
        }
        if(false) {
            // TODO -> long castle and short castle
        }
    }

    return legalMoves;
}