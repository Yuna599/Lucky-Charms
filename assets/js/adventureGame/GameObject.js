/**
 * The GameObject class serves as a base class for all game objects.
 * It mimics an interface by defining abstract methods that must be implemented
 * by any subclass. This ensures that all game objects have a consistent interfaces
 * and can be managed uniformly within GameControl.js.
 * 
 * @class GameObject
 * @method draw - Draws the object on the canvas. Must be implemented by subclasses.
 * @method update - Updates the object's state. Must be implemented by subclasses.
 * @method resize - Resizes the object based on the canvas size. Must be implemented by subclasses.
 * @method destroy - Removes the object from the game environment. Must be implemented by subclasses.
 * @method collisionChecks - Checks for collisions with other game objects.
 * @method isCollision - Detects collisions with other game objects.
 * @method handleCollisionEvent - Updates the collisions array when player is touching the object.
 * @method handleReaction - Handles player reaction / state updates to the collision.
 */
class GameObject {
    /**
     * Constructor for the GameObject class.
     * Throws an error if an attempt is made to instantiate this class directly,
     * as it is intended to be used as a base class.
     */
    constructor(gameEnv = null) {
        if (new.target === GameObject) {
            throw new TypeError("Cannot construct GameObject instances directly");
        }
        this.gameEnv = gameEnv; // GameEnv instance
        this.collisionWidth = 0;
        this.collisionHeight = 0;
        this.collisionData = {};
        this.hitbox = {};
        this.state = {
            collisionEvents: [],
            movement: { up: true, down: true, left: true, right: true },
        };

        // Ensure sprite sheets are validated during initialization
        this.initializeSprites();
    }

    /**
     * Updates the object's state.
     * This method must be implemented by subclasses.
     * @abstract
     */
    update() {
        throw new Error("Method 'update()' must be implemented.");
    }

    /**
     * Draws the object on the canvas.
     * This method must be implemented by subclasses.
     * @abstract
     */
    draw() {
        throw new Error("Method 'draw()' must be implemented.");
    }

    /**
     * Resizes the object based on the canvas size.
     * This method must be implemented by subclasses.
     * @abstract
     */
    resize() {
        throw new Error("Method 'resize()' must be implemented.");
    }

    /**
     * Removes the object from the game environment.
     * This method must be implemented by subclasses.
     * @abstract
     */
    destroy() {
        throw new Error("Method 'destroy()' must be implemented.");
    }

    /** Collision checks
     * uses Player isCollision to detect hit
     * calls collisionAction on hit
     */
    collisionChecks() {
        let collisionDetected = false;

        for (var gameObj of this.gameEnv.gameObjects) {
            if (gameObj.canvas && this != gameObj) {
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

    /** Collision detection method
     * usage: if (object.isCollision(platform)) { // action }
     */
    isCollision(other) {
        // Bounding rectangles from Canvas
        const thisRect = this.canvas.getBoundingClientRect();
        const otherRect = other.canvas.getBoundingClientRect();

        // Calculate hitbox constants for this object
        const thisWidthReduction = thisRect.width * (this.hitbox?.widthPercentage || 0.0);
        const thisHeightReduction = thisRect.height * (this.hitbox?.heightPercentage || 0.0);

        // Calculate hitbox constants for other object
        const otherWidthReduction = otherRect.width * (other.hitbox?.widthPercentage || 0.0);
        const otherHeightReduction = otherRect.height * (other.hitbox?.heightPercentage || 0.0);

        // Build hitbox by subtracting reductions from the left, right, and top
        const thisLeft = thisRect.left + thisWidthReduction;
        const thisTop = thisRect.top + thisHeightReduction;
        const thisRight = thisRect.right - thisWidthReduction;
        const thisBottom = thisRect.bottom;

        const otherLeft = otherRect.left + otherWidthReduction;
        const otherTop = otherRect.top + otherHeightReduction;
        const otherRight = otherRect.right - otherWidthReduction;
        const otherBottom = otherRect.bottom;

        // Determine hit and touch points of hit
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
                reaction: other.spriteData.reaction,
                top: otherBottom > thisTop && otherTop < thisTop,
                bottom: otherTop < thisBottom && otherBottom > thisBottom,
                left: otherRight > thisLeft && otherLeft < thisLeft,
                right: otherLeft < thisRight && otherRight > thisRight,
            },
        };

        this.collisionData = { hit, touchPoints };
    }

    /**
     * Update the collisions array when player is touching the object
     * @param {*} objectID 
     */
    handleCollisionEvent() {
        const objectOther = this.collisionData.touchPoints.other;
        // check if the collision type is not already in the collisions array
        if (!this.state.collisionEvents.includes(objectOther.id)) {
            // add the collisionType to the collisions array, making it the current collision
            this.state.collisionEvents.push(objectOther.id);
            this.handleCollisionReaction(objectOther);
        }
        this.handleCollisionState();
    }

    /**
     * Handles the reaction to the collision, this could be overridden by subclasses
     * @param {*} other 
     */
    handleCollisionReaction(other) {
        if (other.reaction && typeof other.reaction === "function") {
            other.reaction();
            return;
        }
        console.log(other.greet);
    }

    /**
     * Handles Player state updates related to the collision
     */
    handleCollisionState() {
        // handle player reaction based on collision type
        if (this.state.collisionEvents.length > 0) {
            const touchPoints = this.collisionData.touchPoints.this;

            // Reset movement to allow all directions initially
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

            // Comment out or remove this line to suppress the log
            // console.log("KABOOM!!");
        }
    }

    /**
     * Validates the sprite source to ensure it is loaded correctly.
     * @param {Object} spriteData - The sprite data containing the source and ID.
     */
    validateSpriteSource(spriteData) {
        const img = new Image();
        img.src = spriteData.src;
        img.onerror = () => {
            console.error(`Sprite sheet for ${spriteData.id} is not loaded or is in a broken state.`);
            spriteData.src = ""; // Reset the source to prevent further errors
        };
    }

    /**
     * Initializes sprites by validating their sources.
     */
    initializeSprites() {
        if (this.spriteData) {
            this.validateSpriteSource(this.spriteData);
        }
    }
}

export default GameObject;