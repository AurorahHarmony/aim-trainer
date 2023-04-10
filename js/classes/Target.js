/**
 * Target class definition.
 */

export default class Target {
    /**
     * Constructs a new Target instance.
     * @param {number} x
     * @param {number} y 
     * @param {number} radius 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(x, y, radius, canvas) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
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
}