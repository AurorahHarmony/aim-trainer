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

        this.generateNewDeltas();
    }

    /**
     * Draw the target dot.
     */
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = "#F22";
        this.ctx.strokeStyle = "#600";
        this.ctx.lineWidth = 2;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.stroke();
    }

    /**
     * Generates a new random dx and dy.
     */
    generateNewDeltas() {
        const speed = 3;
        this.dx = Utility.getRandomInt(-speed, speed);

        const remainderSpeed = speed - Math.abs(this.dx);
        this.dy = (Math.random() < 0.5) ? -remainderSpeed : remainderSpeed; // Randomly decide whether dy should be negative.
    }

    /**
     * Updates the stored position of the dot, based on its movement configuration.
     */
    updatePosition() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius < 0 || this.x + this.radius > this.canvas.width) {
            this.dx = -this.dx;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > this.canvas.height) {
            this.dy = -this.dy;
        }
    }
}