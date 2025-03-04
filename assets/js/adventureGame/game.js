import GameControl from './GameControl.js';
import GameLevelDisneyland from "./GameLevelDisneyland.js";
import GameLevelGym from "./GameLevelGym.js";
import Player from "./Player.js";

class Game {
    static main(environment) {
        // Setting Web Application path
        this.path = environment.path;

        // Setting Element IDs
        this.gameContainer = environment.gameContainer;
        this.gameCanvas = environment.gameCanvas;

        // API environment variables 
        this.pythonURI = environment.pythonURI;
        this.javaURI = environment.javaURI;
        this.fetchOptions = environment.fetchOptions;

        // Initialize player
        this.player = new Player("Ali");
        
        // Start game with Disneyland level
        const gameLevelClasses = [GameLevelDisneyland, GameLevelGym];
        new GameControl(this, gameLevelClasses).start();
    }
}

export default Game;
