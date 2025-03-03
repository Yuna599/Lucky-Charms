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

    draw() {
        const ctx = this.gameEnv.ctx;
        const width = this.gameEnv.canvas.width;
        const height = this.gameEnv.canvas.height;

        if (this.image) {
            ctx.drawImage(this.image, 0, 0, width, height);
            console.log('Drawing background with size:', width, height);
        } else {
            console.error('Background image not loaded');
        }
    }

    update() {
        this.draw();
    }
}

export default Background;