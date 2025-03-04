export class Enemy {
    constructor(imageSrc, x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    moveToward(targetX, targetY) {
        let dx = targetX - this.x;
        let dy = targetY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, 80, 80);
    }
}
