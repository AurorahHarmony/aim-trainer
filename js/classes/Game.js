/**
 * Game class definition.
 */
import Score from './Score.js';
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
        this.score = new Score();

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
     * Handle clickevents during gameplay
     */
    clickHandle(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const hitIndex = this.targets.findIndex(target => {
            const distance = Math.sqrt(Math.pow(x - target.x, 2) + Math.pow(y - target.y, 2));
            return distance <= target.radius;
        });

        if (hitIndex >= 0) {
            this.score.registerHit();
            return this.targets.splice(hitIndex, 1);
        }
        this.score.registerMiss();

    }

    /**
     * Start the game.
     */
    startGame() {
        this.score.reset();

        for (let i = 0; i < 100; i++) {
            this.generateTarget();
        }

        this.canvas.addEventListener('mousedown', this.clickHandle.bind(this));

        this.gameState = states.PLAYING;

        this.lastTime = new Date().getTime(); // Required to prevent delta time being enormous on first load.
        this.animateTargets();

        const gameDuration = 1000 * 60 // 60 Seconds in milliseconds.
        setTimeout(() => {
            this.canvas.removeEventListener('mousedown', this.clickHandle);
            this.gameState = states.ENDED;
            console.log(this.score.stats());
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