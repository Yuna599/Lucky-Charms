import GameObject from './GameObject.js';

class Player extends GameObject {
    constructor(gameEnv, data) {
        super(gameEnv);
        this.image = new Image();
        this.image.src = data.src;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.velocity = { x: 0, y: 0 };
    }

    update() {
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

    move(direction) {
        const speed = 5;
        switch (direction) {
            case 'up':
                this.velocity.y = -speed;
                break;
            case 'down':
                this.velocity.y = speed;
                break;
            case 'left':
                this.velocity.x = -speed;
                break;
            case 'right':
                this.velocity.x = speed;
                break;
        }
    }

    stop() {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
}

export default Player;