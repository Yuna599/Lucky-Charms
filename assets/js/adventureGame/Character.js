import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

const SCALE_FACTOR = 25; 
const STEP_FACTOR = 100;
const ANIMATION_RATE = 5;
const INIT_POSITION = { x: 100, y: 100 }; // Start at a more central position
const GRAVITY = 0.5; // Gravity effect for jumps
const JUMP_STRENGTH = -10; // Jumping power

class Character extends GameObject {
    constructor(data = null) {
        super();
        this.state = {
            animation: 'idle',
            direction: 'right',
            isJumping: false,
            isGrounded: true,
            isDying: false,
            isFinishing: false,
        };

        this.element = document.getElementById(this.id);

    if (!this.element) {
        console.error(`Element with ID "${this.id}" not found.`);
    } else {
        console.log(`Character initialized with ID: ${this.element.id}`);
    }
    class Character {
        constructor(data) {
            if (!data || !data.id) {
                throw new Error("Character data with a valid ID is required");
            }
    
            this.id = data.id;
            this.name = data.name || "Unnamed";
            this.sprite = document.getElementById(this.id);
    
            if (!this.sprite) {
                console.error(`Element with ID '${this.id}' not found.`);
            }
        }
    }
    
        // Create canvas element for the character
        this.canvas = document.createElement("canvas");
        this.canvas.id = data.id || "default";
        this.canvas.width = data.pixels?.width || 0;
        this.canvas.height = data.pixels?.height || 0;
        this.ctx = this.canvas.getContext('2d');
        document.getElementById("gameContainer").appendChild(this.canvas);

    
        this.scaleFactor = data?.SCALE_FACTOR || SCALE_FACTOR;
        this.stepFactor = data?.STEP_FACTOR || STEP_FACTOR;
        this.animationRate = data?.ANIMATION_RATE || ANIMATION_RATE;
        this.position = { ...INIT_POSITION };

        // Load the sprite
        if (data?.src) {
            this.spriteSheet = new Image();
            this.spriteSheet.src = data.src;
        } else {
            throw new Error('Sprite data is required');
        }

        // Physics & Movement
        this.velocity = { x: 0, y: 0 };
        this.momentum = 0.9; // Helps slow down movement naturally
        this.gravity = GRAVITY;

        // Animation
        this.frameIndex = 0;
        this.frameCounter = 0;
        this.direction = 'right';
        this.spriteData = data;

        GameEnv.gameObjects.push(this);
        this.resize();
    }

    /** Handles movement with momentum */
    move(direction) {
        if (direction === 'left') {
            this.velocity.x = -this.xVelocity;
            this.direction = 'left';
        } else if (direction === 'right') {
            this.velocity.x = this.xVelocity;
            this.direction = 'right';
        } else if (direction === 'jump' && this.state.isGrounded) {
            this.velocity.y = JUMP_STRENGTH;
            this.state.isGrounded = false;
            this.state.isJumping = true;
        }
    }

    /** Draws the character with animation, shadow, and smooth movement */
    draw() {
        if (!this.spriteSheet) return;

        const ctx = this.ctx;
        const frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns;
        const frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;
        const directionData = this.spriteData[this.direction];

        const frameX = (directionData.start + this.frameIndex) * frameWidth;
        const frameY = directionData.row * frameHeight;

        this.canvas.width = frameWidth;
        this.canvas.height = frameHeight;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${this.position.x}px`;
        this.canvas.style.top = `${GameEnv.top + this.position.y}px`;

        // Clear and draw shadow
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 5;

        // Draw sprite
        ctx.drawImage(
            this.spriteSheet,
            frameX, frameY, frameWidth, frameHeight,
            0, 0, this.canvas.width, this.canvas.height
        );

        // Animate frame update
        this.frameCounter++;
        if (this.frameCounter % this.animationRate === 0) {
            this.frameIndex = (this.frameIndex + 1) % directionData.columns;
        }
    }

    /** Updates character movement and applies physics */
    update() {
        this.draw();
        this.collisionChecks();

        // Apply movement with momentum
        this.velocity.x *= this.momentum;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Apply gravity
        if (!this.state.isGrounded) {
            this.velocity.y += this.gravity;
        }

        // Keep character within game boundaries
        if (this.position.y + this.height > GameEnv.innerHeight) {
            this.position.y = GameEnv.innerHeight - this.height;
            this.velocity.y = 0;
            this.state.isGrounded = true;
        }
        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x + this.width > GameEnv.innerWidth) {
            this.position.x = GameEnv.innerWidth - this.width;
        }
    }

    /** Character grows as they level up */
    levelUp() {
        this.width *= 1.1; // Increase size
        this.height *= 1.1;
        this.xVelocity *= 1.05; // Move slightly faster
        this.yVelocity *= 1.05;
    }

    /** Resizes the character based on game environment */
    resize() {
        const newScale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

        this.position.x = (this.position.x / this.scale.width) * newScale.width;
        this.position.y = (this.position.y / this.scale.height) * newScale.height;

        this.scale = newScale;
        this.size = this.scale.height / this.scaleFactor;
        this.xVelocity = this.scale.width / this.stepFactor;
        this.yVelocity = this.scale.height / this.stepFactor;

        this.width = this.size;
        this.height = this.size;
    }

    /** Destroy the character */
    destroy() {
        const index = GameEnv.gameObjects.indexOf(this);
        if (index !== -1) {
            this.canvas.parentNode.removeChild(this.canvas);
            GameEnv.gameObjects.splice(index, 1);
        }
    }
}

export default Character;
