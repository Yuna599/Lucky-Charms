---
layout: page 
title: simple crochet game
search_exclude: true
permalink: /simplegame/
---
# Play the Slope Game!

Use the left and right arrow keys to control the ball. Avoid obstacles to keep playing!

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slope Game</title>
  <style>
    body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
      color: white;
      font-family: Arial, sans-serif;
      overflow: hidden;
    }
    canvas {
      display: block;
      background: #222;
      border: 3px solid white;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    #score {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    }
  </style>
</head>
<body>
  <div id="score">Score: 0</div>
  <canvas id="gameCanvas"></canvas>
  <script>
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    // Game variables
    const ball = { x: canvas.width / 2, y: canvas.height - 50, radius: 10, speed: 4, dx: 0, dy: 2 };
    const obstacles = [];
    const obstacleWidth = 100;
    const obstacleHeight = 20;
    const obstacleSpacing = 150;
    let score = 0;
    let keys = {};

    // Generate initial obstacles
    function generateObstacles() {
      for (let i = 0; i < 5; i++) {
        obstacles.push({
          x: Math.random() * (canvas.width - obstacleWidth),
          y: -i * obstacleSpacing,
          width: obstacleWidth,
          height: obstacleHeight,
          speed: ball.dy,
        });
      }
    }

    // Handle keyboard input
    document.addEventListener("keydown", (e) => keys[e.key] = true);
    document.addEventListener("keyup", (e) => keys[e.key] = false);

    // Draw ball
    function drawBall() {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "lime";
      ctx.shadowColor = "lime";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;
    }

    // Draw obstacles
    function drawObstacles() {
      ctx.fillStyle = "#ff6347"; // Tomato color
      ctx.shadowColor = "rgba(255, 99, 71, 0.5)";
      ctx.shadowBlur = 10;
      obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });
      ctx.shadowBlur = 0;
    }

    // Update game objects
    function update() {
      // Ball movement
      if (keys["ArrowLeft"] && ball.x - ball.radius > 0) ball.dx = -ball.speed;
      if (keys["ArrowRight"] && ball.x + ball.radius < canvas.width) ball.dx = ball.speed;
      ball.x += ball.dx;

      // Friction to smooth out movement
      ball.dx *= 0.9;

      // Update obstacles
      obstacles.forEach(obstacle => {
        obstacle.y += obstacle.speed;

        // Reset obstacle position and increase score
        if (obstacle.y > canvas.height) {
          obstacle.y = -obstacleHeight;
          obstacle.x = Math.random() * (canvas.width - obstacleWidth);
          score++;
          document.getElementById("score").textContent = `Score: ${score}`;
          obstacle.speed += 0.1; // Increase speed for difficulty
        }

        // Collision detection
        if (
          ball.x + ball.radius > obstacle.x &&
          ball.x - ball.radius < obstacle.x + obstacle.width &&
          ball.y + ball.radius > obstacle.y &&
          ball.y - ball.radius < obstacle.y + obstacle.height
        ) {
          alert(`Game Over! Final Score: ${score}`);
          document.location.reload();
        }
      });

      // Prevent ball from falling out of bounds
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = 0;
      }
    }

    // Clear canvas and draw everything
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawObstacles();
    }

    // Main game loop
    function gameLoop() {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }

    // Start the game
    generateObstacles();
    gameLoop();
  </script>
</body>
</html>