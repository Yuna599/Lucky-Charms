// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import GameLevelGym from './GameLevelGym.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';
import DialogueSystem from './DialogueSystem.js'; // Ensure DialogueSystem is imported

class GameLevelDesert {
  constructor(gameEnv) {
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

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
            playerElement.remove(); // Remove the player element after animation
            restartGame();
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

        
          //walking area creates the box where the Shark can walk in 
          walkingArea: {
            xMin: width / 5, //left boundary
            xMax: (width * 3 / 5), //right boundary 
            yMin: height / 4, //top boundary 
            yMax: (height * 3 / 5) //bottom boundary
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
          const spriteElement = document.getElementById(this.id);
          if (spriteElement) { 
            spriteElement.style.transform = this.direction.x === -1 ? "scaleX(-1)" : "scaleX(1)";
            spriteElement.style.left = this.INIT_POSITION.x + 'px';
            spriteElement.style.top = this.INIT_POSITION.y + 'px'; // Update position of the shark sprite
          }
        },
        // Splash Animation
        // This function creates a splash animation when the shark moves
        isAnimating: false,
        playAnimation: function () {
          if (this.isAnimating) return;
          this.isAnimating = true;
        
          const spriteElement = document.getElementById(this.id);
          if (!spriteElement) return;
        
          const particleCount = 20;
        
          for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'splash-particle';
        
            particle.style.position = 'absolute';
            particle.style.left = `${spriteElement.offsetLeft + spriteElement.offsetWidth / 3}px`;
            particle.style.top = `${spriteElement.offsetTop + spriteElement.offsetHeight / 3}px`;
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = 'aqua';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = 1000;
            particle.style.opacity = 1;
            particle.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        
            // Animate outward
            const angle = Math.random() * 2 * Math.PI;
            const distance = 60 + Math.random() * 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
        
            document.body.appendChild(particle);
            requestAnimationFrame(() => {
              particle.style.transform = `translate(${x}px, ${y}px)`;
              particle.style.opacity = 0;
            });
        
            // Cleanup after animation
            setTimeout(() => {
              particle.remove();
            }, 1000);
          }
        
          setTimeout(() => {
            this.isAnimating = false;
          }, 1000);
        }
      };
      // Set intervals to update position and play animation  
      setInterval(() => {
        sprite_data_unicorn.updatePosition();
      }, 100);
      setInterval(() => {
        sprite_data_unicorn.playAnimation();
      }, 1000);

    function growUnicorn(unicorn) {
      unicorn.SCALE_FACTOR += 0.5; // Increase the scale factor
      unicorn.width = unicorn.pixels.width * unicorn.SCALE_FACTOR; // Update width
      unicorn.height = unicorn.pixels.height * unicorn.SCALE_FACTOR; // Update height

      const spriteElement = document.getElementById(unicorn.id);
      if (spriteElement) {
        spriteElement.style.width = `${unicorn.width}px`;
        spriteElement.style.height = `${unicorn.height}px`;
      }

      console.log(`Unicorn grew! New size: ${unicorn.width}x${unicorn.height}`);
    }

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

    // Define sprite_data_chickenj before validation
    const sprite_src_chickenj = path + "/images/gamify/robot.png";
    const sprite_greet_chickenj = "FOLLOW THAT CHICKEN JOCKEY. ( Press E )";
    const sprite_data_chickenj = {
        id: 'Chicken Jockey',
        greeting: sprite_greet_chickenj,
        src: sprite_src_chickenj,
        SCALE_FACTOR: 9,
        ANIMATION_RATE: 100,
        pixels: { width: 150, height: 255 },
        INIT_POSITION: { x: (width * 1 / 6), y: (height * 1 / 10) }, // Moved more to the left
        orientation: { rows: 1, columns: 1 },
        down: { row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Add dialogues array for random messages
        dialogues: [
            "BAWK BAWK BAWK BAWK BAWK?!?!?!?",
            "GRRRRRRRR!!",
            "I'm placing blocks and stuff cuz im in freaking minceraftttt",
            "BAWAKKKKK!",
            "You want to fight the chicken?",
            "CHICKEN JOCKEEEYYYY"
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
                "Do you follow the Chicken Jockey?",
                "Chicken Jockey",
                this.spriteData.src
            );
            
            // Add buttons directly to the dialogue
            this.dialogueSystem.addButtons([
                {
                    text: "Sure!",
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
                            
                            console.log("You walk after the Chicken Jockey...");
                            
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
                                    
                                    console.log("You walk after the Chicken Jockey...");
                                    
                                    // IMPORTANT: Store the original level classes for return journey
                                    gameControl._originalLevelClasses = gameControl.levelClasses;
                                    
                                    
                                    gameControl.levelClasses = [GameLevelGym];
                                    gameControl.currentLevelIndex = 0;
                                    
                                    // Make sure game is not paused
                                    gameControl.isPaused = false;
                                    
                                    // Start the End level with the same control
                                    console.log("You walk after the Chicken Jockey...");
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

    const sprite_src_robot = path + "/images/gamify/robot.png";
    const sprite_greet_robot = "Hi I am Robot, the Jupyter Notebook mascot. I am very happy to spend some linux shell time with you!";
    const sprite_data_robot = {
        id: 'Robot',
        greeting: sprite_greet_robot,
        src: sprite_src_robot,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 100,
        pixels: {height: 316, width: 627},
        INIT_POSITION: { x: (width * 3 / 4), y: (height * 1 / 4)},
        orientation: {rows: 3, columns: 6 },
        down: {row: 1, start: 0, columns: 6 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Add dialogues array for random messages
        dialogues: [
            "Jupyter Notebooks let you mix code, text, and visualizations.",
            "The name Jupyter comes from Julia, Python, and R - popular data science languages.",
            "Interactive computing makes data exploration so much more fun!",
            "I can help you analyze and visualize your data.",
            "Notebooks are perfect for data storytelling and sharing insights.",
            "Many scientists use me for reproducible research.",
            "Press Shift+Enter to run a cell in Jupyter Notebook.",
            "You can export notebooks to many formats, like HTML and PDF."
        ],
        reaction: function() {
            // Use dialogue system instead of alert
            if (this.dialogueSystem) {
                this.showReactionDialogue();
            } else {
                console.log(sprite_greet_robot);
            }
        },
        interact: function() {
            // KEEP ORIGINAL GAME-IN-GAME FUNCTIONALITY
            // Set a primary game reference from the game environment
            let primaryGame = gameEnv.gameControl;
            // Define the game in game level
            let levelArray = [GameLevelGym];
            // Define a new GameControl instance with the MeteorBlaster level
            let gameInGame = new GameControl(gameEnv.game, levelArray);
            // Pause the primary game 
            primaryGame.pause();
            // Start the game in game
            gameInGame.start();
            // Setup "callback" function to allow transition from game in game to the underlying game
            gameInGame.gameOver = function() {
                // Call .resume on primary game
                primaryGame.resume();
            }
        }
    };

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

    function restartGame() {
      window.location.reload(); // Reload the page to restart the game
    }

    function gameLoop() {
      // Check collision between player and unicorn
      if (checkCollision(sprite_data_chillguy, sprite_data_unicorn)) {
        console.log("Collision detected! Player is dying...");
        sprite_data_chillguy.dyingAnimation();
      }

      requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

    // Validate sprite sources after all definitions
    this.validateSpriteSource(sprite_data_chillguy);
    this.validateSpriteSource(sprite_data_unicorn);
    this.validateSpriteSource(sprite_data_employee);
    this.validateSpriteSource(sprite_data_chickenj);
    this.validateSpriteSource(sprite_data_robot);

    // Ensure classes is properly defined
    this.classes = [
      { class: Background, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_unicorn },
      { class: Npc, data: sprite_data_employee },
      { class: Npc, data: sprite_data_chickenj },
      { class: Npc, data: sprite_data_robot }
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
}

export default GameLevelDesert;