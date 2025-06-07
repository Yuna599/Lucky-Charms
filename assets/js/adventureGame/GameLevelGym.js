import GameEnvBackground from "./GameEnvBackground.js";
import Player from "./Player.js";
import Character from "./Character.js";
import Quiz from "./Quiz.js";
import GameLevelDesert from "./GameLevelDesert.js";
import Npc from "./Npc.js"; // Ensure proper import
import GameLevelMinesweeper from "./GameLevelMinesweeper.js"; // Add this import
import GameControl from "./GameControl.js"; // Ensure GameControl is imported

console.log("Resolved Player path:", Player);
console.log("Resolved Character path:", Character);

function checkCollision(sprite1, sprite2) {
    const rect1 = {
        x: sprite1.INIT_POSITION.x,
        y: sprite1.INIT_POSITION.y,
        width: sprite1.pixels.width,
        height: sprite1.pixels.height,
    };
    const rect2 = {
        x: sprite2.INIT_POSITION.x,
        y: sprite2.INIT_POSITION.y,
        width: sprite2.pixels.width,
        height: sprite2.pixels.height,
    };

    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

class GameLevelGym {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    console.log("Game path:", path); // Debug log

    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.isPaused = false;

    this.quiz = new Quiz();
    this.quiz.initialize();

    const image_src_gym = path + "/images/gamify/gym.png"; // Gym background image
    const image_data_gym = {
      id: "Gym-Background",
      src: image_src_gym,
      pixels: { height: 857, width: 1200 },
    };

    // Player data for Chillguy
    const sprite_src_chillguy = path + "/images/gamify/pixilart.png";
    const CHILLGUY_SCALE_FACTOR = 5;
    let currentDirection = 'down';

    const sprite_data_chillguy = {
      id: 'Chill Guy',
      greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
      src: sprite_src_chillguy,
      SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 80,
      INIT_POSITION: { x: 0, y: height - (height / CHILLGUY_SCALE_FACTOR) },
      pixels: { height: 320, width: 120 },
      orientation: { rows: 4, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      downRight: { row: 1, start: 0, columns: 3, rotate: Math.PI / 16 },
      downLeft: { row: 2, start: 0, columns: 3, rotate: -Math.PI / 16 },
      left: { row: 2, start: 0, columns: 3 },
      right: { row: 1, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
      upLeft: { row: 2, start: 0, columns: 3, rotate: Math.PI / 16 },
      upRight: { row: 1, start: 0, columns: 3, rotate: -Math.PI / 16 },
      idle: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 },
      x: 0,
      y: height - (height / CHILLGUY_SCALE_FACTOR),
      width: 120,
      height: 320,
    };


    const sprite_src_desertportal = path + "/images/gamify/npc4.png"; // Reverted path
    const sprite_greet_desertportal = "Teleport to the Desert? Press E";
    const sprite_data_desertportal = {
      id: 'Desert Portal',
      greeting: sprite_greet_desertportal,
      src: sprite_src_desertportal,
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 100,
      pixels: { width: 521, height: 479 },
      INIT_POSITION: { x: (width * 2 / 5), y: (height * 1 / 10) },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        "Minesweeper is all about logic and probability.",
        "The numbers tell you how many mines are adjacent to that square.",
        "Use right-click to flag squares you think contain mines.",
        "The first click is always safe in modern Minesweeper.",
        "Minesweeper was first included with Windows 3.1 in 1992.",
        "The world record for expert Minesweeper is under 40 seconds!",
        "Looking for patterns is key to solving Minesweeper efficiently.",
        "Sometimes you have to make an educated guess - that's part of the game."
    ],
    reaction: function() {
        // Use dialogue system instead of alert
        if (this.dialogueSystem) {
            this.showReactionDialogue();
        } else {
            console.log(sprite_greet_desertportal);
        }
    },
    interact: function() {
        if (typeof GameControl === "undefined") {
            console.error("GameControl is not defined. Ensure it is properly imported.");
            return;
        }

        let primaryGame = gameEnv.gameControl;
        let levelArray = [GameLevelMinesweeper];
        let gameInGame = new GameControl(gameEnv.game, levelArray);
        primaryGame.pause();
        gameInGame.start();
        gameInGame.gameOver = function() {
            primaryGame.resume();
        };
    }
};
const sprite_src_endship = path + "/images/gamify/computer.png";
    const sprite_greet_endship = "Find the elytra";

    // Store a reference to the dialogueSystem for use in sprite data
    const dialogueSystem = this.dialogueSystem;

    const sprite_data_endship = {
        id: 'Endship',
        greeting: sprite_greet_endship,
        src: sprite_src_endship,
        SCALE_FACTOR: 5,
        ANIMATION_RATE: 100,
        pixels: {height: 521, width: 479},
        INIT_POSITION: { x: (width / 2), y: (height / 2) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,  // Same z-index as player
        dialogues: [
            "Expolore the new terrain?",
            "I love villager life!",
            "Roblox is not better than Minecraft!",
        ],
        reaction: function() {
            // Don't show any reaction dialogue - this prevents the first alert
            // The interact function will handle all dialogue instead
        },
        interact: function() {
            // Clear any existing dialogue first to prevent duplicates
            if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
                this.dialogueSystem.closeDialogue();
            }
            
            // Create a new dialogue system if needed
            if (!this.dialogueSystem) {
                this.dialogueSystem = new DialogueSystem();
            }
            
            // Show portal dialogue with buttons
            this.dialogueSystem.showDialogue(
                "Do you wish to explore the plains?",
                "Plains Biome?",
                this.spriteData.src
            );
            
            // Add buttons directly to the dialogue
            this.dialogueSystem.addButtons([
                {
                    text: "Mountainous Plains",
                    primary: true,
                    action: () => {
                        this.dialogueSystem.closeDialogue();
                        
                        // Clean up the current game state
                        if (gameEnv && gameEnv.gameControl) {
                            // Store reference to the current game control
                            const gameControl = gameEnv.gameControl;
                            
                            // Create fade overlay for transition
                            const fadeOverlay = document.createElement('div');
                            Object.assign(fadeOverlay.style, {
                                position: 'fixed',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#000',
                                opacity: '0',
                                transition: 'opacity 1s ease-in-out',
                                zIndex: '9999'
                            });
                            document.body.appendChild(fadeOverlay);
                            
                            console.log("Starting New level transition...");
                            
                            // Fade in
                            requestAnimationFrame(() => {
                                fadeOverlay.style.opacity = '1';
                                
                                // After fade in, transition to End level
                                setTimeout(() => {
                                    // Clean up current level properly
                                    if (gameControl.currentLevel) {
                                        // Properly destroy the current level
                                        console.log("Destroying current level...");
                                        gameControl.currentLevel.destroy();
                                        
                                        // Force cleanup of any remaining canvases
                                        const gameContainer = document.getElementById('gameContainer');
                                        const oldCanvases = gameContainer.querySelectorAll('canvas:not(#gameCanvas)');
                                        oldCanvases.forEach(canvas => {
                                            console.log("Removing old canvas:", canvas.id);
                                            canvas.parentNode.removeChild(canvas);
                                        });
                                    }
                                    
                                    console.log("Setting up Platformer...");
                                    
                                    // IMPORTANT: Store the original level classes for return journey
                                    gameControl._originalLevelClasses = gameControl.levelClasses;
                                    
                                    // Set the new level class to Platformer
                                    window.location.href = "/finale/gamify/platformer"; // PLEASE WORK

                                    
                                    // Make sure game is not paused
                                    gameControl.isPaused = false;
                                    
                                    // Start the End level with the same control
                                    console.log("Transitioning to Platformer...");
                                    gameControl.transitionToLevel();
                                    
                                    // Fade out overlay
                                    setTimeout(() => {
                                        fadeOverlay.style.opacity = '0';
                                        setTimeout(() => {
                                            document.body.removeChild(fadeOverlay);
                                        }, 1000);
                                    }, 500);
                                }, 1000);
                            });
                        }
                    }
                },
                {
                    text: "Not Ready",
                    action: () => {
                        this.dialogueSystem.closeDialogue();
                    }
                }
            ]);
        }
    }

    // Add event listener for interaction (pressing 'E')
    window.addEventListener("keydown", (event) => {
        if (event.key === "E" || event.key === "e") {
            if (checkCollision(sprite_data_chillguy, sprite_data_desertportal)) {
                sprite_data_desertportal.interact(); // Trigger interaction for Desert Portal
            } else if (checkCollision(sprite_data_chillguy, sprite_data_endship)) {
                sprite_data_endship.interact(); // Trigger interaction for Endship
            }
        }
    });

    this.classes = [
      { class: GameEnvBackground, data: image_data_gym },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_desertportal},
     { class: Npc, data: sprite_data_endship },
    ];

    this.createScoreDisplay();
    this.createLivesDisplay();
  }

  createScoreDisplay() {
    const gameContainer = document.getElementById("gameContainer");
    if (!gameContainer) {
      console.error("Game container not found");
      return;
    }

    const existingScore = document.getElementById("gym-score");
    if (existingScore) {
      existingScore.remove();
    }

    this.scoreElement = document.createElement("div");
    this.scoreElement.id = "gym-score";
    this.scoreElement.style.position = "absolute";
    this.scoreElement.style.top = "20px";
    this.scoreElement.style.left = "50%";
    this.scoreElement.style.transform = "translateX(-50%)";
    this.scoreElement.style.color = "#FFFFFF";
    this.scoreElement.style.fontSize = "28px";
    this.scoreElement.style.fontWeight = "bold";
    this.scoreElement.style.zIndex = "1000";
    this.scoreElement.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
    this.scoreElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    this.scoreElement.style.padding = "10px 20px";
    this.scoreElement.style.borderRadius = "15px";
    this.scoreElement.innerHTML = `
      <span style="color: #FFD700">Score: ${this.score}</span>
    `;

    gameContainer.appendChild(this.scoreElement);
  }

  createLivesDisplay() {
    const gameContainer = document.getElementById("gameContainer");
    if (!gameContainer) {
      console.error("Game container not found");
      return;
    }

    const existingLives = document.getElementById("gym-lives");
    if (existingLives) {
      existingLives.remove();
    }

    this.livesElement = document.createElement("div");
    this.livesElement.id = "gym-lives";
    this.livesElement.style.position = "absolute";
    this.livesElement.style.top = "10px";
    this.livesElement.style.right = "10px";
    this.livesElement.style.color = "white";
    this.livesElement.style.fontSize = "24px";
    this.livesElement.style.fontWeight = "bold";
    this.livesElement.style.zIndex = "1000";
    this.livesElement.textContent = "Lives: 3";

    gameContainer.appendChild(this.livesElement);
  }

  updateScore(points) {
    this.score += points;
    this.updateDisplay();
  }

  updateDisplay() {
    const scoreElement = document.getElementById("gym-score");
    if (scoreElement) {
      scoreElement.innerHTML = `
        <span style="color: #FFD700">Score: ${this.score}</span>
      `;
    } else {
      this.createScoreDisplay();
    }
  }

  updateLives(lives) {
    this.lives = lives;
    if (this.livesElement) {
      this.livesElement.textContent = `Lives: ${this.lives}`;
    }

    if (this.lives <= 0) {
      this.endGame();
    }
  }

  endGame() {
    this.gameOver = true;

    const gameContainer = document.getElementById("gameContainer");
    if (!gameContainer) {
      console.error("Game container not found");
      return;
    }

    const gameOverMsg = document.createElement("div");
    gameOverMsg.style.position = "absolute";
    gameOverMsg.style.top = "50%";
    gameOverMsg.style.left = "50%";
    gameOverMsg.style.transform = "translate(-50%, -50%)";
    gameOverMsg.style.color = "white";
    gameOverMsg.style.fontSize = "48px";
    gameOverMsg.style.fontWeight = "bold";
    gameOverMsg.style.textAlign = "center";
    gameOverMsg.style.zIndex = "1000";
    gameOverMsg.innerHTML = `GAME OVER<br>Score: ${this.score}<br><span style="font-size: 24px">Press ESC to exit the game</span>`;

    gameContainer.appendChild(gameOverMsg);
  }

  cleanup() {
    if (this.scoreElement) {
      this.scoreElement.remove();
    }

    if (this.livesElement) {
      this.livesElement.remove();
    }
  }

  destroy() {
    this.cleanup();
  }
}

export default GameLevelGym;

