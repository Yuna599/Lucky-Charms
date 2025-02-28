import GameObject from './GameObject.js';
import ProjectileExplosion from './ProjectileExplosion.js';

function newProjectileExplosion(data, gameEnv) {
    return new ProjectileExplosion(data, gameEnv);
}

class Projectile extends GameObject {
    constructor(gameEnv, data) {
        super(gameEnv);
        this.image = new Image();
        this.image.src = data.src;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.velocity = data.velocity;
        this.startTime = Date.now();
        this.duration = data.TRANSLATE_SIMULATION.milliseconds;
        this.calculateTranslatePositions();
        this.startScaleFactor = data.SCALE_FACTOR;
        this.endScaleFactor = data.TRANSLATE_SCALE_FACTOR;
        this.randomDelay = 0;
        this.delayStartTime = null;
    }

    calculateTranslatePositions() {
        this.startPosition = {
            x: this.gameEnv.innerWidth * this.data.INIT_POSITION_RATIO.x,
            y: this.gameEnv.innerHeight * this.data.INIT_POSITION_RATIO.y
        };
        this.endPosition = {
            x: this.gameEnv.innerWidth * this.data.TRANSLATE_POSITION_RATIO.x,
            y: this.gameEnv.innerHeight * this.data.TRANSLATE_POSITION_RATIO.y
        };
    }

    update() {
        const elapsedTime = Date.now() - this.startTime;
        if (elapsedTime >= this.duration) {
            this.destroy();
            return;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
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

export default Projectile;