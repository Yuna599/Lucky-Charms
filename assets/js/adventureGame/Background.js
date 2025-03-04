<<<<<<< HEAD
/** Background class for primary background
 * 
 */
class Background {
    constructor(data, gameEnv) {
        this.gameEnv = gameEnv;
=======
export class Background {
    constructor(imageSrc) {
>>>>>>> 64a45ee (changes)
        this.image = new Image();
        this.image.src = imageSrc;
        this.loaded = false;
        this.image.onload = () => {
            console.log("Background Loaded: " + imageSrc);
            this.loaded = true;
        };
    }
    draw(ctx) {
        if (this.loaded) {
            ctx.drawImage(this.image, 0, 0, 800, 600);
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 800, 600); // Placeholder while loading
        }
    }
}
