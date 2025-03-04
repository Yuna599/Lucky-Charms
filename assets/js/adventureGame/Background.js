import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

/** Background class for primary background
 * 
 */
class Background {
    constructor(data, gameEnv) {
        this.gameEnv = gameEnv;
        this.image = new Image();
        this.image.src = data.src;
        this.image.onload = () => {
            console.log('Background image loaded:', data.src);
        };
    }

    /** This method draws to GameEnv context, primary background
     * 
     */
    draw() {
        const ctx = this.gameEnv.ctx;
        const width = this.gameEnv.canvas.width;
        const height = this.gameEnv.canvas.height;
    
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformations to prevent movement issues
        ctx.clearRect(0, 0, width, height); // Clear previous frame
        ctx.drawImage(this.image, 0, 0, width, height);
    }
    

    /** For primary background, update is the same as draw
     * 
     */
    update() {
        this.draw();
    }
}

export default Background;