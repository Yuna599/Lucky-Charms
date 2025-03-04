export class Character {
    constructor(imageSrc, x, y) {
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onload = () => console.log("Character Image Loaded");
        this.frameWidth = 64; // Assuming each frame in the sprite sheet is 64px wide
        this.frameHeight = 64; // Assuming each frame is 64px high
        this.currentFrame = 0;
        this.totalFrames = 4; // Number of frames in the sprite sheet
        this.tickCount = 0;
        this.ticksPerFrame = 10; // Adjust for animation speed
    }
    move(direction) {
        if (direction === "left") this.x -= this.speed;
        if (direction === "right") this.x += this.speed;
        if (direction === "up") this.y -= this.speed;
        if (direction === "down") this.y += this.speed;
        this.updateFrame();
    }
    updateFrame() {
        this.tickCount++;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }
    }
    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.currentFrame * this.frameWidth, 0,
            this.frameWidth, this.frameHeight,
            this.x, this.y,
            100, 100
        );
    }
}
