import GameEnv from './gameenv.js';

/**
 * GameLevel is a static class that manages the game levels.
 * 
 * This class handles level transitions, objectives, and ensures that the correct game elements
 * are loaded based on the current level.
 * 
 * @class GameLevel
 * @property {number} currentLevel - The current level of the game.
 * @property {Array} locations - An array of all available locations.
 * @property {boolean} levelComplete - Tracks if the current level is complete.
 */
class GameLevel {
    static currentLevel = 1;
    static locations = ['Disneyland', 'Gym']; // Both locations exist in the same level
    static currentLocation = 'Disneyland'; // Start in Disneyland
    static levelComplete = false;

    constructor() {
        throw new Error('GameLevel is a static class and cannot be instantiated.');
    }

    /**
     * Initializes the game level, setting up the initial state.
     */
    static initialize() {
        this.loadLocation();
    }

    /**
     * Loads the current location and applies the necessary settings.
     */
    static loadLocation() {
        console.log(`Loading location: ${this.currentLocation}`);
        GameEnv.currentSetting = this.currentLocation;
        GameEnv.loadBackground();
        
        // Handle unique setups for each location
        switch (this.currentLocation) {
            case 'Disneyland':
                console.log('Setting up Disneyland NPCs and interactions.');
                break;
            case 'Gym':
                console.log('Setting up Gym equipment and training tasks.');
                break;
        }
    }

    /**
     * Switches between Disneyland and Gym within the same level.
     */
    static switchLocation() {
        this.currentLocation = this.currentLocation === 'Disneyland' ? 'Gym' : 'Disneyland';
        console.log(`Switched to: ${this.currentLocation}`);
        this.loadLocation();
    }

    /**
     * Marks the current level as complete.
     */
    static completeLevel() {
        console.log(`Level ${this.currentLevel} complete!`);
        this.levelComplete = true;
    }

    /**
     * Resets the game to the first level and starting location.
     */
    static resetGame() {
        this.currentLevel = 1;
        this.levelComplete = false;
        this.currentLocation = 'Disneyland';
        this.loadLocation();
    }
}

export default GameLevel;
