// GameLevel.js
import GameEnv from "./GameEnv.js";

class GameLevel {
    constructor(gameControl) {
        this.gameEnv = new GameEnv();
        this.gameObjectClasses = []; // Ensure gameObjectClasses is initialized as an array
        // Set properties for easy access within game objects
        this.gameEnv.game = gameControl.game;
        this.gameEnv.path = gameControl.path;
        this.gameEnv.gameContainer = gameControl.gameContainer;
        this.gameEnv.gameCanvas = gameControl.gameCanvas;
        this.gameEnv.gameControl = gameControl;
    }

    create(GameLevelClass) {
        this.continue = true;
        this.gameEnv.create();
        this.gameLevel = new GameLevelClass(this.gameEnv);

        // Ensure gameLevel.classes is valid before assigning
        if (Array.isArray(this.gameLevel.classes)) {
            this.gameObjectClasses = this.gameLevel.classes;
        } else {
            console.error("gameLevel.classes must be an array or is undefined.");
            this.gameObjectClasses = []; // Fallback to an empty array
        }

        for (let gameObjectClass of this.gameObjectClasses) {
            if (!gameObjectClass.data) gameObjectClass.data = {};
            let gameObject = new gameObjectClass.class(gameObjectClass.data, this.gameEnv);
            this.gameEnv.gameObjects.push(gameObject);
        }

        // Add event listener for window resize
        window.addEventListener('resize', this.resize.bind(this));
    }

    destroy() {
        for (let index = this.gameEnv.gameObjects.length - 1; index >= 0; index--) {
             this.gameEnv.gameObjects[index].destroy();
        }
        // Remove event listener for window resize
        window.removeEventListener('resize', this.resize.bind(this));
    }

    update() {
        this.gameEnv.clear();
        for (let gameObject of this.gameEnv.gameObjects) {
            gameObject.update();
        }
    }

    resize() {
        this.gameEnv.resize();
        for (let gameObject of this.gameEnv.gameObjects) {
            gameObject.resize();
        }
    }

}

export default GameLevel;