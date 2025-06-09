import Character from './Character.js';
import DialogueSystem from './DialogueSystem.js';

const SCALE_FACTOR = 25;
const STEP_FACTOR = 100;
const ANIMATION_RATE = 1;
const INIT_POSITION = { x: 0, y: 0 };

class Player extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.keypress = data?.keypress || {up: 87, left: 65, down: 83, right: 68};
        this.pressedKeys = {};
        this.bindMovementKeyListners();
        this.gravity = data?.GRAVITY || false;
        this.acceleration = 0.001;
        this.time = 0;
        this.moved = false;

        this.xVelocity = 5;
        this.yVelocity = 5;

        this.speed = 5; // 🆕 Booster support: speed baseline
        this.jumpHeight = 10; // 🆕 Booster support: jump height
        this.canDoubleJump = false; // 🆕 Booster support: enable double jump

        this.gameEnv = gameEnv;
        this.dead = false;
        this.dialogueSystem = null;
    }

    bindMovementKeyListners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown({ keyCode }) {
        this.pressedKeys[keyCode] = true;
        this.updateVelocityAndDirection();
    }

    handleKeyUp({ keyCode }) {
        if (keyCode in this.pressedKeys) {
            delete this.pressedKeys[keyCode];
        }
        this.updateVelocityAndDirection();
    }

    updateVelocityAndDirection() {
        this.velocity.x = 0;
        this.velocity.y = 0;

        const moveAmountX = this.xVelocity * (this.speed / 5);  // 🆕 scale with speed
        const moveAmountY = this.yVelocity * (this.speed / 5);

        if (this.pressedKeys[this.keypress.up] && this.pressedKeys[this.keypress.left]) {
            this.velocity.y -= moveAmountY;
            this.velocity.x -= moveAmountX;
            this.direction = 'upLeft';
        } else if (this.pressedKeys[this.keypress.up] && this.pressedKeys[this.keypress.right]) {
            this.velocity.y -= moveAmountY;
            this.velocity.x += moveAmountX;
            this.direction = 'upRight';
        } else if (this.pressedKeys[this.keypress.down] && this.pressedKeys[this.keypress.left]) {
            this.velocity.y += moveAmountY;
            this.velocity.x -= moveAmountX;
            this.direction = 'downLeft';
        } else if (this.pressedKeys[this.keypress.down] && this.pressedKeys[this.keypress.right]) {
            this.velocity.y += moveAmountY;
            this.velocity.x += moveAmountX;
            this.direction = 'downRight';
        } else if (this.pressedKeys[this.keypress.up]) {
            this.velocity.y -= moveAmountY;
            this.direction = 'up';
            this.moved = true;
        } else if (this.pressedKeys[this.keypress.left]) {
            this.velocity.x -= moveAmountX;
            this.direction = 'left';
            this.moved = true;
        } else if (this.pressedKeys[this.keypress.down]) {
            this.velocity.y += moveAmountY;
            this.direction = 'down';
            this.moved = true;
        } else if (this.pressedKeys[this.keypress.right]) {
            this.velocity.x += moveAmountX;
            this.direction = 'right';
            this.moved = true;
        } else {
            this.moved = false;
        }
    }

    update() {
        super.update();
        if (!this.moved) {
            if (this.gravity) {
                this.time += 1;
                this.velocity.y += 0.5 + this.acceleration * this.time;
            }
        } else {
            this.time = 0;
        }
    }

    handleCollisionReaction(other) {
        this.pressedKeys = {};
        this.updateVelocityAndDirection();
        super.handleCollisionReaction(other);
    }

    handleDeath() {
        if (this.dead) return;
        this.dead = true;

        const spriteElement = document.getElementById(this.spriteData.id);
        if (spriteElement) {
            spriteElement.style.transition = "opacity 1s ease-out";
            spriteElement.style.opacity = "0";

            setTimeout(() => {
                spriteElement.remove();
                this.showRevivePrompt();
            }, 1000);
        }
    }

    showRevivePrompt() {
        if (!this.dialogueSystem) {
            this.dialogueSystem = new DialogueSystem();
        }

        this.dialogueSystem.showDialogue(
            "You have perished in the desert... Want to revive?",
            "Revival",
            this.spriteData.src
        );

        this.dialogueSystem.addButtons([
            {
                text: "Yes",
                primary: true,
                action: () => {
                    this.revive();
                    this.dialogueSystem.closeDialogue();
                }
            },
            {
                text: "No",
                action: () => {
                    this.dialogueSystem.closeDialogue();
                }
            }
        ]);
    }

    revive() {
        this.dead = false;
        this.gameEnv.gameObjects = this.gameEnv.gameObjects.filter(obj => obj !== this);
        this.spriteData.INIT_POSITION = { x: 50, y: this.gameEnv.innerHeight - 200 };
        this.spriteData.id = 'chill-guy';

        const revivedPlayer = new Player(this.spriteData, this.gameEnv);
        this.gameEnv.gameObjects.push(revivedPlayer);

        if (typeof revivedPlayer.draw === "function") {
            revivedPlayer.draw();
        }

        revivedPlayer.pressedKeys = {};
        revivedPlayer.updateVelocityAndDirection();

        console.log("Player revived:", revivedPlayer);
    }
}

export default Player;
