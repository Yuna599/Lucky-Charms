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

        if (this.image) {
            // Draw the background image scaled to the canvas size
            ctx.drawImage(this.image, 0, 0, width, height);
            console.log('Drawing background with size:', width, height);
        } else {
            console.error('Background image not loaded');
        }
    }

    /** For primary background, update is the same as draw
     * 
     */
    update() {
        this.draw();
    }
}

export default Background;