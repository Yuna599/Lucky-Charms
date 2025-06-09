import Character from './Character.js';
import DialogueSystem from './DialogueSystem.js'; // Ensure DialogueSystem is imported

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate
const INIT_POSITION = { x: 0, y: 0 };

class Player extends Character {
    /**
     * The constructor method is called when a new Player object is created.
     * 
     * @param {Object|null} data - The sprite data for the object. If null, a default red square is used.
     */
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.keypress = data?.keypress || {up: 87, left: 65, down: 83, right: 68};
        this.pressedKeys = {}; // active keys array
        this.bindMovementKeyListners();
        this.gravity = data?.GRAVITY || false;
        this.acceleration = 0.001;
        this.time = 0;
        this.moved = false;

        this.xVelocity = 5; // horizontal speed per frame
        this.yVelocity = 5; // vertical speed per frame

        this.gameEnv = gameEnv;
        this.dead = false;
        this.dialogueSystem = null; // Initialize dialogue system property
    }

    /**
     * Binds key event listeners to handle object movement.
     * 
     * This method binds keydown and keyup event listeners to handle object movement.
     * The .bind(this) method ensures that 'this' refers to the object object.
     */
    bindMovementKeyListners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown({ keyCode }) {
        // capture the pressed key in the active keys array
        this.pressedKeys[keyCode] = true;
        // set the velocity and direction based on the newly pressed key
        this.updateVelocityAndDirection();
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * 
     * @param {Object} event - The keyup event object.
     */
    handleKeyUp({ keyCode }) {
        // remove the lifted key from the active keys array
        if (keyCode in this.pressedKeys) {
            delete this.pressedKeys[keyCode];
        }
        // adjust the velocity and direction based on the remaining keys
        this.updateVelocityAndDirection();
    }

    /**
     * Update the player's velocity and direction based on the pressed keys.
     */
    updateVelocityAndDirection() {
        this.velocity.x = 0;
        this.velocity.y = 0;

        // Multi-key movements (diagonals: upLeft, upRight, downLeft, downRight)
        if (this.pressedKeys[this.keypress.up] && this.pressedKeys[this.keypress.left]) {
            this.velocity.y -= this.yVelocity;
            this.velocity.x -= this.xVelocity;
            this.direction = 'upLeft';
        } else if (this.pressedKeys[this.keypress.up] && this.pressedKeys[this.keypress.right]) {
            this.velocity.y -= this.yVelocity;
            this.velocity.x += this.xVelocity;
            this.direction = 'upRight';
        } else if (this.pressedKeys[this.keypress.down] && this.pressedKeys[this.keypress.left]) {
            this.velocity.y += this.yVelocity;
            this.velocity.x -= this.xVelocity;
            this.direction = 'downLeft';
        } else if (this.pressedKeys[this.keypress.down] && this.pressedKeys[this.keypress.right]) {
            this.velocity.y += this.yVelocity;
            this.velocity.x += this.xVelocity;
            this.direction = 'downRight';
        // Single key movements (left, right, up, down) 
        } else if (this.pressedKeys[this.keypress.up]) {
            this.velocity.y -= this.yVelocity;
            this.direction = 'up';
            this.moved = true;
        } else if (this.pressedKeys[this.keypress.left]) {
            this.velocity.x -= this.xVelocity;
            this.direction = 'left';
            this.moved = true;
        } else if (this.pressedKeys[this.keypress.down]) {
            this.velocity.y += this.yVelocity;
            this.direction = 'down';
            this.moved = true;
        } else if (this.pressedKeys[this.keypress.right]) {
            this.velocity.x += this.xVelocity;
            this.direction = 'right';
            this.moved = true;
        } else {
            this.moved = false;
        }
    }

    update() {
        super.update();
        if (!this.moved) {
            if (this.gravity) {
                this.time += 1;
                this.velocity.y += 0.5 + this.acceleration * this.time;
            }
        } else {
            this.time = 0;
        }
    }
    
    /**
     * Overrides the reaction to the collision to handle
     *  - clearing the pressed keys array
     *  - stopping the player's velocity
     *  - updating the player's direction   
     * @param {*} other - The object that the player is colliding with
     */
    handleCollisionReaction(other) {    
        this.pressedKeys = {};
        this.updateVelocityAndDirection();
        super.handleCollisionReaction(other);
    }

    // Handle player death
    handleDeath() {
        if (this.dead) return;
        this.dead = true;

        const spriteElement = document.getElementById(this.spriteData.id);
        if (spriteElement) {
            spriteElement.style.transition = "opacity 1s ease-out";
            spriteElement.style.opacity = "0";

            setTimeout(() => {
                spriteElement.remove();
                this.showRevivePrompt(); // Show revive prompt
            }, 1000);
        }
    }

    // Show revive prompt
    showRevivePrompt() {
        if (!this.dialogueSystem) {
            this.dialogueSystem = new DialogueSystem(); // Initialize DialogueSystem
        }

        this.dialogueSystem.showDialogue(
            "You have perished in the desert... Want to revive?",
            "Revival",
            this.spriteData.src
        );

        this.dialogueSystem.addButtons([
            {
                text: "Yes",
                primary: true,
                action: () => {
                    this.revive();
                    this.dialogueSystem.closeDialogue();
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

    // Revive the player
    revive() {
        this.dead = false;

        // Remove the old player (this) from game objects
        this.gameEnv.gameObjects = this.gameEnv.gameObjects.filter(obj => obj !== this);

        // Reset position
        this.spriteData.INIT_POSITION = { x: 50, y: this.gameEnv.innerHeight - 200 };

        // Ensure the ID is unique and DOM-safe
        this.spriteData.id = 'chill-guy';

        // Create a new DOM element for the revived player
        const revivedPlayer = new Player(this.spriteData, this.gameEnv);

        // Add to game environment
        this.gameEnv.gameObjects.push(revivedPlayer);

        // Re-render manually if necessary (GameControl may not call update immediately)
        if (typeof revivedPlayer.draw === "function") {
            revivedPlayer.draw();
        }

        // Optionally, reset movement state
        revivedPlayer.pressedKeys = {};
        revivedPlayer.updateVelocityAndDirection();

        console.log("Player revived:", revivedPlayer);
    }
}

export default Player;
