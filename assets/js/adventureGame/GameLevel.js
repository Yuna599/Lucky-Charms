// GameLevel.js
import GameEnv from "./GameEnv.js";

class GameLevel {
    constructor(gameControl) {
        this.gameControl = gameControl;
        this.gameEnv = gameControl.gameEnv;
    }

    create(GameLevelClass) {
        this.continue = true;
        this.gameEnv.create();
        this.gameLevel = new GameLevelClass(this.gameEnv);
        this.gameObjectClasses = this.gameLevel.classes;
        for (let gameObjectClass of this.gameObjectClasses) {
            if (!gameObjectClass.data) gameObjectClass.data = {};
            let gameObject = new gameObjectClass.class(gameObjectClass.data, this.gameEnv);
            this.gameEnv.gameObjects.push(gameObject);
        }
        // Add event listener for window resize
        window.addEventListener('resize', this.resize.bind(this));
    }

    loadLevel() {
        console.log("Loading Level...");
        // Load the level assets and setup
    }

    destroy() {
        this.gameEnv.gameObjects = [];
        // Remove event listener for window resize
        window.removeEventListener('resize', this.resize.bind(this));
    }

    update() {
        this.gameEnv.update();
    }

    resize() {
        this.gameEnv.resize();
        for (let gameObject of this.gameEnv.gameObjects) {
            gameObject.resize();
        }
    }

}

export default GameLevel;