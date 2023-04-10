/**
 * Initialises the app.
 */

import Game from './classes/Game.js';

window.addEventListener("load", function () {
    const canvas = document.getElementById('game');

    if (canvas) {
        const game = new Game(canvas);
        game.startGame();
    }
});