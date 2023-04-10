/**
 * Game class definition.
 */
import Target from './Target.js';
import Utility from './Utility.js';

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

    generateTarget() {
        const radius = 10;
        const x = Utility.getRandomInt(radius, this.canvas.width - radius);
        const y = Utility.getRandomInt(radius, this.canvas.height - radius);
        const target = new Target(x, y, radius, this.canvas);
        target.draw();
    }

    /**
     * Start the game.
     */
    startGame() {
        for (let i = 0; i < 500; i++) {
            this.generateTarget();
        }
    }
}