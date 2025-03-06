function playSound(event) {
    const sounds = {
        movePiece: "assets/sounds/sound_movePiece.wav",
        takePiece: "assets/sounds/sound_takePiece.wav",
        castle: "assets/sounds/sound_castle.wav",
        inCheck: "assets/sounds/sound_inCheck.wav",
        checkmate: "assets/sounds/sound_checkmate.wav"
    };

    if (sounds[event]) {
        const sound = new Audio(sounds[event]);
        sound.play();
    }
}