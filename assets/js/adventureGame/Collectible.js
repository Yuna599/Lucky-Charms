// Collectible.js with DialogueSystem integration
import Character from "./Character.js";
import DialogueSystem from "./DialogueSystem.js";

class Collectible extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.interact = data?.interact;
        this.alertTimeout = null;
        this.isInteracting = false;
        this.handleKeyDownBound = this.handleKeyDown.bind(this);
        this.handleKeyUpBound = this.handleKeyUp.bind(this);
        this.bindInteractKeyListeners();

        if (data?.dialogues && data.dialogues.length > 0) {
            this.dialogueSystem = new DialogueSystem({
                dialogues: data.dialogues,
                enableSound: data.enableDialogueSound
            });
        } else {
            this.dialogueSystem = null;
        }

        if (gameEnv && gameEnv.gameControl) {
            gameEnv.gameControl.registerInteractionHandler(this);
        }
    }

    update() {
        this.draw();
        const players = this.gameEnv.gameObjects.filter(
            obj => obj.state.collisionEvents.includes(this.spriteData.id)
        );
        
        if (players.length === 0 && this.isInteracting) {
            this.isInteracting = false;
            if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
                this.dialogueSystem.closeDialogue();
            }
        }
    }

    bindInteractKeyListeners() {
        document.addEventListener('keydown', this.handleKeyDownBound);
        document.addEventListener('keyup', this.handleKeyUpBound);
    }

    removeInteractKeyListeners() {
        document.removeEventListener('keydown', this.handleKeyDownBound);
        document.removeEventListener('keyup', this.handleKeyUpBound);
        
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
            this.alertTimeout = null;
        }
        
        if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
            this.dialogueSystem.closeDialogue();
        }
        
        this.isInteracting = false;
    }

    handleKeyDown(event) {
        if (event.key === 'e' || event.key === 'u') {
            this.handleKeyInteract();
        }
    }

    handleKeyUp(event) {
        if (event.key === 'e' || event.key === 'u') {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    handleKeyInteract() {
        if (this.gameEnv.gameControl && this.gameEnv.gameControl.isPaused) {
            return;
        }

        const players = this.gameEnv.gameObjects.filter(
            obj => obj.state.collisionEvents.includes(this.spriteData.id)
        );

        const hasInteract = this.interact !== undefined;

        if (players.length > 0 && hasInteract) {
            this.interact.call(this);

            // 🎲 Booster logic (10% chance)
            if (Math.random() < 0.1) {
                const player = players[0];
                const boosters = ["fasterSpeed", "slowerSpeed", "highJump", "doubleJump"];
                const chosenBooster = boosters[Math.floor(Math.random() * boosters.length)];

                this.applyBoosterToPlayer(player, chosenBooster);
                this.showBoosterDialogue(chosenBooster);
            }

            if (this.dialogueSystem && this.dialogueSystem.dialogues.length > 0) {
                this.dialogueSystem.showDialogue(this.dialogueSystem.dialogues[0]);
            }
        }
    }

    // 🎁 Booster effects with 5-second duration
    applyBoosterToPlayer(player, booster) {
        switch (booster) {
            case "fasterSpeed":
                player.speed *= 1.5;
                setTimeout(() => player.speed /= 1.5, 5000);
                break;
            case "slowerSpeed":
                player.speed *= 0.5;
                setTimeout(() => player.speed /= 0.5, 5000);
                break;
            case "highJump":
                player.jumpHeight *= 1.8;
                setTimeout(() => player.jumpHeight /= 1.8, 5000);
                break;
            case "doubleJump":
                player.canDoubleJump = true;
                setTimeout(() => player.canDoubleJump = false, 5000);
                break;
        }
    }

    // 💬 DialogueSystem integration to show booster messages
    showBoosterDialogue(booster) {
        if (!this.dialogueSystem) return;

        const messages = {
            fasterSpeed: "You feel lightning-fast! (Speed Up)",
            slowerSpeed: "You feel heavy... (Speed Down)",
            highJump: "You leap like a kangaroo! (High Jump)",
            doubleJump: "You can now jump twice! (Double Jump)"
        };

        const message = messages[booster] || "Booster activated!";
        this.dialogueSystem.showDialogue(message);
    }

    showItemMessage() {
        if (!this.dialogueSystem) return;
        
        const itemName = this.spriteData?.id || "";
        const itemIcon = this.spriteData?.src || null;
        const message = this.spriteData?.greeting || "Press E to interact.";
        this.dialogueSystem.showDialogue(message, itemName, itemIcon);
    }

    destroy() {
        if (this.gameEnv && this.gameEnv.gameControl) {
            this.gameEnv.gameControl.unregisterInteractionHandler(this);
        }
        this.removeInteractKeyListeners();
        super.destroy();
    }
}

export default Collectible;
