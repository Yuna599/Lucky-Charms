import GameEnv from './GameEnv.js';
import GameLevelDisneyland from './GameLevelDisneyland.js';
import GameLevelGym from './GameLevelGym.js';
import { getStats } from "/Lucky-Charms/assets/js/adventureGame/StatsManager.js";

const createStatsUI = () => {
    const statsContainer = document.createElement('div');
    statsContainer.id = 'stats-container';
    statsContainer.style.position = 'fixed';
    statsContainer.style.top = '10px';
    statsContainer.style.right = '10px';
    statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    statsContainer.style.color = 'white';
    statsContainer.style.padding = '10px';
    statsContainer.style.borderRadius = '5px';
    statsContainer.innerHTML = `
        <div>Strength: <span id="strength">0</span></div>
        <div>Quiz Score: <span id="quizScore">0</span></div>
        <div>Attempts: <span id="attempts">0</span></div>
    `;
    document.body.appendChild(statsContainer);
};

const GameControl = {
    intervalID: null,
    localStorageTimeKey: "localTimes",
    currentLevelIndex: 0,
    levels: [],
    currentLevelInstance: null,

    start: function() {
        GameEnv.create();
        this.levels = [GameLevelDisneyland, GameLevelGym];
        this.currentLevelIndex = 0;
        this.addExitKeyListener();
        this.loadLevel();
    },
    
    loadLevel: function() {
        if (this.currentLevelIndex >= this.levels.length) {
            this.stopTimer();
            return;
        }
        GameEnv.continueLevel = true;
        GameEnv.gameObjects = [];
        
        const LevelClass = this.levels[this.currentLevelIndex];
        this.currentLevelInstance = new LevelClass(this);
        this.currentLevelInstance.loadLevel();

        this.initStatsUI();
        this.gameLoop();
        updateAllStats(); // ✅ FIXED FUNCTION CALL
    },

    gameLoop: function() {
        if (!GameEnv.continueLevel) {
            this.handleLevelEnd();
            return;
        }
        GameEnv.clear();
        
        if (this.currentLevelInstance && this.currentLevelInstance.update) {
            this.currentLevelInstance.update();
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    },

    handleLevelEnd: function() {
        if (this.currentLevelIndex < this.levels.length - 1) {
            alert("Great job! Now heading to the next level.");
        } else {
            alert("Congratulations! You've completed the game.");
        }
        
        this.currentLevelIndex++;
        this.loadLevel();
    },
    
    addExitKeyListener: function() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                GameEnv.continueLevel = false;
            }
        });
    },

    initStatsUI: function() {
        if (!document.getElementById('stats-container')) {
            createStatsUI();
        }
    },
};

window.addEventListener('resize', GameControl.resize?.bind(GameControl));
export default GameControl;
