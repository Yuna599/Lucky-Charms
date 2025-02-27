/**
 * GameEnv manages the game's environment, including the canvas, game area dimensions,
 * and level settings. It ensures the game scales correctly and adapts to different 
 * locations (Disneyland and Gym).
 *
 * @class GameEnv
 */

class GameEnv {
    static gameObjects = [];
    static currentLevel = "Disneyland"; // Default level
    static canvas;
    static ctx;
    static innerWidth;
    static innerHeight;
    static top;
    static bottom;
    
    /**
     * Prevents instantiation of this static class.
     */
    constructor() {
        throw new Error("GameEnv is a static class and cannot be instantiated.");
    }

    /**
     * Initializes the game environment by setting up the canvas and calculating dimensions.
     */
    static create() {
        this.setCanvas();
        this.calculateDimensions();
        this.updateEnvironment();
    }

    /**
     * Sets up the canvas element and its 2D rendering context.
     */
    static setCanvas() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
    }

    /**
     * Calculates the game area dimensions considering header and footer heights.
     */
    static calculateDimensions() {
        this.setTop();
        this.setBottom();
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight - this.top - this.bottom;
        this.resizeCanvas();
    }

    /**
     * Retrieves the header height and sets the top offset.
     */
    static setTop() {
        const header = document.querySelector("header");
        this.top = header ? header.offsetHeight : 0;
    }

    /**
     * Retrieves the footer height and sets the bottom offset.
     */
    static setBottom() {
        const footer = document.querySelector("footer");
        this.bottom = footer ? footer.offsetHeight : 0;
    }

    /**
     * Resizes the canvas to match the calculated dimensions.
     */
    static resizeCanvas() {
        this.canvas.width = this.innerWidth;
        this.canvas.height = this.innerHeight;
        this.canvas.style.width = `${this.innerWidth}px`;
        this.canvas.style.height = `${this.innerHeight}px`;
        this.canvas.style.position = "absolute";
        this.canvas.style.left = "0px";
        this.canvas.style.top = `${this.top}px`;
    }

    /**
     * Updates the game environment based on the current level.
     */
    static updateEnvironment() {
        if (this.currentLevel === "Disneyland") {
            document.body.style.backgroundImage = "url('http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/IMG_7640.png')";
        } else if (this.currentLevel === "Gym") {
            document.body.style.backgroundImage = "url('http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/IMG_7848.png')";
        }
    }

    /**
     * Switches the game level and updates the environment accordingly.
     * @param {string} level - The new level to switch to (Disneyland or Gym).
     */
    static switchLevel(level) {
        if (level === "Disneyland" || level === "Gym") {
            this.currentLevel = level;
            this.updateEnvironment();
        } else {
            console.error("Invalid level specified:", level);
        }
    }

    /**
     * Handles window resizing by recalculating dimensions.
     */
    static resize() {
        this.calculateDimensions();
    }

    /**
     * Clears the canvas for the next frame.
     */
    static clear() {
        this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
    }
}

// Ensure the game environment updates on window resize
window.addEventListener("resize", () => GameEnv.resize());

export default GameEnv;
