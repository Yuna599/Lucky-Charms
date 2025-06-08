class Platform {
    constructor(data, gameEnv) {
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.gameEnv = gameEnv;

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.style.position = "absolute";
        this.canvas.style.left = `${this.x}px`;
        this.canvas.style.top = `${this.y}px`;
        this.canvas.style.backgroundColor = "#8B4513"; // Brown platform color
        document.getElementById("gameContainer").appendChild(this.canvas);
    }

    update() {
        // Platforms are static, no update logic needed
    }

    resize() {
        // Handle resizing if necessary
    }

    destroy() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

export default Platform;
