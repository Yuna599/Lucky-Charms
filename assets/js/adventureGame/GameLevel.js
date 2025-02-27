import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';

class GameLevel {
  constructor(path, levelName) {
    const width = GameEnv.innerWidth;
    const height = GameEnv.innerHeight;

    // Define background images per level
    const backgrounds = {
      gym: `${path}/images/gym_background.png`,
      disneyland: `${path}/images/disneyland_background.png`,
    };

    const backgroundData = {
      name: levelName,
      greeting: `Welcome to ${levelName}!`,
      src: backgrounds[levelName] || backgrounds.gym, // Default to gym if level not found
      pixels: { height: 580, width: 1038 },
    };

    // Define Player data (Ali)
    const spriteDataAli = {
      id: 'Ali',
      greeting: "I'm Ali! Ready to train and get stronger!",
      src: `${path}/images/ali_sprite.png`,
      SCALE_FACTOR: 5,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: 0, y: height - (height / 5) },
      pixels: { height: 384, width: 512 },
      orientation: { rows: 3, columns: 4 },
      down: { row: 0, start: 0, columns: 3 },
      left: { row: 2, start: 0, columns: 3 },
      right: { row: 1, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 },
    };

    // Define NPCs (Trainers, Quiz Masters, etc.)
    const npcs = {
      trainer: {
        id: 'Trainer',
        greeting: "I'm your trainer! Answer correctly to get stronger!",
        src: `${path}/images/trainer.png`,
        SCALE_FACTOR: 6,
        INIT_POSITION: { x: width / 2, y: height / 2 },
        pixels: { height: 300, width: 400 },
        quiz: {
          title: "Fitness Quiz",
          questions: [
            "What is the primary muscle worked during a squat?\n1. Quadriceps\n2. Biceps\n3. Triceps\n4. Deltoids",
            "Which nutrient is essential for muscle growth?\n1. Protein\n2. Carbohydrates\n3. Fats\n4. Vitamins",
          ],
        },
      },
      mascot: {
        id: 'Disney Mascot',
        greeting: "Welcome to Disneyland! Let's have some fun!",
        src: `${path}/images/mascot.png`,
        SCALE_FACTOR: 8,
        INIT_POSITION: { x: width / 3, y: height / 3 },
        pixels: { height: 320, width: 350 },
      },
    };

    // Assign NPCs based on level
    const levelNpcs = levelName === 'gym' ? [npcs.trainer] : [npcs.mascot];

    // Store objects for the level
    this.objects = [
      { class: Background, data: backgroundData },
      { class: Player, data: spriteDataAli },
      ...levelNpcs.map(npc => ({ class: Npc, data: npc })),
    ];
  }
}

export default GameLevel;
