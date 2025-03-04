export class GameLevel {
    constructor(levelName, background, character, enemies = []) {
        this.levelName = levelName;
        this.background = background;
        this.character = character;
        this.enemies = enemies;
    }
    render(ctx) {
        this.background.draw(ctx);
        this.character.draw(ctx);
        this.enemies.forEach(enemy => enemy.draw(ctx));
    }
    update() {
        this.enemies.forEach(enemy => enemy.moveToward(this.character.x, this.character.y));
    }
}