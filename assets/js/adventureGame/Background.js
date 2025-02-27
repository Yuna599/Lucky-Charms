import GameEnv from './GameEnv.js';

class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.currentBackground = 'disneyland'; // Start with Disneyland
        this.backgrounds = {
            disneyland: new Image(),
            gym: new Image()
        };
        this.backgrounds.disneyland.src = 'http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/IMG_7640.png';
        this.backgrounds.gym.src = 'http://127.0.0.1:4100/Lucky-Charms/navigation/images/gamify/IMG_7848.png';
        
        this.resize();
    }

    switchBackground(newBackground) {
        if (this.backgrounds[newBackground]) {
            this.currentBackground = newBackground;
        }
    }

    draw() {
        const bg = this.backgrounds[this.currentBackground];
        this.ctx.drawImage(bg, 0, 0, GameEnv.innerWidth, GameEnv.innerHeight);
    }
    
    resize() {
        GameEnv.innerWidth = window.innerWidth;
        GameEnv.innerHeight = window.innerHeight;
    }
}

export default Background;
