const gameBoard = document.querySelector('#gameBoard');

const startBoard = [
    "B_rook", "B_Knight", "B_Bishop", "B_Queen", "B_King", "B_Bishop", "B_Knight", "B_rook",
    "B_pawn", "B_pawn"  , "B_pawn"  , "B_pawn" , "B_pawn", "B_pawn"  , "B_pawn"  , "B_pawn",
    ""      ,  ""       ,  ""       ,  ""      ,  ""     ,  ""       ,  ""       ,  ""     ,
    ""      ,  ""       ,  ""       ,  ""      ,  ""     ,  ""       ,  ""       ,  ""     ,
    ""      ,  ""       ,  ""       ,  ""      ,  ""     ,  ""       ,  ""       ,  ""     ,
    ""      ,  ""       ,  ""       ,  ""      ,  ""     ,  ""       ,  ""       ,  ""     ,
    "W_pawn", "W_pawn"  , "W_pawn"  , "W_pawn" , "W_pawn", "W_pawn"  , "W_pawn"  , "W_pawn",
    "W_rook", "W_Knight", "W_Bishop", "W_Queen", "W_King", "W_Bishop", "W_Knight", "W_rook",
]


function createBoard() {
    startBoard.forEach(tile => {
        const square = document.createElement('div');
        square.classList.add("square");
        gameBoard.append(square);
    });
}

createBoard();