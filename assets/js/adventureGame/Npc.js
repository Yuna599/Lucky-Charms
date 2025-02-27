import Character from './Character.js';

class Npc extends Character {
    constructor({ x, y, spriteData }) {
        super({ x, y, spriteData });

        this.greeting = "Hello, traveler!";
    }

    interact() {
        console.log(this.greeting);
    }
}

export default Npc;
