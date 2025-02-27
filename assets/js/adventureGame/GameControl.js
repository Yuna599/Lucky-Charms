import Player from './Player.js';
import Npc from './Npc.js';

const GameControl = {
    canvas: null,
    ctx: null,
    player: null,
    npcs: [],

    initializeGame() {
        console.log("Initializing game...");

        // Setup canvas
        this.canvas = document.getElementById("gameCanvas");
        if (!this.canvas) {
            console.error("❌ Game canvas not found!");
            return;
        }

        this.ctx = this.canvas.getContext("2d");

        // Ensure game resizes properly
        window.addEventListener("resize", () => this.resizeGame());

        // Initialize player
        this.player = new Player({
            x: 100,
            y: 200,
            spriteData: { 
                imageSrc: "http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/pixil-frame-0__2_-removebg-preview.png" 
            }
        });

        // Initialize NPCs
        this.npcs.push(new Npc({
            x: 300,
            y: 200,
            spriteData: { 
                imageSrc: "http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/npc.png" 
            }
        }));

        // Start game loop
        this.startGameLoop();
    },

    startGameLoop() {
        console.log("Game loop started...");
        const loop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(loop);
        };
        loop();
    },

    update() {
        this.player.update();
        this.npcs.forEach(npc => npc.update());
    },

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw player and NPCs
        this.player.draw(this.ctx);
        this.npcs.forEach(npc => npc.draw(this.ctx));
    },

    resizeGame() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log("Game resized.");
    },

    start() {
        console.log("Starting game...");
        this.initializeGame();
    }
};

export default GameControl;
