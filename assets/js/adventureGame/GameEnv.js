/**
 * GameEnv is a static class that manages the game environment.
 * 
 * This class handles the game canvas, calculates dimensions, and loads the correct background
 * based on the game's current setting (Disneyland or Gym). It ensures that all elements
 * are positioned correctly and maintains a single point of reference for shared resources.
 * 
 * @class GameEnv
 * @property {Array} gameObjects - An array of game objects for the current level.
 * @property {Object} canvas - The canvas element.
 * @property {Object} ctx - The 2D rendering context of the canvas.
 * @property {number} innerWidth - The inner width of the game area.
 * @property {number} innerHeight - The inner height of the game area.
 * @property {number} top - The top offset of the game area.
 * @property {number} bottom - The bottom offset of the game area.
 * @property {boolean} timerActive - Flag to indicate if the timer is active.
 * @property {number} timerInterval - The interval for the timer.
 * @property {number} time - The current time.
 * @property {string} currentSetting - The current game setting (Disneyland or Gym).
 */
class GameEnv {
    static gameObjects = [];
    static continueLevel = true;
    static canvas;
    static ctx;
    static innerWidth;
    static innerHeight;
    static top;
    static bottom;
    static timerActive = false;
    static timerInterval = 10;
    static time = 0;
    static currentSetting = 'Disneyland'; // Tracks the current game setting
    
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

    /**
     * Initializes the game environment, sets up the canvas, calculates dimensions, and loads the background.
     */
    static create() {
        this.setCanvas();
        this.setTop();
        this.setBottom();
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight - this.top - this.bottom;
        this.size();
        this.loadBackground();
    }

    /**
     * Sets the canvas element and its 2D rendering context.
     */
    static setCanvas() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Determines the top offset based on the height of the header element.
     */
    static setTop() {
        const header = document.querySelector('header');
        this.top = header ? header.offsetHeight : 0;
    }

    /**
     * Determines the bottom offset based on the height of the footer element.
     */
    static setBottom() {
        const footer = document.querySelector('footer');
        this.bottom = footer ? footer.offsetHeight : 0;
    }

    /**
     * Adjusts the canvas size to fit the calculated dimensions.
     */
    static size() {
        this.canvas.width = this.innerWidth;
        this.canvas.height = this.innerHeight;
        this.canvas.style.width = `${this.innerWidth}px`;
        this.canvas.style.height = `${this.innerHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0px';
        this.canvas.style.top = `${this.top}px`;
    }

    /**
     * Resizes the game environment when the window size changes.
     */
    static resize() {
        this.create();
    }

    /**
     * Clears the canvas, preparing it for the next frame.
     */
    static clear() {
        this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
    }

    /**
     * Loads the appropriate background image based on the current game setting.
     */
    static loadBackground() {
        let bgImage = new Image();
        if (this.currentSetting === 'Disneyland') {
            bgImage.src = 'http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/IMG_7640.png';
        } else if (this.currentSetting === 'Gym') {
            bgImage.src = 'http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/IMG_7848.png';
        }
        bgImage.onload = () => {
            this.ctx.drawImage(bgImage, 0, 0, this.innerWidth, this.innerHeight);
        };
    }
}

export default GameEnv;