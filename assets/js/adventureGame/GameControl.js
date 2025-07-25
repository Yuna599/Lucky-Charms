// GameControl.js
import GameLevel from "./GameLevel.js";
import Intro from "./Intro.js"; // Ensure Intro class is imported
import GameLevelDesert from "./GameLevelDesert.js"; // Import GameLevelDesert

class GameControl {
    /**
     * GameControl class to manage the game levels and transitions
     * @param {*} path - The path to the game assets
     * @param {*} levelClasses - The classes of for each game level
     */
    constructor(game, levelClasses) {
        // GameControl properties
        this.game = game; // Reference required for game-in-game logic
        this.path = game.path;
        this.gameContainer = game.gameContainer; // Document element that contains the game
        this.gameCanvas = game.gameCanvas; // Document element that contains the game canvas
        this.levelClasses = levelClasses;
        this.currentLevel = null;
        this.currentLevelIndex = 0;
        this.gameLoopCounter = 0;
        this.isPaused = false;
        this.exitKeyListener = this.handleExitKey.bind(this);
        this.gameOver = null; // Callback for when the game is over 
        this.savedCanvasState = []; // Save the current levels game elements 
        this.intro = new Intro(this); // Ensure Intro instance is initialized
        this.interactionHandlers = []; // Add interaction handlers array
    }

    start() {
        if (this.levelClasses[this.currentLevelIndex] === GameLevelDesert) {
            if (!this.intro) {
                console.error("Intro instance is not initialized.");
                return;
            }
            this.intro.showStartButton(); // Show intro only for GameLevelDesert
        } else {
            this.transitionToLevel(); // Directly transition to other levels
        }
    }

    showConversationModal() {
        this.intro.showConversationModal(); // Delegate conversation modal logic to Intro
    }

    showResponse(responseText) {
        this.intro.showResponse(responseText); // Delegate response modal logic to Intro
    }

    /**
     * Switch the background between Disneyland and Gym
     */
    changeBackground() {
        const DISNEYLAND_BG = `${this.path}/images/gamify/disneyland.png`;
        const GYM_BG = `${this.path}/images/gamify/gym.png`;

        // Check current background and switch
        if (this.gameContainer.style.backgroundImage.includes("disneyland.png")) {
            this.updateBackground(GYM_BG); // Switch to Gym
        } else {
            this.updateBackground(DISNEYLAND_BG); // Switch to Disneyland
        }
    }

    /**
     * Update the background image of the game container
     * @param {string} imageSrc - The new background image path
     */
    updateBackground(imageSrc) {
        if (this.gameContainer) {
            // Set the new background image for the game container
            this.gameContainer.style.backgroundImage = `url(${imageSrc})`;
        } else {
            console.error("Game container is not defined.");
        }
    }

    /**
     * Transitions to the next level in the level by
     * 1. Creating a new GameLevel instance
     * 2. Creating the level using the GameLevelClass
     * 3. Starting the game loop
     */ 
    transitionToLevel() {
        const fadeOverlay = document.createElement('div');
        fadeOverlay.style.position = 'fixed';
        fadeOverlay.style.top = '0';
        fadeOverlay.style.left = '0';
        fadeOverlay.style.width = '100%';
        fadeOverlay.style.height = '100%';
        fadeOverlay.style.backgroundColor = 'black';
        fadeOverlay.style.opacity = '0';
        fadeOverlay.style.transition = 'opacity 1s ease-in-out';
        fadeOverlay.style.display = 'flex';
        fadeOverlay.style.alignItems = 'center';
        fadeOverlay.style.justifyContent = 'center';
        
        const loadingText = document.createElement('div');
        loadingText.textContent = 'Loading...';
        loadingText.style.color = 'white';
        loadingText.style.fontSize = '2rem';
        loadingText.style.fontFamily = 'Arial, sans-serif';
        fadeOverlay.appendChild(loadingText);
        
        document.body.appendChild(fadeOverlay);
    
        // Fade to black
        requestAnimationFrame(() => {
            fadeOverlay.style.opacity = '1';
        });
    
        setTimeout(() => {
            // Switch levels when screen is black
            const GameLevelClass = this.levelClasses[this.currentLevelIndex];
            this.currentLevel = new GameLevel(this);
            this.currentLevel.create(GameLevelClass);
    
            // Fade back in
            fadeOverlay.style.opacity = '0';
            setTimeout(() => document.body.removeChild(fadeOverlay), 1000);
            
            // Start game loop after transition
            this.gameLoop();
        }, 1000); // Wait for fade-out duration

        this.cleanupInteractionHandlers(); // Ensure interaction handlers are cleaned up during transitions
    }
    
    /**
     * The main game loop 
     * 1. Updates the current level
     * 2. Handles the level start
     * 3. Requests the next frame
     */
    gameLoop() {
        // Stop the game loop if the game is over
        if (this.currentLevel.gameOver || this.isPaused) {
            console.log("Game loop stopped: Game is over or paused.");
            return;
        }

        // If the level is not set to continue, handle the level end condition 
        if (!this.currentLevel.continue) {
            this.handleLevelEnd();
            return;
        }
        this.currentLevel.update();
        this.handleInLevelLogic();
        // Ensure requestAnimationFrame is called with the correct argument
        requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * This method is a placeholder for future logic that needs to be executed during the game loop.
     * For example, a starting page or time-based events
     */
    handleInLevelLogic() {
        // This condition is established for future starting page logic
        if (this.currentLevelIndex === 0 && this.gameLoopCounter === 0) {
            console.log("Start Level.");
        }
        // This counter is established for future time-based logic, like frames per second
        this.gameLoopCounter++;
    }

    /**
     * Handles the level end by
     * 1. Destroying the current level
     * 2. Calling the gameOver callback if it exists
     * 3. Transitioning to the next level
     */
    handleLevelEnd() {
        // Alert the user that the level has ended
        if (this.currentLevelIndex < this.levelClasses.length - 1) {
            alert("Level ended.");
        } else {
            alert("All levels completed.");
        }
        this.currentLevel.destroy();
        // Call the gameOver callback if it exists
        if (this.gameOver) {
            this.gameOver();
        } else {
            this.currentLevelIndex++;
            this.transitionToLevel();
        }
    }

    /**
     * Exit key handler to end the current level
     * @param {*} event - The keydown event object
     */
    handleExitKey(event) {
        if (event.key === 'Escape') {
            this.currentLevel.continue = false;
        }
    }

    // Helper method to add exit key listener
    addExitKeyListener() {
        document.addEventListener('keydown', this.exitKeyListener);
    }

    // Helper method to remove exit key listener
    removeExitKeyListener() {
        document.removeEventListener('keydown', this.exitKeyListener);
    }

    // Helper method to save the current canvas id and image data in the game container
    saveCanvasState() {
        const gameContainer = document.getElementById('gameContainer');
        const canvasElements = gameContainer.querySelectorAll('canvas');
        this.savedCanvasState = Array.from(canvasElements).map(canvas => {
            return {
                id: canvas.id,
                imageData: canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
            };
        });
    }

    // Helper method to hide the current canvas state in the game container
    hideCanvasState() {
        const gameContainer = document.getElementById('gameContainer');
        const canvasElements = gameContainer.querySelectorAll('canvas');
        canvasElements.forEach(canvas => {
            if (canvas.id !== 'gameCanvas') {
                canvas.style.display = 'none';
            }
        });
    }

    // Helper method to restore the hidden canvas item to be visible
    showCanvasState() {
        const gameContainer = document.getElementById("yourButtonId").addEventListener("click", toggleDesertImage);
        this.savedCanvasState.forEach(hidden_canvas => {
            const canvas = document.getElementById(hidden_canvas.id);
            if (canvas) {
                canvas.style.display = 'block';
                canvas.getContext('2d').putImageData(hidden_canvas.imageData, 0, 0);
            }
        });
    }

    /**
     * Game level in Game Level helper method to pause the underlying game level
     * 1. Set the current game level to paused
     * 2. Remove the exit key listener
     * 3. Save the current canvas game containers state
     * 4. Hide the current canvas game containers
     */
    pause() {
        this.isPaused = true;
        this.removeExitKeyListener();
        this.saveCanvasState();
        this.hideCanvasState();
     }

     /**
      * Game level in Game Level helper method to resume the underlying game level
      * 1. Set the current game level to not be paused
      * 2. Add the exit key listener
      * 3. Show the current canvas game containers
      * 4. Start the game loop
      */
    resume() {
        this.isPaused = false;
        this.addExitKeyListener();
        this.showCanvasState();
        this.gameLoop();
    }

    /**
     * Register an interaction handler
     * @param {Function} handler - The interaction handler to register
     */
    registerInteractionHandler(handler) {
        this.interactionHandlers.push(handler); // Register interaction handler
    }

    /**
     * Unregister an interaction handler
     * @param {Function} handler - The interaction handler to unregister
     */
    unregisterInteractionHandler(handler) {
        this.interactionHandlers = this.interactionHandlers.filter(h => h !== handler); // Unregister interaction handler
    }

    /**
     * Clean up all interaction handlers
     */
    cleanupInteractionHandlers() {
        this.interactionHandlers.forEach(handler => handler.destroy()); // Clean up all handlers
        this.interactionHandlers = [];
    }

    update() {
        // Placeholder for GameControl-specific update logic
        console.log("GameControl update called.");
    }
}

export default GameControl;