import GameLevel from "./GameLevel.js";

class GameControl {
    /**
     * GameControl class to manage the game levels and transitions
     * @param {*} game - The game instance
     * @param {*} levelClasses - The classes for each game level
     */
    constructor(game, levelClasses) {
        this.game = game;
        this.path = game.path;
        this.gameContainer = game.gameContainer;
        this.gameCanvas = game.gameCanvas;
        this.levelClasses = levelClasses;
        this.currentLevel = null;
        this.currentLevelIndex = 0;
        this.gameLoopCounter = 0;
        this.isPaused = false;
        this.exitKeyListener = this.handleExitKey.bind(this);
        this.gameOver = null;
        this.savedCanvasState = [];

        // 🎵 Initialize Background Music
        this.initBackgroundMusic();
    }

    /**
     * Starts the game and transitions to the first level.
     */
    start() {
        this.addExitKeyListener();
        this.transitionToLevel();
        this.addBackgroundChangeButton();
        alert("Hello, I have just seen a Kid pull that sword out. Then after, I have attempted to pull it out myself. But I'm too weak to pull the sword out of that sword. Can you help me buff up and get strong enough to pull out that sword? First, talk to Doggie!");
    }

    /**
     * 🎵 Initialize Background Music (Waits for user interaction)
     */
    initBackgroundMusic() {
        this.backgroundMusic = new Audio("/audio/disney_background.mp3");
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.5;

        // ✅ Add a visible Play Button to bypass autoplay restrictions
        this.createPlayMusicButton();

        // 🎵 Create Mute/Unmute Button
        this.createMusicToggleButton();
    }

    /**
     * 🎵 Start Background Music After Player Clicks the Play Button
     */
    startBackgroundMusic() {
        if (this.backgroundMusic.paused) {
            this.backgroundMusic.muted = false; // Ensure it's not muted
            this.backgroundMusic.play().catch(error => {
                console.error("Music play blocked due to autoplay restrictions:", error);
            });
        }
    }

    /**
     * 🎵 Creates a Play Button to Bypass Autoplay Restrictions
     */
    createPlayMusicButton() {
        const playButton = document.createElement("button");
        playButton.innerText = "Play Music";
        playButton.style.position = "absolute";
        playButton.style.top = "50%";
        playButton.style.left = "50%";
        playButton.style.transform = "translate(-50%, -50%)";
        playButton.style.padding = "10px 20px";
        playButton.style.fontSize = "16px";
        playButton.style.backgroundColor = "black";
        playButton.style.color = "white";
        playButton.style.border = "none";
        playButton.style.cursor = "pointer";
        document.body.appendChild(playButton);

        playButton.addEventListener("click", () => {
            this.startBackgroundMusic();
            playButton.remove(); // 🚀 Remove button after interaction
        });
    }

    /**
     * 🎵 Create Mute/Unmute Button
     */
    createMusicToggleButton() {
        const button = document.createElement("button");
        button.innerText = "Mute Music";
        button.id = "musicToggleButton";

        Object.assign(button.style, {
            position: "absolute",
            top: "10px",
            left: "10px",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            borderRadius: "5px",
            zIndex: "1000"
        });

        button.addEventListener("click", () => {
            if (this.backgroundMusic.muted) {
                this.backgroundMusic.muted = false;
                button.innerText = "Mute Music";
            } else {
                this.backgroundMusic.muted = true;
                button.innerText = "Unmute Music";
            }
        });

        document.body.appendChild(button);
    }

    addBackgroundChangeButton() {
        if (!this.gameContainer) {
            console.error("Game container is not initialized.");
            return;
        }

        const button = document.createElement("button");
        button.innerText = "Go to the gym";
        button.id = "changeBackgroundButton";

        Object.assign(button.style, {
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px"
        });

        this.gameContainer.appendChild(button);
        button.addEventListener("click", this.changeBackground.bind(this));
    }

    changeBackground() {
        const DISNEYLAND_BG = `${this.path}/images/gamify/disneyland.png`;
        const GYM_BG = `${this.path}/images/gamify/gym.png`;

        if (this.gameContainer.style.backgroundImage.includes("disneyland.png")) {
            this.updateBackground(GYM_BG);
        } else {
            this.updateBackground(DISNEYLAND_BG);
        }
    }

    updateBackground(imageSrc) {
        if (this.gameContainer) {
            this.gameContainer.style.backgroundImage = `url(${imageSrc})`;
        } else {
            console.error("Game container is not defined.");
        }
    }

    transitionToLevel() {
        const GameLevelClass = this.levelClasses[this.currentLevelIndex];
        this.currentLevel = new GameLevel(this);
        this.currentLevel.create(GameLevelClass);
        this.gameLoop();
    }

    gameLoop() {
        if (!this.currentLevel.continue) {
            this.handleLevelEnd();
            return;
        }
        if (this.isPaused) {
            return;
        }
        this.currentLevel.update();
        this.handleInLevelLogic();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    handleInLevelLogic() {
        if (this.currentLevelIndex === 0 && this.gameLoopCounter === 0) {
            console.log("Start Level.");
        }
        this.gameLoopCounter++;
    }

    handleLevelEnd() {
        if (this.currentLevelIndex < this.levelClasses.length - 1) {
            alert("Level ended.");
        } else {
            alert("All levels completed.");
        }
        this.currentLevel.destroy();
        if (this.gameOver) {
            this.gameOver();
        } else {
            this.currentLevelIndex++;
            this.transitionToLevel();
        }
    }

    handleExitKey(event) {
        if (event.key === 'Escape') {
            this.currentLevel.continue = false;
        }
    }

    addExitKeyListener() {
        document.addEventListener('keydown', this.exitKeyListener);
    }

    removeExitKeyListener() {
        document.removeEventListener('keydown', this.exitKeyListener);
    }

    pause() {
        this.isPaused = true;
        this.removeExitKeyListener();
    }

    resume() {
        this.isPaused = false;
        this.addExitKeyListener();
        this.gameLoop();
    }
}

export default GameControl;
