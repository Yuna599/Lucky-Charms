import Enemy from './Enemy.js';
import Player from './Player.js';

class Unicorn extends Enemy {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);

    }
    /**
     * Check for proximity of objects.
     * This method checks if any players are within a certain distance of the creeper.
     * If players are within the specified distance, their names are collected and a response is generated.
     */
    checkProximityToPlayer() {
        //this.velocity.x=10
        // Filter all Player objects from the game environment
        var players = this.gameEnv.gameObjects.filter(obj => obj instanceof Player);
        var unicorn = this;
        var names = [];

        var player ;

        if (players.length > 0 && unicorn) {
            players.forEach(player => {

                if (player.spriteData && player.spriteData.name == 'mainplayer') {
                    player = player
                    //showCustomAlert('hello')
                    // Calculate the distance between the unicorn and the player
                    
                    var deltax= player.position.x - this.position.x
                    var deltay = player.position.y - this.position.y

                    // // The Euclidean distance between two points in a 2D space
                    var distance = Math.sqrt(
                         Math.pow(player.position.x - this.position.x, 2) + Math.pow(player.position.y - this.position.y, 2)
                    );
                    // The distance is less than 10 pixels
                     if (distance > 10) {
                        if(deltax>0){
                            this.velocity.x = this.gameEnv.innerWidth * 0.0005 
                        }
                        else{
                            this.velocity.x = this.gameEnv.innerWidth * -0.0005 
                        }
                        if(deltay>0){
                            this.velocity.y = this.gameEnv.innerHeight * 0.0005
                        }
                        else{
                            this.velocity.y = this.gameEnv.innerHeight * -0.0005 
                        }
                        //this.velocity.x = deltax/200
                        //this.velocity.y = deltay/200
                     }
                    // else {
                    //      this.velocity.x = 0
                    //      this.velocity.y = 0
                    // }

                }
            });
        }


    }

    // Override the jump method for unicorn
    jump() {
        // Implement unicorn-specific jump logic here
        // console.log("unicorn is jumping!");
        //this.y -= 50; // Example: Move the unicorn up by 50 pixels
    }

    handleCollisionEvent() {
        //extract player object
        var player = this.gameEnv.gameObjects.find(obj => obj instanceof Player); 
        //collided object is player
        if (player.id = this.collisionData.touchPoints.other.id) {
            
            console.log("Unicorn collided with player!");

        // Stop movement
        this.velocity.x = 0;
        this.velocity.y = 0;

        // Explode player object with animation
        this.explode(player.position.x, player.position.y);
        player.destroy();
        this.playerDestroyed = true;

        // Restart level after explosion animation
        setTimeout(() => {
            this.gameEnv.gameControl.currentLevel.restart = true;
        }, 2000); // Adjust delay based on explosion animation duration
        }
    }

    updatePosition() {
        this.INIT_POSITION.x += this.direction.x * this.speed;
        this.INIT_POSITION.y += this.direction.y * this.speed;

        if (this.INIT_POSITION.x <= this.walkingArea.xMin) {
            this.INIT_POSITION.x = this.walkingArea.xMin;
            this.direction.x = 1;
        }
        if (this.INIT_POSITION.x >= this.walkingArea.xMax) {
            this.INIT_POSITION.x = this.walkingArea.xMax;
            this.direction.x = -1;
        }
        if (this.INIT_POSITION.y <= this.walkingArea.yMin) {
            this.INIT_POSITION.y = this.walkingArea.yMin;
            this.direction.y = 1;
        }
        if (this.INIT_POSITION.y >= this.walkingArea.yMax) {
            this.INIT_POSITION.y = this.walkingArea.yMax;
            this.direction.y = -1;
        }

        const el = document.getElementById(this.id);
        if (el) {
            el.style.transform = this.direction.x === -1 ? "scaleX(-1)" : "scaleX(1)";
            el.style.left = this.INIT_POSITION.x + "px";
            el.style.top = this.INIT_POSITION.y + "px";
        }
    }

    playAnimation() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const spriteElement = document.getElementById(this.id);
        if (!spriteElement) return;

        // Optional sound
        if (this.sound) this.sound.play();

        const particleCount = 25;
        const colors = ['#f0f', '#0ff', '#ff0', '#f66', '#6f6', '#66f'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = `${spriteElement.offsetLeft + spriteElement.offsetWidth / 2}px`;
            particle.style.top = `${spriteElement.offsetTop + spriteElement.offsetHeight / 2}px`;
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = 9999;
            particle.style.opacity = 1;
            particle.style.transition = 'transform 1s ease-out, opacity 1s ease-out';

            const angle = Math.random() * 2 * Math.PI;
            const distance = 60 + Math.random() * 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            document.body.appendChild(particle);
            requestAnimationFrame(() => {
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = 0;
            });

            setTimeout(() => particle.remove(), 1000);
        }

        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }

    
    // Override other methods if needed
}

export default Unicorn;