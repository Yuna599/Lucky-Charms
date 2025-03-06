// GameControl.js
import GameLevel from "./GameLevel.js";

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
    }

    start() {
        // Step 1: Create a "Click to Start" button
        var startButton = document.createElement("button");
        startButton.innerHTML = "Click to Start"; // Button text
        startButton.id = "start-button"; // Button ID (optional, for styling or identification)
        
        // Optionally, style the button
        startButton.style.padding = "10px 20px";
        startButton.style.backgroundColor = "#4CAF50";
        startButton.style.color = "white";
        startButton.style.border = "none";
        startButton.style.cursor = "pointer";
    
        // Step 2: Append the button to the page
        document.body.appendChild(startButton);
    
        // Step 3: Add event listener to the button
        startButton.addEventListener("click", () => {
            // When the button is clicked, remove it from the page
            startButton.remove();
    
            // Step 4: Call your game functions
            this.addExitKeyListener();
            this.transitionToLevel();
            this.addBackgroundChangeButton();
    
            // Step 5: Play the music
            const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Test with a known URL
            audio.play().then(() => {
            console.log("Audio is playing!");
                }).catch((error) => {
            console.error("Error playing audio:", error);
});

            

            
    
            // Step 6: Show the alert message
            alert(`
                Hello, I have just seen a Kid pull that sword out. 
                Then after, I have attempted to pull it out myself. 
                But I'm too weak to pull the sword out of that sword. 
                Can you help me buff up and get stronger enough to pull out that sword? 
                First, talk to Doggie!
            `);
        });
    }
    
    

    addBackgroundChangeButton() {
        // Ensure the gameContainer exists before creating the button
        if (!this.gameContainer) {
            console.error("Game container is not initialized.");
            return;
        }

        // Create a new button element
        const button = document.createElement("button");
        button.innerText = "Go to the gym";
        button.id = "changeBackgroundButton";

        // Style the button
        button.style.position = "absolute";
        button.style.top = "10px";
        button.style.right = "10px";
        button.style.padding = "10px";
        button.style.backgroundColor = "black";
        button.style.color = "white";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.fontSize = "16px";

        // Append the button to the game container
        this.gameContainer.appendChild(button);

        // Add event listener to change background
        button.addEventListener("click", this.changeBackground.bind(this));
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
        const GameLevelClass = this.levelClasses[this.currentLevelIndex];
        this.currentLevel = new GameLevel(this);
        this.currentLevel.create(GameLevelClass);
        this.gameLoop();
    }
    updateBackground(imageSrc) {
        document.getElementById("backgroundElementId").src = imageSrc;
    }
    /**
     * The main game loop 
     * 1. Updates the current level
     * 2. Handles the level start
     * 3. Requests the next frame
     */
    gameLoop() {
        // If the level is not set to continue, handle the level end condition 
        if (!this.currentLevel.continue) {
            this.handleLevelEnd();
            return;
        }
        // If the game level is paused, stop the game loop
        if (this.isPaused) {
            return;
        }
        this.currentLevel.update();
        this.handleInLevelLogic();
        requestAnimationFrame(this.gameLoop.bind(this));
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
}

export default GameControl;