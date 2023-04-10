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

        this.gameState = states.LOADING;
        this.targets = [];

        // For deltatime
        this.lastTime = null;
        this.currentTime = null;

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
     * Initialises a new randomly positioned Target instance and stores it in the Targets array.
     */
    generateTarget() {
        const radius = 10;
        const x = Utility.getRandomInt(radius, this.canvas.width - radius);
        const y = Utility.getRandomInt(radius, this.canvas.height - radius);
        const target = new Target(x, y, radius, this.canvas);
        this.targets.push(target);
    }

    /**
     * Moves the targets around the screen.
     */
    animateTargets() {
        this.currentTime = new Date().getTime();
        const deltaTime = (this.currentTime - this.lastTime) / 1000;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.targets.forEach(function (target) {
            target.updatePosition(deltaTime);
            target.draw();
        });

        if (this.gameState === states.PLAYING) {
            requestAnimationFrame(this.animateTargets.bind(this));
        }

        this.lastTime = this.currentTime;
    }

    /**
     * Start the game.
     */
    startGame() {
        for (let i = 0; i < 500; i++) {
            this.generateTarget();
        }

        this.gameState = states.PLAYING;

        this.lastTime = new Date().getTime(); // Required to prevent delta time being enormous on first load.
        this.animateTargets();

        const gameDuration = 1000 * 60 // 60 Seconds in milliseconds.
        setTimeout(() => {
            this.gameState = states.ENDED
        }, gameDuration);
    }
}

/**
 * Value mappings for possible game states.
 */
const states = {
    'LOADING': 'loading',
    'PLAYING': 'playing',
    'ENDED': 'ended'
}