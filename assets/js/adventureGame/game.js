import GameControl from './GameControl.js';
import GameLevelDesert from './GameLevelDesert.js'; // Import GameLevelDesert
import GameLevelGym from './GameLevelGym.js'; // Import GameLevelGym
import GameLevelMinesweeper from './GameLevelMinesweeper.js';

class Game {
    constructor(environment) {
        this.environment = environment;
        this.path = environment.path;
        this.gameContainer = environment.gameContainer;
        this.gameCanvas = environment.gameCanvas;
        this.pythonURI = environment.pythonURI;
        this.javaURI = environment.javaURI;
        this.fetchOptions = environment.fetchOptions;
        this.uid = null;
        this.id = null;
        this.gname = null;

        this.levels = [
            GameLevelDesert,
            GameLevelGym,
            GameLevelMinesweeper,
            
        ];
        this.gameControl = new GameControl(this, this.levels);
        this.gameControl.start();
    }

    static main(environment) {
        return new Game(environment);
    }

    async initUser() {
        try {
            const response = await fetch(this.pythonURI + '/api/id', this.fetchOptions);
            if (!response.ok) throw new Error("API unreachable");
            const userData = await response.json();
            this.uid = userData.uid;
            const javaResponse = await fetch(this.javaURI + '/rpg_answer/person/' + this.uid, this.fetchOptions);
            if (!javaResponse.ok) throw new Error(`Spring server response: ${javaResponse.status}`);
            const javaData = await javaResponse.json();
            this.id = javaData.id;
        } catch (error) {
            console.warn("User API failed. Using fallback.");
            this.uid = "fallback-user";
            this.id = "fallback-id";
        }
    }
}

export default Game;