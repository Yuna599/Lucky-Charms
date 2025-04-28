// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';

class GameLevelDesert {
  constructor(gameEnv) {
    // Values dependent on this.gameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_desert = path + "/images/gamify/disneyland.png"; // be sure to include the path
    const image_src_gym = path + "/images/gamify/gym.png";
    let image_data_desert = {
        name: 'desert',
        greeting: "Welcome to the desert!  It is hot and dry here, but there are many adventures to be had!",
        src: image_src_desert,
        pixels: {height: 580, width: 1038}
    };
    const original_image_data_desert = { ...image_data_desert };

    function updateBackground(src) {
        const backgroundElement = document.getElementById("background");
        if (backgroundElement) {
            backgroundElement.style.backgroundImage = `url(${src})`;
        } else {
            console.error("Background element not found!");
        }
    }

    function toggleDesertImage() {
      if (image_data_desert.src === image_src_desert) {
          // Switch to the Gym
          image_data_desert.src = image_src_gym;
          image_data_desert.name = 'gym';
          image_data_desert.greeting = "Welcome to the gym! Time to get stronger!";
      } else {
        image_data_desert = { ...original_image_data_desert };
      }
  
      updateBackground(image_data_desert.src);
    }
    

    // Player data for Chillguy
    const sprite_src_chillguy = path + "/images/gamify/pixilart.png"; // be sure to include the path
    const CHILLGUY_SCALE_FACTOR = 5;
    let currentDirection = 'down'; // Track last movement direction
    
    const sprite_data_chillguy = {
        id: 'Chill Guy',
        greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 400, // Reduced from 5 to 2 for slower movement
        ANIMATION_RATE: 80, // Increased from 100 to 200 for smoother animation
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
        idle: { row: 0, start: 0, columns: 1 }, // Idle frame (first frame of down animation)
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 }, // W, A, S, D
        x: 0,
        y: height - (height / CHILLGUY_SCALE_FACTOR),
        width: 120,
        height: 320,
    };

    // NPC data for creeper
    const sprite_src_creeper = path + "/images/gamify/octocat.png"; // Ensure the path is correct
    const sprite_greet_creeper = "KABOOM!!";
    const sprite_data_creeper = {
        id: 'Creeper',
        greeting: sprite_greet_creeper,
        src: sprite_src_creeper,
        SCALE_FACTOR: 4, // Starting scale factor is 4ling needs
        ANIMATION_RATE: 100,
        pixels: {height: 301, width: 801},
        INIT_POSITION: { x: 100, y: 100 },
        orientation: {rows: 1, columns: 4 },
        down: {row: 0, start: 0, columns: 1 },
        right: {row: 0, start: 0, columns: 3 },
        left: {row: 0, start: 0, columns: 4 },
        up: {row: 0, start: 0, columns: 2 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },

        walkingArea: {
          xMin: width / 10, //left boundary
          xMax: (width * 5 / 7), //right boundary 
          yMin: height / 4, //top boundary 
          yMax: (height * 8 / 15) //bottom boundary
        },

        speed : 5,
        direction: { x: 1, y: 1 },

        updatePosition: function () {
          console.log(`Creeper position: (${this.INIT_POSITION.x}, ${this.INIT_POSITION.y})`);
          this.INIT_POSITION.x += this.direction.x * this.speed; // Update x position based on direction and speed
          this.INIT_POSITION.y += this.direction.y * this.speed; // Update y position based on direction and speed

          if (this.INIT_POSITION.x <= this.walkingArea.xMin) {
            this.INIT_POSITION.x = this.walkingArea.xMin;
            this.direction.x = 1; 
          }
          if (this.INIT_POSITION.x >= this.walkingArea.xMax) {
            this.INIT_POSITION.x = this.walkingArea.xMax;
            this.direction.x = -1; 
          }
          if (this.INIT_POSITION.y <= this.walkingArea.yMin) {
            this.INIT_POSITION.y = this.walkingArea.yMin;
            this.direction.y = 1; 
          }
          if (this.INIT_POSITION.y >= this.walkingArea.yMax) {
            this.INIT_POSITION.y = this.walkingArea.yMax;
            this.direction.y = -1; 
          }
        },

        reaction: function () {
          alert(sprite_greet_creeper); 
        },
        x: 100,
        y: 100,
        width: 801,
        height: 301,
      };

      setInterval(() => {
        sprite_data_creeper.updatePosition(); 
      }, 100); // update position every 100 milliseconds 

      function checkCollision(player, creeper) {
        if (!player || !creeper) {
          console.log("❌ Player or Creeper is undefined.");
          return false;
        }

        // Log player and creeper properties for debugging
        console.log("Player:", player.x, player.y, player.width, player.height);
        console.log("Creeper:", creeper.x, creeper.y, creeper.width, creeper.height);

        // Calculate collision based on positions and dimensions
        const isColliding = !(
          player.x + player.width <= creeper.x || // Player's right edge is left of Creeper's left edge
          player.x >= creeper.x + creeper.width || // Player's left edge is right of Creeper's right edge
          player.y + player.height <= creeper.y || // Player's bottom edge is above Creeper's top edge
          player.y >= creeper.y + creeper.height // Player's top edge is below Creeper's bottom edge
        );

        console.log("🔍 Collision check:", isColliding);

        return isColliding;
      }

      function growCreeper(creeper) {
        const maxScaleFactor = 10; // Define a maximum scale factor to prevent infinite growth

        console.log("📏 Current scale factor:", creeper.SCALE_FACTOR);

        // Increase the scale factor by 1 if not at maximum
        if (creeper.SCALE_FACTOR < maxScaleFactor) {
          creeper.SCALE_FACTOR += 1;
          console.log("✅ Scale factor incremented to:", creeper.SCALE_FACTOR);

          // Update the creeper's width and height based on the new scale factor
          creeper.width = creeper.pixels.width * creeper.SCALE_FACTOR;
          creeper.height = creeper.pixels.height * creeper.SCALE_FACTOR;

          console.log("➡️ Updated size:", creeper.width, creeper.height);
        } else {
          console.log("⚠️ Scale factor already at maximum:", creeper.SCALE_FACTOR);
        }
      }

    // Canvas-based game loop
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');

    function gameLoop() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw player
      context.fillStyle = "blue";
      context.fillRect(sprite_data_chillguy.x, sprite_data_chillguy.y, sprite_data_chillguy.width, sprite_data_chillguy.height);

      // Draw creeper using updated width and height based on SCALE_FACTOR
      const creeperDrawWidth = sprite_data_creeper.width; // Use updated width
      const creeperDrawHeight = sprite_data_creeper.height; // Use updated height

      context.fillStyle = "green";
      context.fillRect(sprite_data_creeper.x, sprite_data_creeper.y, creeperDrawWidth, creeperDrawHeight);

      console.log("🖌️ Drawing creeper with size:", creeperDrawWidth, creeperDrawHeight);

      // Check for collision
      if (checkCollision(sprite_data_chillguy, sprite_data_creeper)) {
        growCreeper(sprite_data_creeper);
      }

      requestAnimationFrame(gameLoop);
    }

    // Debugging: Ensure the correct object is being modified
    console.log("Initial Creeper Object:", sprite_data_creeper);

    // Start the game loop
    requestAnimationFrame(gameLoop);

    // List of objects definitions for this level
    this.classes = [
      { class: Background, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_creeper },
    ];
    
  }

}

export default GameLevelDesert;