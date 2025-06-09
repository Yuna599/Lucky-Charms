// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import GameLevelGym from './GameLevelGym.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';
import DialogueSystem from './DialogueSystem.js'; // Ensure DialogueSystem is imported
import Unicorn from './Unicorn.js'; // Ensure Unicorn is imported
class GameLevelDesert {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Bind restartGame to the class instance
    this.restartGame = () => {
      console.log("Restarting game...");
      this.gameEnv.gameControl.transitionToLevel(GameLevelDesert);
    };

    // Bind restartGame globally for use in dyingAnimation
    window._restartDesertGame = this.restartGame;

    // Background data
    const image_src_desert = path + "/images/gamify/disneyland.png";
    const image_src_gym = path + "/images/gamify/gym.png";
    let image_data_desert = {
      name: 'desert',
      greeting: "Welcome to the desert! It is hot and dry here, but there are many adventures to be had!",
      src: image_src_desert,
      pixels: { height: 580, width: 1038 }
    };
    const original_image_data_desert = { ...image_data_desert };

    function updateBackground(src) {
      let backgroundElement = document.getElementById("background");
      if (!backgroundElement) {
        // Create the background element if it doesn't exist
        backgroundElement = document.createElement("div");
        backgroundElement.id = "background";
        backgroundElement.style.position = "absolute";
        backgroundElement.style.top = "0";
        backgroundElement.style.left = "0";
        backgroundElement.style.width = "100%";
        backgroundElement.style.height = "100%";
        backgroundElement.style.zIndex = "-1"; // Ensure it is behind other elements
        document.body.appendChild(backgroundElement);
      }
      backgroundElement.style.backgroundImage = `url(${src})`;
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

    // Parallax effect
    function applyParallax() {
      const backgroundElement = document.getElementById("background");
      if (!backgroundElement) {
        console.error("Background element not found!");
        return;
      }

      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        backgroundElement.style.backgroundPositionY = `${scrollPosition * 0.5}px`; // Adjust parallax speed
      });

      window.addEventListener("mousemove", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        backgroundElement.style.backgroundPosition = `${mouseX * 0.05}px ${mouseY * 0.05}px`; // Adjust parallax speed
      });
    }

    // Initialize parallax
    applyParallax();

    // Player data for Chillguy
    const sprite_src_chillguy = path + "/images/gamify/pixilart.png";
    const CHILLGUY_SCALE_FACTOR = 5;
    let currentDirection = 'down';

    const sprite_data_chillguy = {
      id: 'Chill Guy',
      greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
      src: sprite_src_chillguy,
      SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
      STEP_FACTOR: 100,
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
      dyingAnimation: function () {
        const playerElement = document.getElementById(this.id);
        if (playerElement) {
          playerElement.style.transition = "opacity 1s ease-out";
          playerElement.style.opacity = "0"; // Fade out the player
          setTimeout(() => {
            playerElement.remove();

            // Call the bound restart method
            if (typeof window._restartDesertGame === "function") {
              window._restartDesertGame();
            } else {
              console.warn("Restart method not bound.");
            }
          }, 1000); // Wait for the animation to complete
        }
      }
    };

    // NPC data for unicorn
    const sprite_src_unicorn = path + "/images/gamify/image.png"; // Ensure the path is correct
    const sprite_greet_unicorn = "KABOOM!!";
    const sprite_data_unicorn = {
        id: 'Unicorn',
        greeting: sprite_greet_unicorn,
        src: sprite_src_unicorn,
        SCALE_FACTOR: 4, // Starting scale factor is 4ling needs
        ANIMATION_RATE: 500,
        pixels: {height: 500, width: 500},
        INIT_POSITION: { x: 100, y: 100 },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        right: {row: 0, start: 0, columns: 1 },
        left: {row: 0, start: 0, columns: 1 },
        up: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        walkingArea: {
          xMin: width / 10,
          xMax: (width * 5 / 7),
          yMin: height / 4,
          yMax: (height * 8 / 15)
        },
        speed: 10,
        direction: { x: 1, y: 1 },
  
        updatePosition: function () {
          this.INIT_POSITION.x += this.direction.x * this.speed;
          this.INIT_POSITION.y += this.direction.y * this.speed;
  
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
  
          // Update DOM element if present
          const spriteElement = document.getElementById(this.id);
          if (spriteElement) {
            spriteElement.style.transform = this.direction.x === -1 ? "scaleX(-1)" : "scaleX(1)";
            spriteElement.style.left = this.INIT_POSITION.x + 'px';
            spriteElement.style.top = this.INIT_POSITION.y + 'px';
          }
        },
        isAnimating: false,
        sound: new Audio("../assets/audio/shine.mp3"), // Optional sound setup
  
        playAnimation: function () {
          if (this.isAnimating) return;
          this.isAnimating = true;
  
          const spriteElement = document.getElementById(this.id);
          if (!spriteElement) {
            this.isAnimating = false;
            return;
          }
  
          try {
            // 🌟 Apply glow effect
            spriteElement.style.transition = "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out";
            spriteElement.style.boxShadow = "0 0 30px 15px rgba(255, 255, 255, 0.7)";
            spriteElement.style.transform = "scale(1.05)";
  
            // 🎆 Create shimmer particles
            const particleCount = 20;
            for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement('div');
              particle.className = 'shine-particle';
  
              const angle = Math.random() * 2 * Math.PI;
              const distance = 50 + Math.random() * 30;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
  
              document.body.appendChild(particle);
  
              requestAnimationFrame(() => {
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = 0;
              });
  
              setTimeout(() => {
                particle.remove();
              }, 1000);
            }
  
            // Play sound if defined
            if (this.sound) {
              this.sound.play().catch((error) => {
                console.warn("Sound playback failed:", error);
              });
            }
  
            // Reset glow effect
            setTimeout(() => {
              spriteElement.style.boxShadow = "none";
              spriteElement.style.transform = "scale(1)";
              this.isAnimating = false;
            }, 1000);
          } catch (error) {
            console.error("Error in playAnimation:", error);
            this.isAnimating = false;
          }
        }
      };
  
      
    // Schedule unicorn movement updates every 100ms
    setInterval(() => {
      sprite_data_unicorn.updatePosition();
    }, 100);

    // ✨ Trigger shimmer periodically
    setInterval(() => {
      sprite_data_unicorn.playAnimation();
    }, 5000);


    // Add Employee NPC data
    const sprite_src_employee = path + "/images/gamify/employee.png"; // Ensure the path is correct
    const sprite_greet_employee = "Hello! How can I help you? The path to the gym is the door of the castle on the left!";
    const sprite_data_employee = {
      id: 'Employee',
      greeting: sprite_greet_employee,
      src: sprite_src_employee,
      SCALE_FACTOR: 4, // Starting scale factor
      ANIMATION_RATE: 100,
      pixels: { height: 500, width: 500 },
      INIT_POSITION: { x: 800, y: 235 }, // Position of the Employee NPC
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },

      // Interaction logic
      interact: () => {
        // Create the conversation modal
        const modal = document.createElement("div");
        modal.id = "employee-conversation-modal";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.width = "400px";
        modal.style.padding = "20px";
        modal.style.backgroundColor = "#fff";
        modal.style.borderRadius = "10px";
        modal.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
        modal.style.textAlign = "center";
        modal.style.zIndex = "1000"; // Ensure it appears above other elements

        // Add the greeting text
        const greetingText = document.createElement("p");
        greetingText.innerText = sprite_greet_employee; // Use the greeting from the object
        greetingText.style.fontSize = "18px";
        greetingText.style.marginBottom = "20px";
        modal.appendChild(greetingText);

        // Add the "Okay!" button
        const okayButton = document.createElement("button");
        okayButton.innerText = "Okay!";
        okayButton.style.padding = "10px 20px";
        okayButton.style.margin = "10px";
        okayButton.style.backgroundColor = "#4CAF50";
        okayButton.style.color = "white";
        okayButton.style.border = "none";
        okayButton.style.borderRadius = "5px";
        okayButton.style.cursor = "pointer";
        okayButton.addEventListener("click", () => {
          modal.remove(); // Remove the modal when clicked
        });
        modal.appendChild(okayButton);

        // Add the "Thanks!" button
        const thanksButton = document.createElement("button");
        thanksButton.innerText = "Thanks!";
        thanksButton.style.padding = "10px 20px";
        thanksButton.style.margin = "10px";
        thanksButton.style.backgroundColor = "#FF5722";
        thanksButton.style.color = "white";
        thanksButton.style.border = "none";
        thanksButton.style.borderRadius = "5px";
        thanksButton.style.cursor = "pointer";
        thanksButton.addEventListener("click", () => {
          modal.remove(); // Remove the modal when clicked
        });
        modal.appendChild(thanksButton);

        // Append the modal to the page
        document.body.appendChild(modal);
      },
    };

    // Define sprite_data_door before validation
    const sprite_src_door = path + "/images/gamify/door.png";
    const sprite_greet_door = "Go through the door to enter the gym!";
    const sprite_data_door = {
        id: 'Door',
        greeting: sprite_greet_door,
        src: sprite_src_door,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 100,
        pixels: { width: 1024, height: 1024 },
        INIT_POSITION: { x: (width * 1 / 10), y: (height * 1 / 2) }, // Moved more to the left
        orientation: { rows: 1, columns: 1 },
        down: { row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Add dialogues array for random messages
        dialogues: [
            "Go through the door to enter the gym!",
            "The gym is just through this door!",
        ],
        reaction: function() {
            // Don't show any reaction dialogue - this prevents the first alert
            // The interact function will handle all dialogue instead
        },
        interact: function () {
          if (!this.dialogueSystem) {
            this.dialogueSystem = new DialogueSystem(); // Initialize DialogueSystem
          }
      
          this.dialogueSystem.showDialogue(
            "Do you want to enter the gym?",
            this.greeting,
            this.src
          );
      
          this.dialogueSystem.addButtons([
            {
              text: "Yes",
              primary: true,
              action: () => {
                this.dialogueSystem.closeDialogue();
                // Transition to gym.html
                window.location.href = "../gym.html"; // Ensure gym.html only loads GameLevelGym
              }
            },
            {
              text: "No",
              action: () => {
                this.dialogueSystem.closeDialogue();
              }
            }
          ]);
        }
    }

  
    function checkCollision(player, npc) {
      const playerRect = {
        x: player.x,
        y: player.y,
        width: player.width,
        height: player.height
      };
      const npcRect = {
        x: npc.INIT_POSITION.x,
        y: npc.INIT_POSITION.y,
        width: npc.pixels.width / npc.SCALE_FACTOR,
        height: npc.pixels.height / npc.SCALE_FACTOR
      };

      return (
        playerRect.x < npcRect.x + npcRect.width &&
        playerRect.x + playerRect.width > npcRect.x &&
        playerRect.y < npcRect.y + npcRect.height &&
        playerRect.y + playerRect.height > npcRect.y
      );
    }

    function gameLoop() {
      if (!this || !this.gameEnv) {
        console.error("gameEnv is undefined or 'this' is not bound correctly. Ensure it is properly initialized.");
        return;
      }

      // Check collision between player and unicorn
      if (checkCollision(sprite_data_chillguy, sprite_data_unicorn)) {
        const playerObj = this.gameEnv.gameObjects.find(obj => obj.spriteData?.id === 'Chill Guy');
        if (playerObj && typeof playerObj.handleDeath === 'function') {
          playerObj.handleDeath(); // Trigger player death logic
        }
      }

      requestAnimationFrame(gameLoop.bind(this)); // Ensure proper binding of `this`
    }

    // Ensure the game loop is properly bound and started
    gameLoop.call(this);

    // Validate sprite sources after all definitions
    this.validateSpriteSource(sprite_data_chillguy);
    this.validateSpriteSource(sprite_data_unicorn);
    this.validateSpriteSource(sprite_data_employee);
    this.validateSpriteSource(sprite_data_door)

    // Ensure classes is properly defined
    this.classes = [
      { class: Background, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Unicorn, data: sprite_data_unicorn },
      { class: Npc, data: sprite_data_employee },
      { class: Npc, data: sprite_data_door }
    ];

    // Start Unicorn position updates
    setInterval(() => {
      sprite_data_unicorn.updatePosition();
    }, 100);
  }

  // Define validateSpriteSource function as a class method
  validateSpriteSource(spriteData) {
    const img = new Image();
    img.src = spriteData.src;
    img.onerror = () => {
      console.error(`Sprite sheet for ${spriteData.id} is not loaded or is in a broken state.`);
      spriteData.src = ""; // Reset the source to prevent further errors
    };
  }

  handleCollisionEvent() {
    const player = this.gameEnv.gameObjects.find(obj => obj instanceof Player);
    if (player && player.id === this.collisionData.touchPoints.other.id) {
        console.log("Unicorn collided with player!");

        // Stop movement
        this.velocity.x = 0;
        this.velocity.y = 0;

        // Explode player object with animation
        this.explode(player.position.x, player.position.y);
        player.destroy();
        this.playerDestroyed = true;

        // Restart the game after explosion animation
        setTimeout(() => {
            console.log("Restarting the game...");
            this.gameEnv.gameControl.currentLevel.destroy(); // Destroy the current level
            const newGameLevel = new GameLevelDesert(this.gameEnv); // Create a new instance
            newGameLevel.initialize(); // Initialize the new game level
        }, 2000); // Adjust delay based on explosion animation duration
    }
  }
}

export default GameLevelDesert;