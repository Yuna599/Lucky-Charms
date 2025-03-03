import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';

class GameLevelDesert {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
    console.log('Initializing GameLevelDesert...');
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Player data for Ali before buffed up
    const sprite_src_ali = path + "/images/gamify/pixil-frame-0__2_-removebg-preview.png"; // be sure to include the path
    const ALI_SCALE_FACTOR = 5;
    const sprite_data_ali = {
        id: 'Ali before buffed up',
        greeting: "Hi I am Ali, the main character. I am looking for wisdom and adventure!",
        src: sprite_src_ali,
        SCALE_FACTOR: ALI_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height / ALI_SCALE_FACTOR) }, 
        pixels: {height: 384, width: 512},
        orientation: {
            rows: 3,
            columns: 4,
            down: { row: 0, start: 0, columns: 3 },
            downRight: { row: 1, start: 0, columns: 3, rotate: Math.PI / 16 },
            downLeft: { row: 2, start: 0, columns: 3, rotate: -Math.PI / 16 },
            left: { row: 2, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            up: { row: 3, start: 0, columns: 3 },
            upLeft: { row: 2, start: 0, columns: 3, rotate: Math.PI / 16 },
            upRight: { row: 1, start: 0, columns: 3, rotate: -Math.PI / 16 }
        },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    console.log('Player data:', sprite_data_ali);

    // Define sprite_greet_npc before using it
    const sprite_greet_npc = "Hi I am your helper. I am very happy to spend some time with you!";

    // NPC data for npc.png
    const sprite_src_npc = path + "/images/gamify/npc.png"; // be sure to include the path
    const sprite_data_npc = {
        id: 'npc',
        greeting: sprite_greet_npc,
        src: sprite_src_npc,
        SCALE_FACTOR: 16,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 352},
        INIT_POSITION: { x: (width / 2), y: (height / 2)},
        orientation: {rows: 8, columns: 11 },
        down: {row: 5, start: 0, columns: 3 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Linux command quiz
        quiz: { 
          title: "Linux Command Quiz",
          questions: [
            "Which command is used to list files in a directory?\n1. ls\n2. dir\n3. list\n4. show",
            "Which command is used to change directories?\n1. cd\n2. chdir\n3. changedir\n4. changedirectory",
            "Which command is used to create a new directory?\n1. mkdir\n2. newdir\n3. createdir\n4. makedir",
            "Which command is used to remove a file?\n1. rm\n2. remove\n3. delete\n4. erase",
            "Which command is used to remove a directory?\n1. rmdir\n2. removedir\n3. deletedir\n4. erasedir",
            "Which command is used to copy files?\n1. cp\n2. copy\n3. duplicate\n4. xerox",
            "Which command is used to move files?\n1. mv\n2. move\n3. transfer\n4. relocate",
            "Which command is used to view a file?\n1. cat\n2. view\n3. show\n4. display",
            "Which command is used to search for text in a file?\n1. grep\n2. search\n3. find\n4. locate",
            "Which command is used to view the contents of a file?\n1. less\n2. more\n3. view\n4. cat" 
          ] 
        },
        reaction: function() {
          alert(sprite_greet_npc);
        },
        interact: function() {
          let quiz = new Quiz(); // Create a new Quiz instance
          quiz.initialize();
          quiz.openPanel(sprite_data_npc.quiz);
        }
    };

    console.log('NPC data for npc:', sprite_data_npc);

    // List of objects definitions for this level
    this.classes = [
      { class: Player, data: sprite_data_ali }, // Add Player to the game level
      { class: Npc, data: sprite_data_npc } // Smaller NPC
    ];

    console.log('Game objects for GameLevelDesert:', this.classes);
  }
}

export default GameLevelDesert;