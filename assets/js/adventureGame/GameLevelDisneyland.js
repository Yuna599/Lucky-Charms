<<<<<<< HEAD
import Player from "./player.js"; 
import NPC from "./NPC.js";
import Prompt from "./Prompt.js";
=======
import Background from './Background.js';
import Character from './Character.js';
>>>>>>> ea2d28e (asdfj)

class DisneylandLevel {
    constructor(gameControl) {
        this.gameControl = gameControl;
        this.background = new Background({ src: 'http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/IMG_7640.png' }, gameControl);
        this.character = new Character();
    }

    loadLevel() {
        console.log("Loading Disneyland Level...");
        // Load the Disneyland level assets and setup
        this.gameControl.gameEnv.addObject(this.background);
        this.gameControl.gameEnv.addObject(this.character);
    }

    // Add methods to handle Disneyland level logic
}

export default DisneylandLevel;