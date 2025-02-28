import GameObject from './GameObject.js';

class ProjectileExplosion extends GameObject {
    constructor(gameEnv, data) {
        super(gameEnv);
        this.image = new Image();
        this.image.src = data.src;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.startTime = Date.now();
        this.duration = data.EXPLOSION_SIMULATION.milliseconds;
    }

    update() {
        const elapsedTime = Date.now() - this.startTime;
        if (elapsedTime >= this.duration) {
            this.destroy();
            return;
        }
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

export default ProjectileExplosion;