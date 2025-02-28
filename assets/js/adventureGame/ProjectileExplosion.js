import Character from './Character.js';

class ProjectileExplosion extends Character {
    constructor(data, gameEnv) {
        super(data, gameEnv);
        this.startTime = Date.now();
        this.duration = data.EXPLOSION_SIMULATION.miliseconds;
        this.position = {
            x: this.gameEnv.innerWidth * data.TRANSLATE_POSITION_RATIO.x,
            y: this.gameEnv.innerHeight * data.TRANSLATE_POSITION_RATIO.y
        };
        this.drop = this.position.y;
        this.startScaleFactor = data.SCALE_FACTOR;
        this.endScaleFactor = data.EXPLOSION_SCALE_FACTOR;
        console.log('ProjectileExplosion initialized with data:', data);
    }

    /**
     * Update the explosion's position and size based on the animation progress
     */
    update() {
        // Calculate the progress of the animation
        const elapsedTime = Date.now() - this.startTime;
        const progress = Math.min(elapsedTime / this.duration, 1);

        // Apply a non-linear drop speed (ease-in effect)
        const easedProgress = Math.pow(progress, 2);

        // Drop the projectile to the ground
        this.position.y = this.drop + easedProgress * (this.gameEnv.innerHeight - this.drop);

        // Ensure the projectile does not go beyond the bottom boundary
        if (this.position.y > this.gameEnv.innerHeight) {
            this.position.y = this.gameEnv.innerHeight;
        }

        // Shrink the projectile as it drops
        this.scaleFactor = this.startScaleFactor - (this.startScaleFactor - this.endScaleFactor) * progress;
        this.size = this.gameEnv.innerHeight / this.scaleFactor;
        this.width = this.size;
        this.height = this.size;

        console.log('Updated explosion position:', this.position, 'Scale factor:', this.scaleFactor);

        // Call the parent update method to handle other updates
        super.update();

        // If the animation reaches the end, stop the explosion
        if (progress >= 1) {
            this.destroy();
            console.log('Explosion animation completed and destroyed');
        }
    }

    /**
     * Destroy the explosion by removing it from the game environment
     */
    destroy() {
        const index = this.gameEnv.gameObjects.indexOf(this);
        if (index !== -1) {
            this.gameEnv.gameObjects.splice(index, 1);
        }
        console.log('ProjectileExplosion destroyed');
    }
}

export default ProjectileExplosion;