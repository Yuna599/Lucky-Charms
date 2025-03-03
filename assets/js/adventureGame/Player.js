import Character from './Character.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate
const INIT_POSITION = { x: 0, y: 0 };

/**
 * Player is a dynamic class that manages the data and events for objects like a player 
 * 
 * This class uses a classic Java class pattern which is nice for managing object data and events.

 * @method bindEventListeners - Binds key event listeners to handle object movement.
 * @method handleKeyDown - Handles key down events to change the object's velocity.
 * @method handleKeyUp - Handles key up events to stop the object's velocity.
 */
class Player {
    /**
     * The constructor method is called when a new Player object is created.
     * 
     * @param {Object|null} data - The sprite data for the object. If null, a default red square is used.
     */
    constructor(data, gameEnv) {
        this.gameEnv = gameEnv;
        this.data = data;
        this.image = new Image();
        this.image.src = data.src;
        this.image.onload = () => {
            console.log('Player image loaded:', data.src);
        };
<<<<<<< HEAD
        this.image.onerror = () => {
            console.error('Failed to load player image:', data.src);
        };
        this.position = data.INIT_POSITION;
        this.scaleFactor = data.SCALE_FACTOR;
        this.stepFactor = data.STEP_FACTOR;
        this.animationRate = data.ANIMATION_RATE;
        this.orientation = data.orientation;
        this.keypress = data.keypress;
        this.currentFrame = 0;
        this.currentDirection = 'down';
        this.hitbox = data.hitbox;
        this.pixels = data.pixels;

        window.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    handleKeydown(event) {
        switch (event.keyCode) {
            case this.keypress.up:
                this.move('up');
                break;
            case this.keypress.down:
                this.move('down');
                break;
            case this.keypress.left:
                this.move('left');
                break;
            case this.keypress.right:
                this.move('right');
                break;
=======
        super(aliSpriteData, gameEnv);
        this.xVelocity = STEP_FACTOR; // Set the horizontal movement speed
        this.yVelocity = STEP_FACTOR; // Set the vertical movement speed

        this.keypress = aliSpriteData.keypress;
        this.pressedKeys = {}; // active keys array
        this.bindMovementKeyListeners();
        console.log('Player initialized with data:', aliSpriteData);
    }
    update() {
        // Update position based on velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    
        this.draw(); // Draw the updated player
    }
    
    /**
     * Binds key event listeners to handle object movement.
     * 
     * This method binds keydown and keyup event listeners to handle object movement.
     * The .bind(this) method ensures that 'this' refers to the object object.
     */
    bindMovementKeyListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
        console.log('Movement key listeners bound');
    }

    handleKeyDown({ keyCode }) {
        // capture the pressed key in the active keys array
        this.pressedKeys[keyCode] = true;
        // set the velocity and direction based on the newly pressed key
        this.updateVelocityAndDirection();
        console.log('Key down:', keyCode, 'Pressed keys:', this.pressedKeys);
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
>>>>>>> 5a3bf00 (something)
        }
    }

    move(direction) {
        this.currentDirection = direction;
        switch (direction) {
            case 'up':
                this.position.y -= this.stepFactor;
                break;
            case 'down':
                this.position.y += this.stepFactor;
                break;
            case 'left':
                this.position.x -= this.stepFactor;
                break;
            case 'right':
                this.position.x += this.stepFactor;
                break;
        }
    }

    draw() {
        const ctx = this.gameEnv.ctx;
        const frameWidth = this.pixels.width / this.orientation.columns;
        const frameHeight = this.pixels.height / this.orientation.rows;
        const frameX = this.currentFrame * frameWidth;
        const frameY = this.orientation[this.currentDirection].row * frameHeight;

        if (this.image.complete && this.image.naturalWidth !== 0) {
            ctx.drawImage(
                this.image,
                frameX, frameY, frameWidth, frameHeight,
                this.position.x, this.position.y,
                frameWidth / this.scaleFactor, frameHeight / this.scaleFactor
            );

            this.currentFrame = (this.currentFrame + 1) % this.orientation[this.currentDirection].columns;
        } else {
            console.error('Player image is not loaded or is in a broken state:', this.image.src);
        }
    }

    update() {
        this.draw();
    }
}
function gameLoop() {
    // Clear the canvas before drawing the next frame
    gameEnv.ctx.clearRect(0, 0, canvas.width, canvas.height); // This clears the canvas

    // Update and draw all game objects (Player, NPCs, etc.)
    gameObjects.forEach(gameObject => {
        gameObject.update(); // Make sure to call update() for both the player and NPCs
    });

    // Redraw the background (if moving)
    gameEnv.ctx.drawImage(backgroundImage, backgroundX, backgroundY);

    requestAnimationFrame(gameLoop); // Call next frame
}

export default Player;