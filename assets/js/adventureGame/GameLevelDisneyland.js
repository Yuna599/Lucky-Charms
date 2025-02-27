import Player from "./player.js"; 
import NPC from "./NPC.js";
import Prompt from "./prompt.js";

class GameLevelDisneyland {
    constructor(gameControl) {
        this.gameControl = gameControl;
        this.player = new Player();
        this.npc = new NPC("Wizard", "Answer correctly to prove your wisdom!");

        this.quiz = {
            title: "Test Your Knowledge!",
            questions: [
                "What is the capital of France?",
                "Who wrote 'Hamlet'?",
                "What is 5 + 5?"
            ]
        };
    }

    loadLevel() {
        console.log("Disneyland Level Loaded");

        // Set the background to Disneyland
        document.body.style.backgroundImage = "url('http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/IMG_7640.png')";
        document.body.style.backgroundSize = "cover";

        // Show NPC and quiz prompt
        this.npc.displayMessage();
        this.startQuiz();
    }

    startQuiz() {
        console.log("Starting quiz...");
        Prompt.openPromptPanel(this.quiz);
    }
}

export default GameLevelDisneyland;
