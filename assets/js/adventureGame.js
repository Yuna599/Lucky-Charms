import { getStats } from '/Lucky-Charms/assets/js/adventureGame/StatsManager.js';
import Prompt from './Prompt.js';
import GameControl from './GameControl.js'; // Ensure GameControl is imported

document.addEventListener("DOMContentLoaded", () => {
    const question = new Prompt(
        "What is the output of the following JavaScript code: console.log([1, 2, 3] + [4, 5, 6]);",
        ["'1,2,34,5,6'", "'[1, 2, 3, 4, 5, 6]'", "'1,2,34,5,6'", "'undefined'"],
        "'1,2,34,5,6'"
    );

    const prompt = {
        initializePrompt: function() {
            console.log("Initializing prompt...");
            let promptContainer = document.getElementById("prompt-container");
            if (!promptContainer) {
                promptContainer = document.createElement("div");
                promptContainer.id = "prompt-container";
                document.body.appendChild(promptContainer);
            }
        }
    };

    prompt.initializePrompt();
    question.display();

    // Example usage of getStats
    console.log(getStats());

    // Ensure GameControl has a start method
    if (typeof GameControl.start === 'function') {
        GameControl.start();
    } else {
        console.error("GameControl.start is not a function");
    }
});
