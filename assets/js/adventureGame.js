import Prompt from './adventureGame/Prompt.js';
import { getStats } from '/Lucky-Charms/assets/js/adventureGame/StatsManager.js';

document.addEventListener("DOMContentLoaded", () => {
    const question = new Prompt(
        "What is the capital of France?",
        ["Berlin", "Madrid", "Paris", "Rome"],
        "Paris"
    );

    question.display();
});
