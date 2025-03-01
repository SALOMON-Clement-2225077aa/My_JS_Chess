// ---
// Look at the game state and search for checks
// Return -> { bool isBlackInCheck, bool isWhiteInCheck}
// ---
function findCheck() {
    const gameBoard = document.querySelector('#gameBoard');
    const allSquares = gameBoard.childNodes;
    var legalMovesForBlack = [];
    var legalMovesForWhite = [];
    var blackKingPosition = null;
    var whiteKingPosition = null;

    allSquares.forEach(square => {
        const square_id = parseInt(square.getAttribute("square_id"), 10);
        const piece = getContentOfSquare(gameBoard, square_id);
        const pieceLegalMoves = getPieceLegalMoves(gameBoard, square_id);
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