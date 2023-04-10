/**
 * Score class definition
 * Stores information about a game's score
 */

export default class Score {
    constructor() {
        this.hits = 0;
        this.misses = 0;
    }

    /**
     * Reset hits and misses to 0
     */
    reset() {
        this.hits = 0;
        this.misses = 0;
    }

    /**
     * Increases the hit count by one.
     */
    registerHit() {
        this.hits++;
    }

    /**
     * Increases the miss count by one
     */
    registerMiss() {
        this.misses++;
    }

    /**
     * Get the total amount of clicks
     * @returns {number}
     */
    getTotalClicks() {
        return this.hits + this.misses;
    }

    /**
     * Get the percentage of clicks that were hits
     * @returns {number} hit percent rounded to 3dp
     */
    getHitPercent() {
        return (Math.round((this.hits / this.getTotalClicks()) * 100000) / 1000) || 0; // Round to 3dp. Use 0 in case of no hits
    }

    /**
     * Get the percentage of clicks that were misses
     * @returns {number} miss percent rounded to 3dp
     */
    getMissPercent() {
        return (Math.round((this.misses / this.getTotalClicks()) * 100000) / 1000) || 0;
    }
}
