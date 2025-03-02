// ---
// Function that hanlde "en passant" (rule regarding pawns)
// ---
function getEnPassantMove(gameBoard, pieceTeam, square_id) {
    if(pieceTeam == "black") {
        if(square_id>= 32 && square_id<=39) {
            // eating left
            if(square_id%8 != 0) {
                var squareOnTheLeft = getContentOfSquare(gameBoard, square_id-1);
                if(squareOnTheLeft != null) {
                    if((squareOnTheLeft.name=="pawn")&&(squareOnTheLeft.team="white")) {
                        // white pawn on left square
                        const start_id = parseInt(lastMovePlayed[0].getAttribute("square_id"), 10);
                        const end_id = parseInt(lastMovePlayed[1].getAttribute("square_id"), 10);
                        if((end_id == square_id-1) && (start_id == square_id-1+8+8)) {
                            isEnPassantIdToRemove = square_id-1;
                            return square_id+7
                        }
                    }
                }
            }
            // eating right
            if(square_id%8 != 7) {
                var squareOnTheLeft = getContentOfSquare(gameBoard, square_id+1);
                if(squareOnTheLeft != null) {
                    if((squareOnTheLeft.name=="pawn")&&(squareOnTheLeft.team="white")) {
                        // white pawn on left square
                        const start_id = parseInt(lastMovePlayed[0].getAttribute("square_id"), 10);
                        const end_id = parseInt(lastMovePlayed[1].getAttribute("square_id"), 10);
                        if((end_id == square_id+1) && (start_id == square_id+1+8+8)) {
                            isEnPassantIdToRemove = square_id+1;
                            return square_id+9
                        }
                    }
                }
            }
        }
    }

    if(pieceTeam == "white") {
        if(square_id>= 24 && square_id<=31) {
            // eating left
            if(square_id%8 != 0) {
                var squareOnTheLeft = getContentOfSquare(gameBoard, square_id-1);
                if(squareOnTheLeft != null) {
                    if((squareOnTheLeft.name=="pawn")&&(squareOnTheLeft.team="black")) {
                        // black pawn on left square
                        const start_id = parseInt(lastMovePlayed[0].getAttribute("square_id"), 10);
                        const end_id = parseInt(lastMovePlayed[1].getAttribute("square_id"), 10);
                        if((end_id == square_id-1) && (start_id == square_id-1-8-8)) {
                            isEnPassantIdToRemove = square_id-1;
                            return square_id-9
                        }
                    }
                }
            }
            // eating right
            if(square_id%8 != 7) {
                var squareOnTheLeft = getContentOfSquare(gameBoard, square_id+1);
                if(squareOnTheLeft != null) {
                    if((squareOnTheLeft.name=="pawn")&&(squareOnTheLeft.team="black")) {
                        // black pawn on left square
                        const start_id = parseInt(lastMovePlayed[0].getAttribute("square_id"), 10);
                        const end_id = parseInt(lastMovePlayed[1].getAttribute("square_id"), 10);
                        if((end_id == square_id+1) && (start_id == square_id+1-8-8)) {
                            isEnPassantIdToRemove = square_id+1;
                            return square_id-7
                        }
                    }
                }
            }
        }
    }
    return null;
}

// ---
// Function that handle the castling moves (between the king and the rook)
// ---
function getCastleMoves() {
    return []
}

// ---
// If a pawn reach the end of the board :
// Create a popup that allows the player to choose a piece to transform the pawn into
// ---
function pawnTransformation(clickedSquare, pieceDiv) {
    var position = clickedSquare.getBoundingClientRect();
    const teamIsBlack = pieceDiv.classList.contains("black");
    var x = position.left;
    var y = position.top;

    if(teamIsBlack) {
        y -= 240;
    }

    // Create the popup
    var popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.width = "80px";
    popup.style.height = "320px";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    popup.style.top = y + "px";
    popup.style.left = x + "px";
    popup.style.background = "lightgray";
    popup.style.border = "2px solid black";

    let pieces = [
        { name: "queen", icon: "&#9813;" },
        { name: "rook", icon: "&#9814;" },
        { name: "knight", icon: "&#9816;" },
        { name: "bishop", icon: "&#9815;" }
    ];

    for (let piece of pieces) {
        let button = document.createElement("button");
        button.style.width = "80px";
        button.style.height = "80px";
        button.style.display = "flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
        button.style.fontSize = "60px";
        button.style.cursor = "pointer";
        button.style.border = "1px solid black";
        button.style.background = "white";
        button.style.lineHeight = "0";
        button.innerHTML = piece.icon;

        button.addEventListener("click", function () {
            if(pieceInside != null) {
                clickedSquare.removeChild(clickedSquare.firstChild);
            }
            if (piece.name === "queen") clickedSquare.innerHTML = queen;
            if (piece.name === "rook") clickedSquare.innerHTML = rook;
            if (piece.name === "knight") clickedSquare.innerHTML = knight;
            if (piece.name === "bishop") clickedSquare.innerHTML = bishop;
            if(teamIsBlack) {
                clickedSquare.firstChild.classList.add('black');    
                clickedSquare.firstChild.firstChild.classList.add('player-black');
            }
            else {
                clickedSquare.firstChild.classList.add('white');
                clickedSquare.firstChild.firstChild.classList.add('player-white');
            }
            document.body.removeChild(popup);
        });
        popup.appendChild(button);
    }

    document.body.appendChild(popup);
}
