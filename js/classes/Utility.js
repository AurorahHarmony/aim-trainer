/**
 * Utility class definition
 */

export default class Utility {
    /**
     * Generate a random integer between the min and max values
     * @param {number} min Minimum value
     * @param {number} max Maximum value
     * @returns {number} Integer
     */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}