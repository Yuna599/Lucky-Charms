class PlatformerGame {
    constructor(gameCanvas, gameContainer) {
        this.canvas = gameCanvas;
        this.ctx = this.canvas.getContext("2d");
        this.container = gameContainer;

        this.gravity = 0.5;
        this.friction = 0.8;

        this.player = {
            x: 100,
            y: 0,
            width: 50, // Increased width
            height: 80, // Increased height
            velocityX: 0,
            velocityY: 0,
            speed: 4,
            jumpPower: -12,
            onGround: false,
            color: "blue",
        };

        this.platforms = [
            { x: 50, y: 300, width: 200, height: 20 },
            { x: 300, y: 250, width: 150, height: 20 },
            { x: 500, y: 200, width: 100, height: 20 },
        ];

        this.keys = {};
        this.bindKeyListeners();
    }

    bindKeyListeners() {
        document.addEventListener("keydown", (e) => {
            this.keys[e.code] = true;
        });
        document.addEventListener("keyup", (e) => {
            this.keys[e.code] = false;
        });
    }

    updatePlayer() {
        // Horizontal movement
        if (this.keys["ArrowRight"] || this.keys["KeyD"]) {
            this.player.velocityX = this.player.speed;
        } else if (this.keys["ArrowLeft"] || this.keys["KeyA"]) {
            this.player.velocityX = -this.player.speed;
        } else {
            this.player.velocityX *= this.friction;
        }

        // Jumping
        if ((this.keys["ArrowUp"] || this.keys["KeyW"] || this.keys["Space"]) && this.player.onGround) {
            this.player.velocityY = this.player.jumpPower;
            this.player.onGround = false;
        }

        // Gravity
        this.player.velocityY += this.gravity;

        // Update position
        this.player.x += this.player.velocityX;
        this.player.y += this.player.velocityY;

        // Platform collision
        this.player.onGround = false;
        for (const platform of this.platforms) {
            if (
                this.player.x < platform.x + platform.width &&
                this.player.x + this.player.width > platform.x &&
                this.player.y < platform.y + platform.height &&
                this.player.y + this.player.height > platform.y
            ) {
                if (this.player.velocityY > 0) {
                    this.player.y = platform.y - this.player.height;
                    this.player.velocityY = 0;
                    this.player.onGround = true;
                }
            }
        }

        // Stay inside canvas
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.x + this.player.width > this.canvas.width) this.player.x = this.canvas.width - this.player.width;
        if (this.player.y + this.player.height > this.canvas.height) {
            this.player.y = this.canvas.height - this.player.height;
            this.player.velocityY = 0;
            this.player.onGround = true;
        }
    }

    drawPlatforms() {
        this.ctx.fillStyle = "#8B4513"; // Brown color for platforms
        for (const platform of this.platforms) {
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        }
    }

    drawPlayer() {
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }

    update() {
        this.updatePlayer();
        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlatforms();
        this.drawPlayer();
    }

    start() {
        this.update();
    }
}

export default PlatformerGame;
