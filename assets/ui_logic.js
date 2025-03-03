// ---
// Find html elements
// ---
const User_Interface = document.getElementById("UI");

const ui_top = document.getElementById("ui-top");
const ui_mid = document.getElementById("ui-mid");
const ui_bot = document.getElementById("ui-bot");

const moveLog = document.getElementById("moveWindow");
const divButtons = document.getElementById("buttonWindow");

const buttonSwitchGameMode = document.getElementById("switchGameMode");
const buttonRotateBoard = document.getElementById("rotateBoard");


// ---
// functions
// ---
function rotateBoard() {
    if (gameBoard.style.flexDirection === "column-reverse") {
        gameBoard.style.flexDirection = "";
    } else {
        gameBoard.style.flexDirection = "column-reverse";
    }
}
buttonRotateBoard.addEventListener("click", rotateBoard);
