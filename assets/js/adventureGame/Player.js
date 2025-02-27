import Character from './Character.js';

class Player extends Character {
    constructor({ x, y, spriteData }) {
        super({ x, y, spriteData });

        this.speed = 5;
    }

    move(direction) {
        switch (direction) {
            case "up":
                if (this.state.movement.up) this.y -= this.speed;
                break;
            case "down":
                if (this.state.movement.down) this.y += this.speed;
                break;
            case "left":
                if (this.state.movement.left) this.x -= this.speed;
                break;
            case "right":
                if (this.state.movement.right) this.x += this.speed;
                break;
        }
    }

    update() {
        console.log("Player is updating position.");
    }
}

export default Player;
