// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import GameLevelGym from './GameLevelGym.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';

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

    // NPC data for creeper
    const sprite_src_creeper = path + "/images/gamify/octocat.png"; // Ensure the path is correct
    const sprite_greet_creeper = "KABOOM!!";
    const sprite_data_creeper = {
        id: 'Creeper',
        greeting: sprite_greet_creeper,
        src: sprite_src_creeper,
        SCALE_FACTOR: 4, // Starting scale factor is 4ling needs
        ANIMATION_RATE: 500,
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

        speed : 20,
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

      function checkCollision(player, npc) {
        if (!player || !npc) {
          console.log("Player or NPC is undefined.");
          return false;
        }

        // Calculate collision based on positions and dimensions
        const isColliding = !(
          player.x + player.width <= npc.INIT_POSITION.x || // Player's right edge is left of NPC's left edge
          player.x >= npc.INIT_POSITION.x + npc.pixels.width * npc.SCALE_FACTOR || // Player's left edge is right of NPC's right edge
          player.y + player.height <= npc.INIT_POSITION.y || // Player's bottom edge is above NPC's top edge
          player.y >= npc.INIT_POSITION.y + npc.pixels.height * npc.SCALE_FACTOR // Player's top edge is below NPC's bottom edge
        );

        return isColliding;
      }

      function growCreeper(creeper) {
        const maxScaleFactor = 10; // Define a maximum scale factor to prevent infinite growth

        console.log(" Current scale factor:", creeper.SCALE_FACTOR);

        // Increase the scale factor by 1 if not at maximum
        if (creeper.SCALE_FACTOR < maxScaleFactor) {
          creeper.SCALE_FACTOR += 1;
          console.log(" Scale factor incremented to:", creeper.SCALE_FACTOR);

          // Update the creeper's width and height based on the new scale factor
          creeper.width = creeper.pixels.width * creeper.SCALE_FACTOR;
          creeper.height = creeper.pixels.height * creeper.SCALE_FACTOR;

          console.log(" Updated size:", creeper.width, creeper.height);
        } else {
          console.log(" Scale factor already at maximum:", creeper.SCALE_FACTOR);
        }
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

    // Add event listener for interaction (pressing 'E')
    window.addEventListener("keydown", (event) => {
      if (event.key === "E" || event.key === "e") {
        // Check if the player is near the Employee NPC
        if (checkCollision(sprite_data_chillguy, sprite_data_employee)) {
          sprite_data_employee.interact(); // Trigger the interaction
        }
      }
    });

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

      console.log(" Drawing creeper with size:", creeperDrawWidth, creeperDrawHeight);

      // Draw Employee NPC
      context.fillStyle = "yellow";
      context.fillRect(
        sprite_data_employee.INIT_POSITION.x,
        sprite_data_employee.INIT_POSITION.y,
        sprite_data_employee.pixels.width * sprite_data_employee.SCALE_FACTOR,
        sprite_data_employee.pixels.height * sprite_data_employee.SCALE_FACTOR
      );

      // Check for collision with Creeper
      if (checkCollision(sprite_data_chillguy, sprite_data_creeper)) {
        growCreeper(sprite_data_creeper);
      }

      requestAnimationFrame(gameLoop);
    }

    // Debugging: Ensure the correct object is being modified
    console.log("Initial Creeper Object:", sprite_data_creeper);
    const sprite_src_endportal = path + "/images/gamify/computer.png";
    const sprite_greet_endportal = "Teleport to the End? Press E";
    const sprite_data_endportal = {
        id: 'End Portal',
        greeting: sprite_greet_endportal,
        src: sprite_src_endportal,
        SCALE_FACTOR: 6,
        ANIMATION_RATE: 100,
        pixels: {width: 521, height: 479},
        INIT_POSITION: { x: (width * 2 / 5), y: (height * 1 / 10)},
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Add dialogues array for random messages
        dialogues: [
            "The End dimension awaits brave explorers.",
            "Through this portal lies a realm of floating islands and strange creatures.",
            "The Enderman guards ancient treasures. Who knows what else lurks beyond this portal?",
            "Many have entered. Few have returned.",
            "The void calls to you. Will you answer?",
            "The End is not truly the end, but a new beginning.",
            "Strange things await you beyond this portal..",
            "Prepare yourself. The journey beyond won't be easy."
        ],
        
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
                "Do you wish to enter The End dimension?",
                "End Portal",
                this.spriteData.src
            );
            
            // Add buttons directly to the dialogue
            this.dialogueSystem.addButtons([
                {
                    text: "Enter Portal",
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
                            
                            console.log("Starting End level transition...");
                            
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
                                    
                                    console.log("Setting up End level...");
                                    
                                    // IMPORTANT: Store the original level classes for return journey
                                    gameControl._originalLevelClasses = gameControl.levelClasses;
                                    
                                    // Change the level classes to GameLevelEnd
                                    gameControl.levelClasses = [GameLevelEnd];
                                    gameControl.currentLevelIndex = 0;
                                    
                                    // Make sure game is not paused
                                    gameControl.isPaused = false;
                                    
                                    // Start the End level with the same control
                                    console.log("Transitioning to End level...");
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
        
    window.addEventListener("keydown", (event) => {
      if (event.key === "E" || event.key === "e") {
        // Check if the player is near the Employee NPC
        if (checkCollision(sprite_data_chillguy, sprite_data_endportal)) {
          sprite_data_employee.interact(); // Trigger the interaction
        }
      }
    });
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
    // Add Employee NPC to the list of objects for this level
    this.classes = [
      { class: Background, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_creeper },
      { class: Npc, data: sprite_data_employee },
      { class: Npc, data: sprite_data_robot}
    ];

    // Start the game loop
    requestAnimationFrame(gameLoop);
  }

}

export default GameLevelDesert;