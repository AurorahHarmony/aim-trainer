/**
 * Game class definition.
 */
import Target from './Target.js';

export default class Game {

    /**
     * Constructs the game instance.
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.updateCanvasSize();
    }

    /**
     * Update the canvas size to be the full height and width of the window.
     */
    updateCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Start the game.
     */
    startGame() {
        const target = new Target(this.canvas.width / 2, this.canvas.height / 2, 5, this.canvas);
        target.draw();
    }
}