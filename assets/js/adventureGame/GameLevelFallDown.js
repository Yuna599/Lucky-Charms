const player = document.getElementById("player");
const fallingObject = document.getElementById("fallingObject");
const scoreDisplay = document.getElementById("score");

if (!player || !fallingObject) {
    console.error("Required game elements are missing. Ensure 'player' and 'fallingObject' exist in the DOM.");
    return;
}

let score = 0;
let playerX = 170;
let objectY = 0;
let objectX = Math.random() * 380;

// Apply inline styles dynamically
function applyStyles() {
  document.body.style.fontFamily = "Arial, sans-serif";
  document.body.style.textAlign = "center";
  document.body.style.backgroundColor = "#f0f8ff";

  const gameArea = document.getElementById("gameArea");
  if (gameArea) {
    gameArea.style.width = "400px";
    gameArea.style.height = "500px";
    gameArea.style.margin = "0 auto";
    gameArea.style.backgroundColor = "#e0e0e0";
    gameArea.style.position = "relative";
    gameArea.style.border = "2px solid #333";
    gameArea.style.overflow = "hidden";
  }

  const player = document.getElementById("player");
  if (player) {
    player.style.width = "60px";
    player.style.height = "20px";
    player.style.backgroundColor = "#007bff";
    player.style.position = "absolute";
    player.style.bottom = "10px";
    player.style.left = "170px";
  }

  const fallingObject = document.getElementById("fallingObject");
  if (fallingObject) {
    fallingObject.style.width = "20px";
    fallingObject.style.height = "20px";
    fallingObject.style.backgroundColor = "red";
    fallingObject.style.position = "absolute";
    fallingObject.style.top = "0px";
    fallingObject.style.left = "50%";
  }

  const score = document.getElementById("score");
  if (score) {
    score.style.fontSize = "1.2em";
    score.style.marginTop = "10px";
  }
}

// Call the function to apply styles
applyStyles();

function movePlayer(event) {
  if (event.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  } else if (event.key === "ArrowRight" && playerX < 340) {
    playerX += 20;
  }
  player.style.left = `${playerX}px`;
}

function resetObject() {
  objectY = 0;
  objectX = Math.random() * 380;
  fallingObject.style.left = `${objectX}px`;
}

function gameLoop() {
  objectY += 4;
  fallingObject.style.top = `${objectY}px`;

  const objectBottom = objectY + 20;
  const playerTop = 480;
  const playerBottom = 500;

  if (
    objectBottom >= playerTop &&
    objectY <= playerBottom &&
    objectX + 20 >= playerX &&
    objectX <= playerX + 60
  ) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    resetObject();
  }

  if (objectY > 500) {
    resetObject();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", movePlayer);
resetObject();
gameLoop();
