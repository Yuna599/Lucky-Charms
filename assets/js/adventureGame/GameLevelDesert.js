// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';

class GameLevelDesert {
  constructor(gameEnv) {
    // Values dependent on this.gameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_desert = path + "/images/gamify/disneyland.png"; // be sure to include the path
    const image_src_gym = path + "/images/gamify/gym.png";
    let image_data_desert = {
        name: 'desert',
        greeting: "Welcome to the desert!  It is hot and dry here, but there are many adventures to be had!",
        src: image_src_desert,
        pixels: {height: 580, width: 1038}
    };
    const original_image_data_desert = { ...image_data_desert };

    function toggleDesertImage() {
      if (image_data_desert.src === image_src_desert) {
          // Switch to the Gym
          image_data_desert.src = image_src_gym;
          image_data_desert.name = 'gym';
          image_data_desert.greeting = "Welcome to the gym! Time to get stronger!";
      } else {
        image_data_desert = { ...original_image_data_desert };
      }
  
      updateBackground(image_data_desert.src);
    }
    

    // Player data for Chillguy
    const sprite_src_chillguy = path + "/images/gamify/Ali_Before_Buffed.png"; // be sure to include the path
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
        id: 'Chill Guy',
        greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/CHILLGUY_SCALE_FACTOR) }, 
        pixels: {height: 100, width: 100},
      // pixels: {height: 384, width: 512},
        orientation: {rows: 2, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
        downLeft: {row: 2, start: 0, columns: 3, rotate: -Math.PI/16 },
        left: {row: 2, start: 0, columns: 3 },
        right: {row: 1, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
        upLeft: {row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
        upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };


    // NPC data for Tux 
    const sprite_src_tux = path + "/images/gamify/npc.png"; // be sure to include the path
    const sprite_greet_tux = "Hello I'm Doggie, I can help you pull out this sword!";
    const audio = new Audio(path + '/assets/audio/sword.mp3'); // Replace with your audio file URL
    const sprite_data_tux = {
        id: 'Tux',
        greeting: sprite_greet_tux,
        src: sprite_src_tux,
        SCALE_FACTOR: 8,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 30,
        pixels: {height: 100, width: 100},
        INIT_POSITION: { x: (width / 2), y: (height / 2)},
        orientation: {rows: 2, columns: 3 },
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
          alert(sprite_greet_tux);
          audio.play();
        //},
        // interact: function() {
         // let quiz = new Quiz(); // Create a new Quiz instance
         // quiz.initialize();
         // quiz.openPanel(sprite_data_tux.quiz);
         startConversation();
        ;
        
        function startConversation() {
            if (!document.getElementById("dialogContainer")) {
                createDialogBox();
            } else {
                updateDialog("Hello again! Do you still need my help?");
            }
        }
        
        function createDialogBox() {
            const dialogContainer = document.createElement("div");
            dialogContainer.id = "dialogContainer";
        
            Object.assign(dialogContainer.style, {
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "400px",
                backgroundColor: "white",
                border: "2px solid black",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
                zIndex: "1000",
                textAlign: "center"
            });
        
            const dialogText = document.createElement("p");
            dialogText.id = "dialogText";
            dialogText.innerText = sprite_greet_tux;
            dialogContainer.appendChild(dialogText);
        
            const buttonContainer = document.createElement("div");
            buttonContainer.id = "buttonContainer";
            dialogContainer.appendChild(buttonContainer);
        
            document.body.appendChild(dialogContainer);
        
            updateChoices([
                { text: "How can I pull it out?", next: "pullSword" },
                { text: "Who are you?", next: "whoAreYou" }
            ]);
        }
        
        function updateDialog(newText) {
            document.getElementById("dialogText").innerText = newText;
        }
        
        function updateChoices(choices) {
            const buttonContainer = document.getElementById("buttonContainer");
            buttonContainer.innerHTML = ""; 
        
            choices.forEach(choice => {
                const button = document.createElement("button");
                button.innerText = choice.text;
                button.style.margin = "5px";
                button.style.padding = "10px";
                button.style.border = "none";
                button.style.cursor = "pointer";
                button.style.backgroundColor = "black";
                button.style.color = "white";
                button.style.borderRadius = "5px";
        
                button.addEventListener("click", () => handleChoice(choice.next));
                buttonContainer.appendChild(button);
            });
        }
        
        function handleChoice(next) {
            if (next === "pullSword") {
                updateDialog("The sword is stuck! You need strength and courage.");
                updateChoices([
                    { text: "Where can I find strength?", next: "findStrength" },
                    { text: "Where can I find courage?", next: "findCourage" }
                ]);
            } else if (next === "whoAreYou") {
                updateDialog("I am Doggie, the Guardian of the Sword!");
                updateChoices([
                    { text: "Can you help me?", next: "pullSword" },
                    { text: "Why do you guard the sword?", next: "guardSword" }
                ]);
            } else if (next === "findStrength") {
                updateDialog("You can train at the gym to build strength.");
                updateChoices([
                    { text: "Take me there!", next: "goToGym" },
                    { text: "Thanks, Doggie!", next: "end" }
                ]);
            } else if (next === "findCourage") {
                updateDialog("Courage comes from within, and facing your fears.");
                updateChoices([
                    { text: "I'm ready to pull the sword!", next: "pullSword" },
                    { text: "I need more time.", next: "end" }
                ]);
            } else if (next === "guardSword") {
                updateDialog("This sword holds great power. It must be wielded by the worthy.");
                updateChoices([
                    { text: "Am I worthy?", next: "pullSword" },
                    { text: "Who was the last person to try?", next: "lastWarrior" }
                ]);
            } else if (next === "lastWarrior") {
                updateDialog("The last warrior failed. He lacked patience.");
                updateChoices([
                    { text: "I won't fail!", next: "pullSword" },
                    { text: "This is too much pressure!", next: "end" }
                ]);
            } else if (next === "goToGym") {
                updateDialog("Let's go! Follow me!");
        
                setTimeout(() => {
                    toggleDesertImage(); // Instantly change the background to the gym
                    setTimeout(() => {
                        document.getElementById("dialogContainer").remove();
                    }, 1000);
                }, 1000);
            } else if (next === "end") {
                updateDialog("Come back if you need help!");
                setTimeout(() => {
                    document.getElementById("dialogContainer").remove();
                }, 1500);
                
            }
        }
        }}
         // }
         // };

    // List of objects defnitions for this level
    this.classes = [
      { class: Background, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_tux },
    ];
    
  }

}

export default GameLevelDesert;