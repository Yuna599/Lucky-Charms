import Background from "./Background.js";
import Collectible from "./Collectible.js";
import GameObject from "./GameObject.js";
import GameControl from "./GameControl.js";
import GameLevelGym from "./GameLevelGym.js";

class GameLevelPlatformer {
  constructor(gameEnv) {
    const canvas = gameEnv.gameCanvas;
    const ctx = canvas.getContext("2d");

    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const gravity = 0.5;
    const friction = 0.8;
    const collectibles = [];
    const self = this; // Capture reference to this

    const sprite_src_dumbell = gameEnv.path + "/images/gamify/gym3.png";
    const dumbellImage = new Image();
    dumbellImage.src = sprite_src_dumbell;

    const sprite_data_dumbell = {
      id: 'dumbell',
      greeting: "Press E to collect the dumbell!",
      src: sprite_src_dumbell,
      image: dumbellImage,
      SCALE_FACTOR: 3,
      pixels: { width: 32, height: 32 },
      INIT_POSITION: {
        x: (Math.random() * (width - 100)) + 50,
        y: (Math.random() * (height - 300)) + 100
      },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.3, heightPercentage: 0.3 },
      zIndex: 10,
      dialogues: [
        "You found a dumbell",
        "It pulses with ancient energy."
      ]
    };

    function applyBooster(type) {
      switch (type) {
        case "faster": player.speed += 2; break;
        case "slower": player.speed = Math.max(1, player.speed - 2); break;
        case "highJump": player.jumpPower = -18; break;
        case "doubleJump": player.canDoubleJump = true; break;
      }
    }

    function showBoosterDialogue(type) {
      const messages = {
        faster: "You got a Speed Boost! 🏃‍♂️",
        slower: "Oops! You're moving slower. 🐢",
        highJump: "Jump Boost! 🦘",
        doubleJump: "Double Jump unlocked! 🪂"
      };

      const dialogue = document.createElement("div");
      dialogue.innerText = messages[type];
      Object.assign(dialogue.style, {
        position: "absolute",
        top: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#222",
        color: "#fff",
        padding: "10px 20px",
        border: "2px solid white",
        fontFamily: "monospace",
        zIndex: 1000
      });
      document.body.appendChild(dialogue);
      setTimeout(() => document.body.removeChild(dialogue), 3000);
    }

    this.classes = [
      { class: Background, data: { src: gameEnv.path + "/images/gamify/gim.png" } },
      { class: Collectible, data: sprite_data_dumbell }
    ];

    function spawnCollectible() {
      const dumbellImageClone = new Image();
      dumbellImageClone.src = sprite_src_dumbell;

      const newData = {
        ...sprite_data_dumbell,
        image: dumbellImageClone,
        INIT_POSITION: {
          x: (Math.random() * (width - 100)) + 50,
          y: (Math.random() * (height - 300)) + 100
        },
        interact: function () {
          if (this.collected) return;
          this.collected = true;

          const index = collectibles.indexOf(this);
          if (index !== -1) collectibles.splice(index, 1);
          gameEnv.gameObjects = gameEnv.gameObjects.filter(obj => obj !== this);

          score++;
          scoreText.innerText = "Score: " + score;

          console.log("dumbell collected!");

          if (Math.random() < 0.1) {
            const boosters = ["faster", "slower", "highJump", "doubleJump"];
            const randomBooster = boosters[Math.floor(Math.random() * boosters.length)];
            applyBooster(randomBooster);
            showBoosterDialogue(randomBooster);
          }

          spawnCollectible();
        }
      };

      const dumbell = new Collectible(newData, gameEnv);
      collectibles.push(dumbell);
      gameEnv.gameObjects.push(dumbell);
    }

    const sprite_src_player = gameEnv.path + "/images/gamify/pixilart.png";
    const playerImage = new Image();
    playerImage.src = sprite_src_player;

    const PLAYER_SCALE_FACTOR = 1.5;
    const sprite_data_player = {
      id: "Player",
      greeting: "I am player.",
      src: sprite_src_player,
      SCALE_FACTOR: PLAYER_SCALE_FACTOR,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 80,
      INIT_POSITION: { x: 100, y: height - 150 },
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
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    const frameWidth = sprite_data_player.pixels.width / sprite_data_player.orientation.columns;
    const frameHeight = sprite_data_player.pixels.height / sprite_data_player.orientation.rows;

    const player = {
      x: 100,
      y: 0,
      width: frameWidth * 1.5,
      height: frameHeight * 1.5,
      velocityX: 0,
      velocityY: 0,
      speed: 4,
      jumpPower: -12,
      onGround: false,
      frameX: 0,
      frameY: sprite_data_player.down.row,
      frameCounter: 0,
      flashRed: false,
      flashTimer: 0
    };

    const platforms = [
      { x: 0, y: 350, width: 2000, height: 500 },
      { x: 200, y: 280, width: 100, height: 20 },
      { x: 400, y: 220, width: 150, height: 20 },
      { x: 600, y: 150, width: 100, height: 20 },
      { x: 800, y: 250, width: 250, height: 20 }
    ];

    const keys = {};
    document.addEventListener("keydown", (e) => (keys[e.code] = true));
    document.addEventListener("keyup", (e) => (keys[e.code] = false));

    const backgroundImage = new Image();
    backgroundImage.src = gameEnv.path + "/images/gamify/gim.png";

    let score = 0;
    const scoreText = document.createElement("div");
    Object.assign(scoreText.style, {
      position: "absolute",
      top: "20px",
      left: "20px",
      color: "white",
      fontSize: "18px",
      fontFamily: "monospace"
    });
    scoreText.innerText = "Score: 0";
    document.body.appendChild(scoreText);

    function checkCollectibleCollision() {
      collectibles.forEach((collectible) => {
        if (!collectible.collected && self.checkCollision(player, collectible)) {
          if (keys["KeyE"]) {
            collectible.interact();
          }
        }
      });
    }

    function update() {
      if (keys["ArrowRight"] || keys["KeyD"]) {
        player.velocityX = player.speed;
        player.frameY = sprite_data_player.right.row;
      } else if (keys["ArrowLeft"] || keys["KeyA"]) {
        player.velocityX = -player.speed;
        player.frameY = sprite_data_player.left.row;
      } else {
        player.velocityX *= friction;
      }

      if ((keys["ArrowUp"] || keys["KeyW"] || keys["Space"]) && player.onGround) {
        player.velocityY = player.jumpPower;
        player.onGround = false;
      }

      player.velocityY += gravity;
      player.x += player.velocityX;
      player.y += player.velocityY;

      player.onGround = false;
      platforms.forEach(platform => {
        if (
          player.x < platform.x + platform.width &&
          player.x + player.width > platform.x &&
          player.y < platform.y + platform.height &&
          player.y + player.height > platform.y
        ) {
          if (player.velocityY > 0) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.onGround = true;
          }
        }
      });

      if (player.x < 0) player.x = 0;
      if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

      player.frameCounter++;
      if (player.frameCounter >= sprite_data_player.ANIMATION_RATE) {
        player.frameX = (player.frameX + 1) % sprite_data_player.right.columns;
        player.frameCounter = 0;
      }

      checkCollectibleCollision();
      collectibles.forEach(c => c.update());
      draw();
      requestAnimationFrame(update);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));

      ctx.save();
      ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
      ctx.drawImage(
        playerImage,
        player.frameX * frameWidth,
        player.frameY * frameHeight,
        frameWidth,
        frameHeight,
        -player.width / 2,
        -player.height / 2,
        player.width,
        player.height
      );
      ctx.restore();

      collectibles.forEach(collectible => {
        const img = collectible.spriteData.image;
        if (img instanceof HTMLImageElement && img.complete) {
          ctx.drawImage(
            img,
            collectible.spriteData.INIT_POSITION.x,
            collectible.spriteData.INIT_POSITION.y,
            collectible.spriteData.pixels.width * collectible.spriteData.SCALE_FACTOR,
            collectible.spriteData.pixels.height * collectible.spriteData.SCALE_FACTOR
          );
        }
      });
    };

    spawnCollectible();

    playerImage.onload = () => update();
    playerImage.onerror = () => console.error("Failed to load player sprite:", playerImage.src);
  }

  checkCollision(player, collectible) {
    const c = collectible.spriteData;
    const cx = c.INIT_POSITION.x;
    const cy = c.INIT_POSITION.y;
    const cw = c.pixels.width * c.SCALE_FACTOR;
    const ch = c.pixels.height * c.SCALE_FACTOR;
    const px = player.x;
    const py = player.y;
    const pw = player.width;
    const ph = player.height;

    return (
      px < cx + cw &&
      px + pw > cx &&
      py < cy + ch &&
      py + ph > cy
    );
  }

  updateScore(newScore) {
    this.score = newScore;
    if (this.score >= 10) {
      console.log("Score reached 10! Transitioning to GameLevelGym...");
      this.gameEnv.gameControl.transitionToLevel(GameLevelGym);
      this.gameEnv.gameControl.currentLevel.incrementGymScore();
    }
  }
}

export default GameLevelPlatformer;
