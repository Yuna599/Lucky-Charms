import GameObject from './GameObject.js';

class Npc extends GameObject {
    constructor(gameEnv, data) {
        super(gameEnv);
        this.image = new Image();
        this.image.src = data.src;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
    }

    update() {
        this.draw();
    }

    draw() {
        const ctx = this.gameEnv.ctx;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    resize() {
        // Implement resize logic if needed
    }
}

export default Npc;
