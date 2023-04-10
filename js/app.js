/**
 * Initialises the app.
 */

import Game from './classes/Game.js';

window.addEventListener("load", function () {
    const canvas = document.getElementById('game');

    if (canvas) {
        const game = new Game(canvas);

        const startMenu = document.getElementById('startMenu');
        startMenu.style.display = "block";
        const startButton = startMenu.querySelector('[name="start"]');

        startButton.addEventListener('click', () => {
            startMenu.style.display = "none";
            game.startGame();
        });

    }
});