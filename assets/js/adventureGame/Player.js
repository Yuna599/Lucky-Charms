import GameEnv from './GameEnv.js';
import Character from "./Character.js";
import { getStats } from "/Lucky-Charms/assets/js/adventureGame/StatsManager.js";

class Player extends Character {
    constructor() {
        super({ id: "aliCharacter", name: "Ali" }); // ✅ Pass correct data
        this.keypress = { up: 87, left: 65, down: 83, right: 68 };
        this.velocity = { x: 0, y: 0 };
        this.direction = "down";
        this.bindMovementKeyListeners();
    }

    bindMovementKeyListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case this.keypress.up: this.velocity.y = -1; break;
            case this.keypress.left: this.velocity.x = -1; break;
            case this.keypress.down: this.velocity.y = 1; break;
            case this.keypress.right: this.velocity.x = 1; break;
        }
    }

    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case this.keypress.up:
            case this.keypress.down:
                this.velocity.y = 0;
                break;
            case this.keypress.left:
            case this.keypress.right:
                this.velocity.x = 0;
                break;
        }
    }
}

export default Player; // ✅ Ensure you export only once
