import GameControl from "./js/GameControl.js";
import { Character } from "./js/Character.js";
import { Background } from "./js/Background.js";
import { GameLevel } from "./js/GameLevel.js";
import { Enemy } from "./js/Enemy.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;

const gameControl = new GameControl();
gameControl.start(); // 🔥 FIX: Now GameControl has a start() method

const ali = new Character("images/gamify/Ali_SpriteSheet.png", 300, 300);
const gymBackground = new Background("images/gamify/gym.png");
const disneyBackground = new Background("images/gamify/disneyland.png");
const enemy1 = new Enemy("images/gamify/enemy.png", 600, 300, 1);
const enemy2 = new Enemy("images/gamify/enemy.png", 100, 500, 1.2);
const gymLevel = new GameLevel("gym", gymBackground, ali, [enemy1]);
const disneyLevel = new GameLevel("disneyland", disneyBackground, ali, [enemy2]);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameControl.gameState === "gym") {
        gymLevel.update();
        gymLevel.render(ctx);
    }
    else if (gameControl.gameState === "disneyland") {
        disneyLevel.update();
        disneyLevel.render(ctx);
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();
