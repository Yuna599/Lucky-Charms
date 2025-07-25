---
layout: base
title: Adventure Game - Gym
permalink: /gamify/gym
---

<div id="gameContainer">
    <div id="promptDropDown" class="promptDropDown" style="z-index: 9999"></div>
    <canvas id='gameCanvas'></canvas>
</div>

<script type="module">
    // Adventure Game assets locations
    import Game from "{{site.baseurl}}/assets/js/adventureGame/Game.js";
    import GameLevelGym from "{{site.baseurl}}/assets/js/adventureGame/GameLevelGym.js";
    import DialogueSystem from "{{site.baseurl}}/assets/js/adventureGame/DialogueSystem.js"; // Corrected path
    import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    const gameLevelClasses = [GameLevelGym]; // Only include GameLevelGym

    const instructionsStyle = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, black, purple);
        color: white;
        padding: 30px;
        border-radius: 15px;
        z-index: 1000;
        max-width: 600px;
        width: 90%;
        font-family: 'Press Start 2P', cursive;
        border: 3px solid purple;
        box-shadow: 0 0 20px rgba(128, 0, 128, 0.5);
    `;

    const instructionsHTML = `
        <h2 style="color: purple; margin-bottom: 15px; text-align: center;">Welcome to the Gym!</h2>
        <div style="margin-bottom: 15px;">
            <h3 style="color: purple;">Controls:</h3>
            <p>• WASD - Move</p>
            <p>• E - Interact with NPCs</p>
            <p>• ESC - Exit mini-games/End the level</p>
        </div>
        <div style="text-align: center;">
            <button id="startGameBtn" style="
                background: purple;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                font-family: 'Press Start 2P', cursive;
                font-size: 12px;
                transition: all 0.3s ease;
            ">Start Game</button>
        </div>
    `;

    // Web Server Environment data
    const environment = {
        path: "/Lucky-Charms", // Ensure this matches the actual base URL
        pythonURI: pythonURI,
        javaURI: javaURI,
        fetchOptions: fetchOptions,
        gameContainer: document.getElementById("gameContainer"),
        gameCanvas: document.getElementById("gameCanvas"),
        instructionsStyle: instructionsStyle,
        instructionsHTML: instructionsHTML,
        gameLevelClasses: gameLevelClasses
    };

    // Launch Adventure Game
    Game.main(environment);
</script>
