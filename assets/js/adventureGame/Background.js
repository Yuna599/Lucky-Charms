import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

/** Background class for primary background with parallax and smooth transitions */
export class Background extends GameObject {
    constructor(data = null) {
        super();
        this.image = data?.src ? new Image() : null;
        this.imageSrc = data?.src || null;
        this.opacity = 1; // Used for smooth transitions
        this.scrollOffset = 0; // Parallax effect offset
        GameEnv.gameObjects.push(this);

        if (this.imageSrc) {
            this.image.src = this.imageSrc;
        }
    }

    /** Smoothly switch to a new background */
    changeBackground(newSrc) {
        if (this.imageSrc !== newSrc) {
            this.imageSrc = newSrc;
            this.opacity = 0; // Start fade-in effect
            this.image = new Image();
            this.image.src = newSrc;
        }
    }

    /** Draws the background with parallax effect and smooth transitions */
    draw() {
        const ctx = GameEnv.ctx;
        const width = GameEnv.innerWidth;
        const height = GameEnv.innerHeight;

        // Apply parallax effect (moves background slightly as player moves)
        this.scrollOffset -= 0.1; // Adjust this value for stronger/weaker effect

        if (this.image) {
            ctx.globalAlpha = this.opacity; // Apply fade-in effect
            ctx.drawImage(this.image, this.scrollOffset, 0, width, height);
            ctx.globalAlpha = 1; // Reset transparency
        } else {
            // Default gradient sky if no image is set
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#87CEEB'); // Light blue sky
            gradient.addColorStop(1, '#1E90FF'); // Deep blue

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        // Gradually increase opacity for smooth transitions
        if (this.opacity < 1) {
            this.opacity += 0.02; // Adjust speed of transition
        }
    }

    /** Updates the background, including parallax scrolling */
    update() {
        this.draw();
    }

    /** Resize handler */
    resize() {
        this.draw();
    }

    /** Destroy Game Object: remove from GameEnv */
    destroy() {
        const index = GameEnv.gameObjects.indexOf(this);
        if (index !== -1) {
            GameEnv.gameObjects.splice(index, 1);
        }
    }
}

export default Background;
