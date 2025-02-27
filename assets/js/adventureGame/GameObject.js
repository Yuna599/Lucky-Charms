import GameEnv from './gameenv.js';

/**
 * GameObject serves as a base class for all game objects in the game.
 * It ensures consistency across all game objects, handling movement, collision detection,
 * and interactions with the environment.
 *
 * @class GameObject
 */
class GameObject {
    constructor() {
        if (new.target === GameObject) {
            throw new TypeError("Cannot instantiate GameObject directly");
        }
        this.collisionWidth = 0;
        this.collisionHeight = 0;
        this.collisionData = {};
        this.hitbox = {};
        this.state = {
            collisionEvents: [],
            movement: { up: true, down: true, left: true, right: true },
        };
    }

    draw() {
        throw new Error("Method 'draw()' must be implemented.");
    }

    update() {
        throw new Error("Method 'update()' must be implemented.");
    }

    resize() {
        throw new Error("Method 'resize()' must be implemented.");
    }

    destroy() {
        throw new Error("Method 'destroy()' must be implemented.");
    }

    collisionChecks() {
        let collisionDetected = false;
        for (var gameObj of GameEnv.gameObjects) {
            if (gameObj.canvas && this !== gameObj) {
                this.isCollision(gameObj);
                if (this.collisionData.hit) {
                    collisionDetected = true;
                    this.handleCollisionEvent();
                }
            }
        }
        if (!collisionDetected) {
            this.state.collisionEvents = [];
        }
    }

    isCollision(other) {
        const thisRect = this.canvas.getBoundingClientRect();
        const otherRect = other.canvas.getBoundingClientRect();
        const thisWidthReduction = thisRect.width * (this.hitbox?.widthPercentage || 0.0);
        const thisHeightReduction = thisRect.height * (this.hitbox?.heightPercentage || 0.0);
        const otherWidthReduction = otherRect.width * (other.hitbox?.widthPercentage || 0.0);
        const otherHeightReduction = otherRect.height * (other.hitbox?.heightPercentage || 0.0);

        const thisLeft = thisRect.left + thisWidthReduction;
        const thisTop = thisRect.top + thisHeightReduction;
        const thisRight = thisRect.right - thisWidthReduction;
        const thisBottom = thisRect.bottom;
        const otherLeft = otherRect.left + otherWidthReduction;
        const otherTop = otherRect.top + otherHeightReduction;
        const otherRight = otherRect.right - otherWidthReduction;
        const otherBottom = otherRect.bottom;

        const hit = (
            thisLeft < otherRight &&
            thisRight > otherLeft &&
            thisTop < otherBottom &&
            thisBottom > otherTop
        );

        const touchPoints = {
            this: {
                id: this.canvas.id,
                greet: this.spriteData.greeting,
                top: thisBottom > otherTop && thisTop < otherTop,
                bottom: thisTop < otherBottom && thisBottom > otherBottom,
                left: thisRight > otherLeft && thisLeft < otherLeft,
                right: thisLeft < otherRight && thisRight > otherRight,
            },
            other: {
                id: other.canvas.id,
                greet: other.spriteData.greeting,
                top: otherBottom > thisTop && otherTop < thisTop,
                bottom: otherTop < thisBottom && otherBottom > thisBottom,
                left: otherRight > thisLeft && otherLeft < thisLeft,
                right: otherLeft < thisRight && otherRight > thisRight,
            },
        };
        this.collisionData = { hit, touchPoints };
    }

    handleCollisionEvent() {
        const objectOther = this.collisionData.touchPoints.other;
        if (!this.state.collisionEvents.includes(objectOther.id)) {
            this.state.collisionEvents.push(objectOther.id);
            this.handleCollisionReaction(objectOther);
        }
        this.handleCollisionState();
    }

    handleCollisionReaction(other) {
        console.log(`Collision detected with ${other.id}`);
        if (other.id === 'quizObject') {
            console.log('Triggered a quiz!');
            GameEnv.triggerQuiz();
        }
        if (other.id === 'workoutEquipment') {
            console.log('Triggered a workout session!');
            GameEnv.startWorkout();
        }
    }

    handleCollisionState() {
        if (this.state.collisionEvents.length > 0) {
            const touchPoints = this.collisionData.touchPoints.this;
            this.state.movement = { up: true, down: true, left: true, right: true };

            if (touchPoints.top) {
                this.state.movement.down = false;
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                }
            }

            if (touchPoints.bottom) {
                this.state.movement.up = false;
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                }
            }

            if (touchPoints.right) {
                this.state.movement.left = false;
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                }
            }

            if (touchPoints.left) {
                this.state.movement.right = false;
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                }
            }
        }
    }
}

export default GameObject;