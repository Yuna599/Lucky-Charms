const strengthElement = document.getElementById("strength");

/**
 * Manages player's stats.
 */
class StatsManager {
    static stats = { strength: 10, intelligence: 5 };

    /**
     * Retrieves a stat value.
     * @param {string} statName - The name of the stat.
     * @returns {number} - The value of the stat.
     */
    static getStat(statName) {
        return this.stats[statName] ?? 0; // Nullish coalescing to prevent errors
    }

    /**
     * Sets a stat value.
     * @param {string} statName - The name of the stat.
     * @param {number} value - The new value.
     */
    static setStat(statName, value) {
        this.stats[statName] = value;
    }

    /**
     * Returns the player's current stats.
     */
    static getStats() {
        return { ...this.stats };
    }

    /**
     * Updates the UI with the current strength.
     */
    static updateUI() {
        if (strengthElement) {
            strengthElement.innerText = `Strength: ${this.getStat("strength")} lb`;
        }
    }
}

// ✅ Properly export both default and named functions
export default StatsManager;
export { StatsManager, StatsManager as getStats };
