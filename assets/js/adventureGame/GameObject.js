import GameEnv from './GameEnv.js';

class GameObject {
    constructor() {
        if (new.target === GameObject) {
            throw new TypeError("Cannot instantiate GameObject directly");
        }

        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.canvas = null;
        this.context = null;
        this.state = {
            movement: { up: true, down: true, left: true, right: true },
        };
    }

    draw(ctx) {
        throw new Error("Method 'draw()' must be implemented.");
    }

    update() {
        throw new Error("Method 'update()' must be implemented.");
    }

    resize() {
        console.warn(`${this.constructor.name} does not implement resize().`);
    }

    destroy() {
        console.warn(`${this.constructor.name} destroy method called.`);
    }
}

export default GameObject;
