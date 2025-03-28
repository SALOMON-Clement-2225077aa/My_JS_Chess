function minimax(gameBoard, depth, maximizingPlayer) {
    if (depth == 0) {
        return { move: null, eval: staticEvaluation(gameBoard) };
    }
    let bestMove = null;

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        let allChilds = getAllChildPositions(gameBoard, "black");
        if (allChilds.length === 0) return { move: null, eval: -1000 };
        for (let child of allChilds) {
            const move = child.lastMove;
            const result = minimax(child, depth - 1, false);

            if (result.eval > maxEval) {
                maxEval = result.eval;
                bestMove = move;
            }
        }
        return { move: bestMove, eval: maxEval };

    } else {
        let minEval = +Infinity;
        let allChilds = getAllChildPositions(gameBoard, "white");
        if (allChilds.length === 0) return { move: null, eval: 1000 };
        for (let child of allChilds) {
            const move = child.lastMove;
            const result = minimax(child, depth - 1, true);

            if (result.eval < minEval) {
                minEval = result.eval;
                bestMove = move;
            }
        }
        return { move: bestMove, eval: minEval };
    }
}


function staticEvaluation(b) {
    var evaluation = 0;
    const allSquares = b.childNodes;

    // calculating pieces value
    const Pvalues = {"rook":5,"knight":3,"bishop":3,"queen":9,"king":0,"pawn":1};
    const zone_0 = [27, 28, 35, 36];
    const zone_1 = [18, 19, 20, 21, 26, 29, 34, 37, 42, 43, 44, 45];
    const zone_2 = [9, 10, 11, 12, 13, 14, 17, 22, 25, 30, 33, 38, 41, 46, 49, 50, 51, 52, 53, 54];
    allSquares.forEach(square => {
        const square_id = parseInt(square.getAttribute("square_id"), 10);
        const piece = getContentOfSquare(b, square_id);
        if(piece != null) {
            if(piece.team == "black") {
                evaluation += parseInt(Pvalues[piece.name],10)*10;
                if(piece.name == "king") {
                    if(zone_0.includes(square_id)) {evaluation -= 10;}
                    else if(zone_1.includes(square_id)) {evaluation -= 7;}
                    else if(zone_2.includes(square_id)) {evaluation -= 4;}
                    else {evaluation += 5;}
                }
                else {
                    // Piece au centre :
                    if(zone_0.includes(square_id)) {evaluation += 5;}
                    else if(zone_1.includes(square_id)) {evaluation += 2;}
                    else if(zone_2.includes(square_id)) {evaluation -= 2;}
                    else {evaluation -= 5;}
                }
            }
            if(piece.team == "white") {
                evaluation -= parseInt(Pvalues[piece.name],10)*10;
                if(piece.name == "king") {
                    if(zone_0.includes(square_id)) {evaluation += 10;}
                    else if(zone_1.includes(square_id)) {evaluation += 7;}
                    else if(zone_2.includes(square_id)) {evaluation += 4;}
                    else {evaluation -= 5;}
                }
                else {
                    // Piece au centre :
                    if(zone_0.includes(square_id)) {evaluation -= 5;}
                    else if(zone_1.includes(square_id)) {evaluation -= 2;}
                    else if(zone_2.includes(square_id)) {evaluation += 2;}
                    else {evaluation += 5;}
                }
            }
        }
    });

    return evaluation;
}

function getAllChildPositions(b, team) {
    const legalMoves = getMoves(b, team);
    const allChilds = [];

    for (let move of legalMoves) {
        // console.log(`Piece: ${move.key}, Possible Moves: ${move.value}`);
        for (let targetSquare of move.value) {
            // console.log(`Moving piece ${move.key} to ${targetSquare}`);
            const oneChild = simulateMove(b, move.key, targetSquare);
            allChilds.push(oneChild);
        }
    }

    return allChilds;
}