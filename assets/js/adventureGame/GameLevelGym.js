import GameEnvBackground from "./GameEnvBackground.js";
import Player from "./Player.js";
import Character from "./Character.js";
import Quiz from "./Quiz.js";
import GameLevelDesert from "./GameLevelDesert.js";
import Npc from "./Npc.js"; // Ensure proper import

console.log("Resolved Player path:", Player);
console.log("Resolved Character path:", Character);

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

    const sprite_src_desertportal = path + "/images/gamify/desertportal.png"; // Reverted path
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
      interact: function () {
        const transitionOverlay = document.createElement("div");
        transitionOverlay.style.position = "fixed";
        transitionOverlay.style.top = "0";
        transitionOverlay.style.left = "0";
        transitionOverlay.style.width = "100%";
        transitionOverlay.style.height = "100%";
        transitionOverlay.style.backgroundColor = "black";
        transitionOverlay.style.opacity = "0";
        transitionOverlay.style.zIndex = "1000";
        transitionOverlay.style.transition = "opacity 1s ease-in-out";
        document.body.appendChild(transitionOverlay);

        setTimeout(() => {
          transitionOverlay.style.opacity = "1";
        }, 100);

        setTimeout(() => {
          const desertLevel = new GameLevelDesert(gameEnv); // Initialize the desert level
          gameEnv.gameControl.levelClasses = [GameLevelDesert]; // Set the desert level in the level classes
          gameEnv.gameControl.currentLevelIndex = 0; // Reset the level index
          gameEnv.gameControl.transitionToLevel(); // Transition to the desert level

          transitionOverlay.style.opacity = "0";
          setTimeout(() => {
            transitionOverlay.remove();
          }, 1000);
        }, 1000);
      },
    };

    // Add event listener for interaction (pressing 'E')
    window.addEventListener("keydown", (event) => {
      if (event.key === "E" || event.key === "e") {
        if (checkCollision(sprite_data_chillguy, sprite_data_desertportal)) {
          sprite_data_desertportal.interact(); // Trigger the interaction
        }
      }
    });

    this.classes = [
      { class: GameEnvBackground, data: image_data_gym },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_desertportal },
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

