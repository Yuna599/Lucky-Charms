// GameControl.js
import GameLevel from "./GameLevel.js";
import Prompt from './Prompt.js';
import statsManager from './StatsManager.js';
import GymLevel from './GameLevelGym.js';
import DisneylandLevel from './GameLevelDisneyland.js';

const GameControl = {
    start: function() {
        console.log("Game started");
    },
    startTimer: function() {
        console.log("Timer started");
    }
};

export default GameControl;