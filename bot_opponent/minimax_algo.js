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