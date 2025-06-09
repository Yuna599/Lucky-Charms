import Background from "./Background.js";
import Collectible from "./Collectible.js";
import GameObject from "./GameObject.js";
import GameControl from "./GameControl.js";

class GameLevelPlatformer {
  constructor(gameEnv) {
    const canvas = gameEnv.gameCanvas;
    const ctx = canvas.getContext("2d");

    // Define width and height from gameEnv
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;

    // Ensure canvas dimensions are set
    canvas.width = width;
    canvas.height = height;

    // Game settings
    const gravity = 0.5;
    const friction = 0.8;

    const collectibles = []; // Declare collectibles array

    // Define sprite_data_dumbell before using it
    const sprite_src_dumbell = gameEnv.path + "/images/gamify/gym3.png";

    // Load the image manually and assign it to sprite_data_dumbell
    const dumbellImage = new Image();
    dumbellImage.src = sprite_src_dumbell;

    const sprite_data_dumbell = {
      id: 'dumbell',
      greeting: "Press E to collect the dumbell!",
      src: sprite_src_dumbell,
      image: dumbellImage, // Assign the loaded image
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
        "You found an dumbell",
        "It pulses with ancient energy."
      ]
    };

    // Ensure classes is properly defined
    this.classes = [
      { class: Background, data: { src: gameEnv.path + "/images/gamify/gim.png" } },
      { class: Collectible, data: sprite_data_dumbell }
    ];

    function spawnCollectible() {
      const dumbellImageClone = new Image();
      dumbellImageClone.src = sprite_src_dumbell;

      const newData = {
        id: 'dumbell',
        greeting: "Press E to collect the dumbell!",
        src: sprite_src_dumbell,
        image: dumbellImageClone,
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
          "You found an dumbell",
          "It pulses with ancient energy."
        ],
        interact: function () {
          if (this.collected) return; // Prevent double interaction
          this.collected = true;

          // Remove from scene
          const index = collectibles.indexOf(this);
          if (index !== -1) collectibles.splice(index, 1);
          gameEnv.gameObjects = gameEnv.gameObjects.filter(obj => obj !== this);

          // Update score
          score++;
          scoreText.innerText = "Score: " + score;

          console.log("dumbell collected!");

          // Spawn new one
          spawnCollectible();
        }
      };

      const dumbell = new Collectible(newData, gameEnv);
      collectibles.push(dumbell);
      gameEnv.gameObjects.push(dumbell);
    }

    // Player sprite setup
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
      left: { row: 2, start: 0, columns: 3 },   // Swapped with 'right'
      right: { row: 1, start: 0, columns: 3 },  // Swapped with 'left'
      up: { row: 3, start: 0, columns: 3 },
      upLeft: { row: 2, start: 0, columns: 3, rotate: Math.PI / 16 },
      upRight: { row: 1, start: 0, columns: 3, rotate: -Math.PI / 16 },
      idle: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 },
    };

    // Player object
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

    // Platform data
    const platforms = [
      { x: 0, y: 350, width: 2000, height: 500 }, // Extended ground platform width
      { x: 200, y: 280, width: 100, height: 10 },
      { x: 400, y: 220, width: 150, height: 10 },
      { x: 600, y: 150, width: 100, height: 10 },
      { x: 800, y: 250, width: 150, height: 10 } // New platform added
    ];

    // Key tracking
    const keys = {};
    document.addEventListener("keydown", (e) => (keys[e.code] = true));
    document.addEventListener("keyup", (e) => (keys[e.code] = false));

    // Background image setup
    const backgroundImage = new Image();
    backgroundImage.src = gameEnv.path + "/images/gamify/gim.png"; // Background image source

    let score = 0; // Initialize score
    const scoreText = document.createElement("div"); // Create score display
    scoreText.style.position = "absolute";
    scoreText.style.top = "20px";
    scoreText.style.left = "20px";
    scoreText.style.color = "white";
    scoreText.style.fontSize = "18px";
    scoreText.style.fontFamily = "monospace";
    scoreText.innerText = "Score: 0";
    document.body.appendChild(scoreText);

    function checkCollectibleCollision() {
      collectibles.forEach((collectible, index) => {
        if (!collectible.collected) {
          const c = collectible.spriteData;
          const cx = c.INIT_POSITION.x;
          const cy = c.INIT_POSITION.y;
          const cw = c.pixels.width * c.SCALE_FACTOR;
          const ch = c.pixels.height * c.SCALE_FACTOR;

          const px = player.x;
          const py = player.y;
          const pw = player.width;
          const ph = player.height;

          const overlapping =
            px < cx + cw &&
            px + pw > cx &&
            py < cy + ch &&
            py + ph > cy;

          if (overlapping && keys["KeyE"]) {
            collectible.interact(); // Trigger interaction logic
          }
        }
      });
    }

    function update() {
      // Movement input
      if (keys["ArrowRight"] || keys["KeyD"]) {
        player.velocityX = player.speed;
        player.frameY = sprite_data_player.right.row;
      } else if (keys["ArrowLeft"] || keys["KeyA"]) {
        player.velocityX = -player.speed;
        player.frameY = sprite_data_player.left.row;
      } else {
        player.velocityX *= friction;
      }

      // Jumping
      if ((keys["ArrowUp"] || keys["KeyW"] || keys["Space"]) && player.onGround) {
        player.velocityY = player.jumpPower;
        player.onGround = false;
      }

      // Gravity
      player.velocityY += gravity;

      // Position update
      player.x += player.velocityX;
      player.y += player.velocityY;

      // Platform collision
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

      // Stay inside canvas
      if (player.x < 0) player.x = 0;
      if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
      }

      // Animate sprite
      player.frameCounter++;
      if (player.frameCounter >= sprite_data_player.ANIMATION_RATE) {
        player.frameX = (player.frameX + 1) % sprite_data_player.right.columns;
        player.frameCounter = 0;
      }

      // Check collectible collision
      checkCollectibleCollision();

      // Update collectibles
      collectibles.forEach((collectible) => collectible.update());

      draw();
      requestAnimationFrame(update);
    };

    // Drawing
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // Draw platforms
      ctx.fillStyle = "green";
      platforms.forEach((p) => ctx.fillRect(p.x, p.y, p.width, p.height));

      ctx.save(); // Save canvas state

      // If facing right, flip the sprite
      if (player.facing === "right") {
        ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
        ctx.scale(-1, 1); // Flip horizontally
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
      } else {
        // Normal draw (left-facing or idle)
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
      }

      ctx.restore(); // Restore canvas state

      // Draw dumbell if not collected
      collectibles.forEach((collectible) => {
        const img = collectible.spriteData.image;

        // Only draw if the image is loaded
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

    spawnCollectible(); // Spawn the first collectible

    // Ensure proper game loop initialization
    playerImage.onload = () => {
      update();
    };

    playerImage.onerror = () => {
      console.error("Failed to load player sprite:", playerImage.src);
    };
  }
}

export default GameLevelPlatformer;