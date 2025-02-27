import Player from "./player.js"; 
import NPC from "./NPC.js"; 

class GameLevelGym {
    constructor(gameControl) {
        this.gameControl = gameControl;
        this.player = new Player();
        this.npc = new NPC("Trainer", "Keep working out to pull the sword!");
    }

    loadLevel() {
        console.log("Gym Level Loaded");

        // Set the background to Gym
        document.body.style.backgroundImage = "url('http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/IMG_7848.png')";
        document.body.style.backgroundSize = "cover";

        // Display NPC and messages
        this.npc.displayMessage();
    }

    startWorkout() {
        console.log("Ali is working out...");
        this.player.increaseStrength(5);
    }
}

export default GameLevelGym;
