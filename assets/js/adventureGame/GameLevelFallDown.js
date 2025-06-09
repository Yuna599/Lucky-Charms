class GameLevelFallDown {
  constructor() {
    let gameArea = document.getElementById("gameArea");
    if (!gameArea) {
      gameArea = document.createElement("div");
      gameArea.id = "gameArea";
      gameArea.style.position = "relative";
      gameArea.style.width = "1000px"; // Increased width
      gameArea.style.height = "700px"; // Increased height
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
      player.style.left = "370px"; // Adjusted for wider gameArea
      gameArea.appendChild(player);
    }

    if (!fallingObject) {
      fallingObject = document.createElement("div");
      fallingObject.id = "fallingObject";
      fallingObject.style.position = "absolute";
      fallingObject.style.width = "70px";
      fallingObject.style.height = "70px";
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
    let playerX = 370; // Adjusted for wider gameArea
    let objectY = 0;
    let objectX = Math.random() * 760; // Adjusted for wider gameArea
    let isPaused = false;

    function movePlayer(event) {
      if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
      } else if (event.key === "ArrowRight" && playerX < 740) { // Adjusted for wider gameArea
        playerX += 20;
      }
      player.style.left = `${playerX}px`;
    }

    function resetObject() {
      objectY = 0;
      objectX = Math.random() * 760; // Adjusted for wider gameArea
      fallingObject.style.left = `${objectX}px`;
    }

    function endGame() {
      isPaused = true; // Stop the game loop
      const gameOverMessage = document.createElement("div");
      gameOverMessage.textContent = "Game Over! You reached a score of 5!";
      gameOverMessage.style.position = "absolute";
      gameOverMessage.style.top = "50%";
      gameOverMessage.style.left = "50%";
      gameOverMessage.style.transform = "translate(-50%, -50%)";
      gameOverMessage.style.color = "#fff";
      gameOverMessage.style.fontSize = "24px";
      gameOverMessage.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      gameOverMessage.style.padding = "20px";
      gameOverMessage.style.borderRadius = "10px";
      gameOverMessage.style.textAlign = "center";
      gameOverMessage.style.zIndex = "10000";
      document.body.appendChild(gameOverMessage);

      setTimeout(() => {
        window.location.href = "/Lucky-Charms/gamify/gym.html"; // Redirect back to GameLevelGym
      }, 2000); // Wait for 2 seconds before redirecting
    }

    function gameLoop() {
      if (isPaused) return; // Stop the game loop if paused

      objectY += 4;
      fallingObject.style.top = `${objectY}px`;

      const objectBottom = objectY + 40;
      const playerTop = 580; // Adjusted for taller gameArea
      const playerBottom = 600; // Adjusted for taller gameArea

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

        if (score >= 5) {
          endGame(); // End the game when score reaches 5
          return;
        }
      }

      if (objectY > 600) { // Adjusted for taller gameArea
        resetObject();
      }

      requestAnimationFrame(gameLoop);
    }

    // Create a physical button element
    const pauseButton = document.createElement("button");
    pauseButton.textContent = "Pause and Restart Gym";
    pauseButton.style.position = "absolute";
    pauseButton.style.top = "20px";
    pauseButton.style.right = "20px";
    pauseButton.style.padding = "10px 15px";
    pauseButton.style.backgroundColor = "#111";
    pauseButton.style.color = "#fff";
    pauseButton.style.border = "2px solid white";
    pauseButton.style.fontFamily = "monospace";
    pauseButton.style.fontSize = "14px";
    pauseButton.style.cursor = "pointer";
    pauseButton.style.zIndex = "10000";

    pauseButton.onclick = () => {
      isPaused = true; // Pause the game
      window.location.href = "/Lucky-Charms/gamify/gym.html"; // Redirect to Gym Game
    };

    document.body.appendChild(pauseButton);

    document.addEventListener("keydown", movePlayer);
    resetObject();
    gameLoop();
  }
}

export default GameLevelFallDown;