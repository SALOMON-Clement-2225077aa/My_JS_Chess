function minimax(gameBoard, depth, maximazingPlayer) {
    
}





function staticEvaluation(b) {
    var evaluation = 0;
    const allSquares = b.childNodes;

    // calculating pieces value
    const Pvalues = {"rook":5,"knight":3,"bishop":3,"queen":9,"king":0,"pawn":1};
    allSquares.forEach(square => {
        const square_id = parseInt(square.getAttribute("square_id"), 10);
        const piece = getContentOfSquare(b, square_id);
        if(piece != null) {
            if(piece.team == "black") {
                evaluation += parseInt(Pvalues[piece.name],10);
            }
            if(piece.team == "white") {
                evaluation -= parseInt(Pvalues[piece.name],10);
            }
        }
    });


    return evaluation;
}




function getAllChildPositions(b, team) {


    
}