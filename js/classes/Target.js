/**
 * Target class definition.
 */

import Utility from './Utility.js';

export default class Target {
    /**
     * Constructs a new Target instance.
     * @param {number} x initial X coordinate of the target 
     * @param {number} y initial Y coordinate of the target
     * @param {number} radius Radius of the target
     * @param {HTMLCanvasElement} canvas
     */
    constructor(x, y, radius, canvas) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.radius = radius;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.preRender();

        this.generateNewDeltas();
    }

    /**
     * Generate the target dot in an offscreen canvas
     * This uses the offscreen canvas so that only one instance needs to draw the initial dot
     */
    preRender() {
        if (!this.canvas.offscreen.target) {
            this.canvas.offscreen.target = document.createElement('canvas');
            this.canvas.offscreen.target.width = this.radius * 2;
            this.canvas.offscreen.target.height = this.radius * 2;

            const ctx = this.canvas.offscreen.target.getContext('2d');
            ctx.beginPath();
            ctx.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = "#F22";
            ctx.strokeStyle = "#600";
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.closePath();
            ctx.stroke();
        }
    }

    /**
     * Draw the target dot.
     */
    draw() {
        this.ctx.drawImage(this.canvas.offscreen.target, this.x - this.radius, this.y - this.radius);
    }

    /**
     * Generates a new random dx and dy.
     */
    generateNewDeltas() {
        const speed = 300;
        this.dx = Utility.getRandomInt(-speed, speed);

        const remainderSpeed = speed - Math.abs(this.dx);
        this.dy = (Math.random() < 0.5) ? -remainderSpeed : remainderSpeed; // Randomly decide whether dy should be negative.
    }

    /**
     * Updates the stored position of the dot, based on its movement configuration.
     * @param {number} deltaTime
     */
    updatePosition(deltaTime) {
        this.x += (this.dx * deltaTime);
        this.y += (this.dy * deltaTime);

        if (this.x - this.radius < 0) {
            this.dx = Math.abs(this.dx);
        } else if (this.x + this.radius > this.canvas.width) {
            this.dx = -Math.abs(this.dx);
        }

        if (this.y - this.radius < 0) {
            this.dy = Math.abs(this.dy);
        } else if (this.y + this.radius > this.canvas.height) {
            this.dy = -Math.abs(this.dy);
        }
    }
}