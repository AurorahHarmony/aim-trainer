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
     * Generate a string with current score stats
     * @returns {string} Score stats
     */
    stats() {
        const total = this.getTotalClicks();
        const hitPercent = Math.round((this.hits / total) * 100000) / 1000; // Round to 3dp
        const missPercent = Math.round((this.misses / total) * 100000) / 1000; // Round to 3dp

        return `Total Clicks: ${total}\nHits: ${this.hits} (${hitPercent}%)\nMisses: ${this.misses} (${missPercent}%)`;
    }
}
