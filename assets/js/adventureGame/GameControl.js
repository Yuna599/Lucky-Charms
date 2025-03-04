export default class GameControl {
    constructor() {
        this.gameState = "start";
    }
    changeState(newState) {
        this.gameState = newState;
    }
    start() {
        console.log("Game Started!");
        this.gameState = "gym"; // Start in gym level
    }
}
