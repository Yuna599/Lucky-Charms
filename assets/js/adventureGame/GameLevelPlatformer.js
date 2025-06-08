import Background from "./Background.js";

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

    // Player sprite setup
    const sprite_src_player = gameEnv.path + "/images/gamify/pixilart.png";
    const playerImage = new Image();
    playerImage.src = sprite_src_player;

    const PLAYER_SCALE_FACTOR = 3;

    const sprite_data_player = {
      id: "Player",
      greeting: "I am Alex.",
      src: sprite_src_player,
      SCALE_FACTOR: PLAYER_SCALE_FACTOR,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 80,
      INIT_POSITION: { x: 100, y: height - 150 },
      pixels: { height: 320, width: 120 },
      orientation: { rows: 4, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      left: { row: 1, start: 0, columns: 3 },
      right: { row: 2, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 },
    };

    const frameWidth = sprite_data_player.pixels.width / sprite_data_player.orientation.columns;
    const frameHeight = sprite_data_player.pixels.height / sprite_data_player.orientation.rows;

    const player = {
      x: sprite_data_player.INIT_POSITION.x,
      y: sprite_data_player.INIT_POSITION.y,
      width: frameWidth / (PLAYER_SCALE_FACTOR - 1), // Increase width further
      height: frameHeight / (PLAYER_SCALE_FACTOR - 1), // Increase height further
      velocityX: 0,
      velocityY: 0,
      speed: 4,
      jumpPower: -12,
      onGround: false,
      frameX: 0,
      frameY: sprite_data_player.down.row,
      frameCounter: 0,
    };

    // Platform data
    const platforms = [
      { x: 0, y: height - 50, width: width, height: 50 },
      { x: 200, y: height - 150, width: 100, height: 10 },
      { x: 400, y: height - 250, width: 150, height: 10 },
      { x: 600, y: height - 350, width: 100, height: 10 },
    ];

    // Ensure classes is properly defined
    this.classes = [
      { class: Background, data: { src: gameEnv.path + "/images/gamify/gim.png" } }
    ];

    // Key tracking
    const keys = {};
    document.addEventListener("keydown", (e) => (keys[e.code] = true));
    document.addEventListener("keyup", (e) => (keys[e.code] = false));

    // Background image setup
    const backgroundImage = new Image();
    backgroundImage.src = gameEnv.path + "/images/gamify/gim.png"; // Background image source

    // Game loop
    const update = () => {
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
      platforms.forEach((platform) => {
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

      draw();
      requestAnimationFrame(update);
    };

    // Drawing
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background first
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // Draw platforms on top of the background
      ctx.fillStyle = "green";
      platforms.forEach((p) => ctx.fillRect(p.x, p.y, p.width, p.height));

      // Draw player sprite
      ctx.drawImage(
        playerImage,
        player.frameX * frameWidth,
        player.frameY * frameHeight,
        frameWidth,
        frameHeight,
        player.x,
        player.y,
        player.width,
        player.height
      );

      // Optional: Debug hitboxes
      ctx.strokeStyle = "red";
      ctx.strokeRect(player.x, player.y, player.width, player.height);
    };

    // Start the game loop only after the image is ready
    playerImage.onload = () => {
      update();
    };

    // Debugging for image load failure
    playerImage.onerror = () => {
      console.error("Failed to load player sprite:", playerImage.src);
    };
  }
}

export default GameLevelPlatformer;