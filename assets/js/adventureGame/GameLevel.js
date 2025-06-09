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
            console.warn("gameLevel.classes is undefined or not an array. Defaulting to an empty array.");
            this.gameObjectClasses = []; // Fallback to an empty array
        }

        if (this.gameObjectClasses.length === 0) {
            console.error("No game objects defined for this level. Ensure the level class defines 'classes'.");
            console.error("GameLevelClass:", GameLevelClass.name);
            console.error("gameLevel.classes:", this.gameLevel.classes);
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
        if (typeof this.gameLevel.destroy === "function") {
          this.gameLevel.destroy()
        }
    
        // Properly clean up all game objects
        for (let index = this.gameEnv.gameObjects.length - 1; index >= 0; index--) {
          // Make sure each object's destroy method is called to clean up event listeners
          if (typeof this.gameEnv.gameObjects[index].destroy === "function") {
            this.gameEnv.gameObjects[index].destroy()
          }
        }
    
        // Clear out the game objects array
        this.gameEnv.gameObjects = [];
        
        window.removeEventListener("resize", this.boundResize)
      }

    update() {
        this.gameEnv.clear();
        for (let gameObject of this.gameEnv.gameObjects) {
            if (typeof gameObject.update === "function") {
                gameObject.update(); // Call update only if it exists
            } else {
                console.error(`GameObject ${gameObject.constructor.name} is missing an update method.`);
            }
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