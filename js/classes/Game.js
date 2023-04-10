/**
 * Game class definition.
 */
import Menus from './Menus.js';
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

        // Buffer canvas for smoothing rendering
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCanvasCtx = this.bufferCanvas.getContext('2d');
        this.bufferCanvas.offscreen = {}; // Initialised so that actors can pre-render

        this.gameState = states.LOADING;
        this.handles = {};
        this.targets = [];
        this.score = new Score();

        this.menus = new Menus(this);

        // For deltatime
        this.lastTime = null;
        this.currentTime = null;

        this.updateCanvasSize();

        window.addEventListener('resize', this.updateCanvasSize.bind(this));

        this.menus.showStart();
    }

    /**
     * Update the canvas size to be the full height and width of the window.
    */
    updateCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.bufferCanvas.width = window.innerWidth;
        this.bufferCanvas.height = window.innerHeight;

        // Ensure all targets remain on canvas in case of resize
        // TODO: Update Targets to calculate x & y as percentages of their X and Y position,
        //       so that Targets do not become bunched when scaling down the window
        this.targets.forEach((target) => {
            if (target.x + target.radius > this.canvas.width)
                target.x = this.canvas.width - target.radius;
            if (target.y + target.radius > this.canvas.height)
                target.y = this.canvas.height - target.radius;
        });
    }

    /**
     * Initialises a new randomly positioned Target instance and stores it in the Targets array.
     */
    generateTarget() {
        const radius = 10;
        const x = Utility.getRandomInt(radius, this.bufferCanvas.width - radius);
        const y = Utility.getRandomInt(radius, this.bufferCanvas.height - radius);
        const target = new Target(x, y, radius, this.bufferCanvas);
        this.targets.push(target);
    }

    // Remove all drawings from canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Moves the targets around the screen.
     */
    animateTargets() {
        this.currentTime = new Date().getTime();
        const deltaTime = (this.currentTime - this.lastTime) / 1000;

        // Clear buffer canvas
        this.bufferCanvasCtx.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);

        this.targets.forEach(function (target) {
            target.updatePosition(deltaTime);
            target.draw();
        });

        this.clearCanvas();
        this.ctx.drawImage(this.bufferCanvas, 0, 0);

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

        this.handles.clickHandle = this.clickHandle.bind(this);
        this.canvas.addEventListener('mousedown', this.handles.clickHandle);

        this.gameState = states.PLAYING;

        this.lastTime = new Date().getTime(); // Required to prevent delta time being enormous on first load.
        this.animateTargets();

        const gameDuration = 1000 * 6 // 60 Seconds in milliseconds.
        setTimeout(this.endGame.bind(this), gameDuration);
    }

    /**
     * Ends the game
     */
    endGame() {
        this.canvas.removeEventListener('mousedown', this.handles.clickHandle);
        delete this.handles.clickHandle;

        this.gameState = states.ENDED;
        requestAnimationFrame(this.clearCanvas.bind(this));
        this.menus.showEnd(this.score);
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