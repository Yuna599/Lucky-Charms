import Character from "./Character.js";

class Npc extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.interact = data?.interact; // Interact function
        this.currentQuestionIndex = 0;
        this.alertTimeout = null;
        this.scale = data?.scale || 1; // Scale factor for NPC
        this.bindInteractKeyListeners();
        console.log('Npc initialized with data:', data);
    }

    update() {
        this.draw();
        console.log('Npc updated');
    }

    draw() {
        const ctx = this.gameEnv.ctx;
        const width = (this.spriteData.pixels?.width || 0) / (this.spriteData.orientation?.columns || 1) * this.scale;
        const height = (this.spriteData.pixels?.height || 0) / (this.spriteData.orientation?.rows || 1) * this.scale;
        const x = this.position.x;
        const y = this.position.y;
        const row = this.spriteData[this.direction]?.row || 0;
        const column = this.frameIndex;

        if (this.image) {
            ctx.drawImage(
                this.image,
                column * width,
                row * height,
                width,
                height,
                x,
                y,
                width,
                height
            );
            console.log('Drawing NPC at:', x, y, 'with size:', width, height);
        } else {
            console.error('Image not loaded for NPC:', this.spriteData.id);
        }
    }

    bindInteractKeyListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
        console.log('Interact key listeners bound');
    }

    handleKeyDown({ key }) {
        if (key === 'e' || key === 'u') {
            console.log('Key down:', key);
            this.handleKeyInteract();
        }
    }

    handleKeyUp({ key }) {
        if (key === 'e' || key === 'u') {
            console.log('Key up:', key);
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    handleKeyInteract() {
        const players = this.gameEnv.gameObjects.filter(
            obj => obj.state.collisionEvents.includes(this.spriteData.id)
        );
        const hasInteract = this.interact !== undefined;

        console.log('Players in collision:', players);
        console.log('Has interact function:', hasInteract);

        if (players.length > 0 && hasInteract) {
            this.interact();
        }
    }
}

export default Npc;
