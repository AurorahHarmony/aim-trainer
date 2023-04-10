import Score from "./Score.js";

/**
 * Menus class definition
 */
export default class Menus {

    constructor(Game) {
        this.game = Game;
        this.start = document.getElementById('startMenu');
        this.end = document.getElementById('endMenu');
    }

    /**
     * Shows the start menu.
     */
    showStart() {
        this.start.style.display = 'block';
        const startButton = this.start.querySelector('[name="start"]');

        startButton.addEventListener('click', () => {
            this.start.style.display = 'none';
            this.game.startGame();
        });
    }

    /**
     * Show the end screen
     * @param {Score} score 
     */
    showEnd(score) {
        this.end.style.display = 'block';
        const resultTextArea = this.end.querySelector('[name="results"]');
        const replayButton = this.end.querySelector('[name="playAgain"]');

        resultTextArea.innerHTML =
            `Total Clicks: ${score.getTotalClicks()}<br>
            Hits: ${score.hits} - ${score.getHitPercent()}%<br>
            Misses: ${score.misses} - ${score.getMissPercent()}%`;

        replayButton.addEventListener('click', () => {
            this.end.style.display = 'none';
            this.showStart();
        });
    }
}