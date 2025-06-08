import Character from "./Character.js";
import DialogueSystem from "./DialogueSystem.js";

class Collectible extends Character {
  constructor(data = null, gameEnv = null) {
    super(data, gameEnv);
    this.interact = data?.interact || (() => console.log("Collected!"));
    this.collected = false;

    this.dialogues = data?.dialogues || [data?.greeting || "Press E to collect."];
    this.dialogueSystem = new DialogueSystem({
      dialogues: this.dialogues,
      enableSound: data?.enableDialogueSound || false
    });

    this.position = {
      x: data?.INIT_POSITION?.x || 0,
      y: data?.INIT_POSITION?.y || 0
    };
    this.width = data?.pixels?.width * data?.SCALE_FACTOR || 50;
    this.height = data?.pixels?.height * data?.SCALE_FACTOR || 50;

    if (gameEnv && gameEnv.gameControl && typeof gameEnv.gameControl.registerInteractionHandler === "function") {
      gameEnv.gameControl.registerInteractionHandler(this);
    }
  }

  update() {
    if (this.collected) return;
    this.draw();

    const players = this.gameEnv.gameObjects.filter(
      obj => obj.constructor.name === 'Player'
    );

    for (const player of players) {
      const overlapping = this.checkOverlap(player);
      if (overlapping && !this.collected) {
        this.showItemMessage();
      }
    }
  }

  draw() {
    const ctx = this.gameEnv.gameCanvas.getContext("2d");
    const img = new Image();
    img.src = this.spriteData.src;
    ctx.drawImage(
      img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  checkOverlap(player) {
    return (
      player.x < this.position.x + this.width &&
      player.x + player.width > this.position.x &&
      player.y < this.position.y + this.height &&
      player.y + player.height > this.position.y
    );
  }

  handleKeyInteract() {
    if (this.collected) return;

    const players = this.gameEnv.gameObjects.filter(
      obj => obj.constructor.name === 'Player'
    );

    for (const player of players) {
      if (this.checkOverlap(player)) {
        this.interact.call(this);
        this.collected = true;
        this.dialogueSystem.showDialogue("Collected!", this.spriteData.id);
        setTimeout(() => {
          this.dialogueSystem.closeDialogue();
        }, 800);
        return;
      }
    }
  }

  showItemMessage() {
    if (!this.dialogueSystem) return;
    this.dialogueSystem.showDialogue(this.dialogues[0], this.spriteData?.id || "Collectible");
  }

  destroy() {
    if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
      this.dialogueSystem.closeDialogue();
    }
    super.destroy();
  }
}

export default Collectible;