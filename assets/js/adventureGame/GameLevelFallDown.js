class GameLevelFallDown {
  constructor() {
    let gameArea = document.getElementById("gameArea");
    if (!gameArea) {
      gameArea = document.createElement("div");
      gameArea.id = "gameArea";
      gameArea.style.position = "relative";
      gameArea.style.width = "400px";
      gameArea.style.height = "500px";
      gameArea.style.margin = "0 auto";
      gameArea.style.backgroundImage = "url('/Lucky-Charms/images/gamify/gymbackground.png')"; // Gym background
      gameArea.style.backgroundSize = "cover";
      gameArea.style.backgroundPosition = "center";
      gameArea.style.border = "2px solid #333";
      gameArea.style.overflow = "hidden";
      document.body.appendChild(gameArea);
    }

    let player = document.getElementById("player");
    let fallingObject = document.getElementById("fallingObject");
    let scoreDisplay = document.getElementById("score");

    // Dynamically create missing DOM elements inside gameArea
    if (!player) {
      player = document.createElement("div");
      player.id = "player";
      player.style.position = "absolute";
      player.style.width = "60px";
      player.style.height = "20px";
      player.style.backgroundColor = "#007bff";
      player.style.bottom = "10px";
      player.style.left = "170px";
      gameArea.appendChild(player);
    }

    if (!fallingObject) {
      fallingObject = document.createElement("div");
      fallingObject.id = "fallingObject";
      fallingObject.style.position = "absolute";
      fallingObject.style.width = "40px";
      fallingObject.style.height = "40px";
      fallingObject.style.backgroundImage = "url('/Lucky-Charms/images/gamify/gym3.png')"; // Falling object image
      fallingObject.style.backgroundSize = "contain";
      fallingObject.style.backgroundRepeat = "no-repeat";
      fallingObject.style.backgroundPosition = "center";
      fallingObject.style.top = "0px";
      fallingObject.style.left = "50%";
      gameArea.appendChild(fallingObject);
    }

    if (!scoreDisplay) {
      scoreDisplay = document.createElement("div");
      scoreDisplay.id = "score";
      scoreDisplay.textContent = "Score: 0";
      scoreDisplay.style.position = "absolute";
      scoreDisplay.style.top = "10px";
      scoreDisplay.style.left = "50%";
      scoreDisplay.style.transform = "translateX(-50%)";
      scoreDisplay.style.fontSize = "1.2em";
      scoreDisplay.style.color = "#fff";
      scoreDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      scoreDisplay.style.padding = "5px 10px";
      scoreDisplay.style.borderRadius = "5px";
      gameArea.appendChild(scoreDisplay);
    }

    let score = 0;
    let playerX = 170;
    let objectY = 0;
    let objectX = Math.random() * 360;

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
      objectX = Math.random() * 360;
      fallingObject.style.left = `${objectX}px`;
    }

    function gameLoop() {
      objectY += 4;
      fallingObject.style.top = `${objectY}px`;

      const objectBottom = objectY + 40;
      const playerTop = 480;
      const playerBottom = 500;

      if (
        objectBottom >= playerTop &&
        objectY <= playerBottom &&
        objectX + 40 >= playerX &&
        objectX <= playerX + 60
      ) {
        score++;
        if (scoreDisplay) {
          scoreDisplay.textContent = `Score: ${score}`;
        } else {
          console.error("Score display element is missing.");
        }
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
  }
}

export default GameLevelFallDown;
