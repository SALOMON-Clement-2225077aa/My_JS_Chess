// ---
// function to simulate a move on a fake gameboard to see consequences (without the consequences)
// for exemple -> allow me to see if a move put you in a 'check' state (which makes it invalid)
// ---
function simulateMove(gameBoard, square_id, move_id) {
    fakeBoard = gameBoard.cloneNode(true);
    const fakeStartSquare = fakeBoard.querySelector(`[square_id="${square_id}"]`);
    const fakeEndSquare = fakeBoard.querySelector(`[square_id="${move_id}"]`);
    const fakePieceToMove = fakeStartSquare.firstChild;
    
    fakeStartSquare.removeChild(fakePieceToMove);
    if(fakeEndSquare.firstChild != null) {
        fakeEndSquare.removeChild(fakeEndSquare.firstChild);
    }
    fakeEndSquare.appendChild(fakePieceToMove);

    return fakeBoard;
}


// ---
// Look at the board state and search for checks
// Return -> { bool isBlackInCheck, bool isWhiteInCheck}
// ---
function findCheck(board) {
    const allSquares = board.childNodes;
    var legalMovesForBlack = [];
    var legalMovesForWhite = [];
    var blackKingPosition = null;
    var whiteKingPosition = null;

    allSquares.forEach(square => {
        const square_id = parseInt(square.getAttribute("square_id"), 10);
        const piece = getContentOfSquare(board, square_id);
        const pieceLegalMoves = getPieceLegalMoves(board, square_id, false);
        // console.log(square_id,piece,pieceLegalMoves)
        if(piece != null) {
            // Search king positions
            if (piece.name === "king") {
                if (piece.team === "black") {
                    blackKingPosition = square_id;
                } else if (piece.team === "white") {
                    whiteKingPosition = square_id;
                }
            }
            // List all the accessible squares for each team
            if (piece.team === "black") {
                legalMovesForBlack.push(...pieceLegalMoves);
            } else if (piece.team === "white") {
                legalMovesForWhite.push(...pieceLegalMoves);
            }
        }
    });

    const isBlackInCheck = legalMovesForWhite.includes(blackKingPosition);
    const isWhiteInCheck = legalMovesForBlack.includes(whiteKingPosition);

    return { isBlackInCheck, isWhiteInCheck };
}