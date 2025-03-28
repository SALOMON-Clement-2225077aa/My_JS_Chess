function minimax(gameBoard, depth, alpha, beta, maximizingPlayer) {
    if (depth === 0) return { move: null, eval: staticEvaluation(gameBoard) };
    
    let bestMove = null;
    let allChilds = getAllChildPositions(gameBoard, maximizingPlayer ? "black" : "white");
    
    if (allChilds.length === 0) return { move: null, eval: maximizingPlayer ? -1000 : 1000 };
    
    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (let child of allChilds) {
            const result = minimax(child, depth - 1, alpha, beta, false);
            if (result.eval > maxEval) {
                maxEval = result.eval;
                bestMove = child.lastMove;
            }
            alpha = Math.max(alpha, result.eval);
            if (beta <= alpha) break; // Alpha-Beta pruning
        }
        return { move: bestMove, eval: maxEval };
    } else {
        let minEval = Infinity;
        for (let child of allChilds) {
            const result = minimax(child, depth - 1, alpha, beta, true);
            if (result.eval < minEval) {
                minEval = result.eval;
                bestMove = child.lastMove;
            }
            beta = Math.min(beta, result.eval);
            if (beta <= alpha) break; // Alpha-Beta pruning
        }
        return { move: bestMove, eval: minEval };
    }
}

function staticEvaluation(board) {
    let evaluation = 0;
    const Pvalues = {"rook": 5, "knight": 3, "bishop": 3, "queen": 9, "king": 0, "pawn": 1};
    const zones = {
        0: new Set([27, 28, 35, 36]),
        1: new Set([18, 19, 20, 21, 26, 29, 34, 37, 42, 43, 44, 45]),
        2: new Set([9, 10, 11, 12, 13, 14, 17, 22, 25, 30, 33, 38, 41, 46, 49, 50, 51, 52, 53, 54])
    };
    
    board.childNodes.forEach(square => {
        const square_id = parseInt(square.getAttribute("square_id"), 10);
        const piece = getContentOfSquare(board, square_id);
        if (!piece) return;
        
        let pieceValue = Pvalues[piece.name] * 10;
        let zoneBonus = zones[0].has(square_id) ? 5 : zones[1].has(square_id) ? 2 : zones[2].has(square_id) ? -2 : -5;
        
        if (piece.name === "king") {
            zoneBonus = zones[0].has(square_id) ? -10 : zones[1].has(square_id) ? -7 : zones[2].has(square_id) ? -4 : 5;
        }
        evaluation += (piece.team === "black" ? 1 : -1) * (pieceValue + zoneBonus);
    });
    
    return evaluation;
}

function getAllChildPositions(board, team) {
    return getMoves(board, team).flatMap(move => move.value.map(targetSquare => simulateMove(board, move.key, targetSquare)));
}