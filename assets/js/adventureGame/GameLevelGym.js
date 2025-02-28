import Background from './Background.js';
import Character from './Character.js';

class GymLevel {
    constructor(gameControl) {
        this.gameControl = gameControl;
        this.background = new Background({ src: 'http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/IMG_7848.png' }, gameControl);
        this.character = new Character();
    }

    loadLevel() {
        console.log("Loading Gym Level...");
        // Load the Gym level assets and setup
        this.gameControl.gameEnv.addObject(this.background);
        this.gameControl.gameEnv.addObject(this.character);
    }

    // Add methods to handle Gym level logic
}

export default GymLevel;