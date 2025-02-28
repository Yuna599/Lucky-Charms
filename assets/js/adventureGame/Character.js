import GameObject from './GameObject.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate
const INIT_POSITION = { x: 0, y: 0 };

/**
 * Character is a dynamic class that manages the data and events for objects like player and NPCs.
 * 
 * The focus of this class is to handle the object's state, rendering, and key events.
 * 
 * This class uses a classic Java class pattern which is nice for managing object data and events.
 * 
 * The classic Java class pattern provides a structured way to define the properties and methods
 * associated with the object. This approach helps encapsulate the object's state and behavior,
 * making the code more modular and easier to maintain. By using this pattern, we can create
 * multiple instances of the Player class, each with its own state and behavior.
 * 
 * @property {Object} position - The current position of the object.
 * @property {Object} velocity - The current velocity of the object.
 * @property {Object} scale - The scale of the object based on the game environment.
 * @property {number} size - The size of the object.
 * @property {number} width - The width of the object.
 * @property {number} height - The height of the object.
 * @property {number} xVelocity - The velocity of the object along the x-axis.
 * @property {number} yVelocity - The velocity of the object along the y-axis.
 * @property {Image} spriteSheet - The sprite sheet image for the object.
 * @property {number} frameIndex - The current frame index for animation.
 * @property {number} frameCount - The total number of frames for each direction.
 * @property {Object} spriteData - The data for the sprite sheet.
 * @property {number} frameCounter - Counter to control the animation rate.
 * @method draw - Draws the object on the canvas.
 * @method update - Updates the object's position and ensures it stays within the canvas boundaries.
 * @method resize - Resizes the object based on the game environment.
 * @method destroy - Removes the object from the game environment.    
 */
class Character extends GameObject {
    /**
     * The constructor method is called when a new Player object is created.
     * 
     * @param {Object|null} data - The sprite data for the object. If null, a default red square is used.
     */
    constructor(data, gameEnv) {
        super(gameEnv);
        console.log('Character initialized with data:', data);
        console.log('Game environment:', gameEnv);
        this.data = data;
        this.state = {
            ...this.state,
            animation: 'idle',
            direction: 'right',
            isDying: false,
            isFinishing: false,
        }; // Object control data

        // Create canvas element
        this.canvas = document.createElement("canvas");
        this.canvas.id = data.id || "default";
        this.canvas.width = data.pixels?.width || 0;
        this.canvas.height = data.pixels?.height || 0;
        this.hitbox = data?.hitbox || {};
        this.ctx = this.canvas.getContext('2d');
        document.getElementById("gameContainer").appendChild(this.canvas);

        // Set initial object properties 
        this.x = 0;
        this.y = 0;
        this.frame = 0;
        
        // Initialize the object's scale based on the game environment
        this.scale = { width: this.gameEnv.innerWidth, height: this.gameEnv.innerHeight };
        
        // Check if sprite data is provided
        if (data && data.src) {
            this.scaleFactor = data.SCALE_FACTOR || SCALE_FACTOR;
            this.stepFactor = data.STEP_FACTOR || STEP_FACTOR;
            this.animationRate = data.ANIMATION_RATE || ANIMATION_RATE;
            this.position = data.INIT_POSITION || INIT_POSITION;
    
            // Load the sprite sheet
            this.spriteSheet = new Image();
            this.spriteSheet.src = data.src;

            // Initialize animation properties
            this.frameIndex = 0; // index reference to current frame
            this.frameCounter = 0; // count each frame rate refresh
            this.direction = 'down'; // Initial direction
            this.spriteData = data;
        } else {
            throw new Error('Sprite data is required');
        }

        // Initialize the object's position and velocity
        this.velocity = { x: 0, y: 0 };

        // Set the initial size and velocity of the object
        this.resize();

        this.spriteData = data;
        this.image = new Image();
        this.image.src = data.src;
        this.image.onload = () => {
            console.log('Image loaded:', data.src);
        };
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = data.ANIMATION_RATE || 0;
        this.numberOfFrames = (data.orientation && data.orientation.columns) || 1;
    }


    /**
     * Manages the object's look, state, and movement. 
     * 
     */
    update() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames;
        }
        this.draw();
    }


    /**
     * Draws the object on the canvas.
     * 
     * This method renders the object using the sprite sheet if provided, otherwise a red square.
     */
    draw() {
        const ctx = this.gameEnv.ctx;
        const width = (this.spriteData.pixels && this.spriteData.pixels.width) / (this.spriteData.orientation?.columns || 1);
        const height = (this.spriteData.pixels && this.spriteData.pixels.height) / (this.spriteData.orientation?.rows || 1);
        const x = this.position.x;
        const y = this.position.y;
        const row = this.spriteData[this.direction]?.row || 0;
        const column = this.frameIndex;

        if (this.image) {
            ctx.drawImage(
                this.image,
                column * width,
                row * height,
                width,
                height,
                x,
                y,
                width,
                height
            );
            console.log('Drawing character at:', x, y, 'with size:', width, height);
        } else {
            console.error('Image not loaded for character:', this.spriteData.id);
        }
    }


    /**
     * Move the object and ensures it stays within the canvas boundaries.
     * 
     * This method changes the object's position based on its velocity and ensures that the object
     * stays within the boundaries of the canvas.
     */
    move() {
        console.log('Moving character with velocity:', this.velocity);
        // Update or change position according to velocity events
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Ensure the object stays within the canvas boundaries
        // Bottom of the canvas
        if (this.position.y + this.height > this.gameEnv.innerHeight) {
            this.position.y = this.gameEnv.innerHeight - this.height;
            this.velocity.y = 0;
        }
        // Top of the canvas
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
        // Right of the canvas
        if (this.position.x + this.width > this.gameEnv.innerWidth) {
            this.position.x = this.gameEnv.innerWidth - this.width;
            this.velocity.x = 0;
        }
        // Left of the canvas
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
    }
    

    /**
     * Resizes the object based on the game environment.
     * 
     * This method adjusts the object's size and velocity based on the scale of the game environment.
     * It also adjusts the object's position proportionally based on the previous and current scale.
     */
    resize() {
        console.log('Resizing character with new scale:', this.scale);
        // Calculate the new scale resulting from the window resize
        const newScale = { width: this.gameEnv.innerWidth, height: this.gameEnv.innerHeight };

        // Adjust the object's position proportionally
        this.position.x = (this.position.x / this.scale.width) * newScale.width;
        this.position.y = (this.position.y / this.scale.height) * newScale.height;

        // Update the object's scale to the new scale
        this.scale = newScale;

        // Recalculate the object's size based on the new scale
        this.size = this.scale.height / this.scaleFactor; 

        // Recalculate the object's velocity steps based on the new scale
        this.xVelocity = this.scale.width / this.stepFactor;
        this.yVelocity = this.scale.height / this.stepFactor;

        // Set the object's width and height to the new size (object is a square)
        this.width = this.size;
        this.height = this.size;
    }
    

    /* Destroy Game Object
     * remove canvas element of object
     * remove object from this.gameEnv.gameObjects array
     */
    destroy() {
        console.log('Destroying character');
        const index = this.gameEnv.gameObjects.indexOf(this);
        if (index !== -1) {
            // Remove the canvas from the DOM
            this.canvas.parentNode.removeChild(this.canvas);
            this.gameEnv.gameObjects.splice(index, 1);
        }
    }
    
}

export default Character;