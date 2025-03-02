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
