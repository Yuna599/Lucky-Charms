---
layout: page 
title: simple crochet game
search_exclude: true
permalink: /simplegame/
---
# Play the Slope Game!

Use the left and right arrow keys to control the ball. Avoid obstacles to keep playing!

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slope Game</title>
  <style>
    canvas {
      display: block;
      margin: 20px auto;
      background: black;
      border: 2px solid white;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas"></canvas>
  <script>
    // Canvas setup
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    // Ball properties
    const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, dx: 0, dy: 2 };

    // Player controls
    let keys = {};

    // Obstacles
    const obstacles = [];
    const obstacleWidth = 80;
    const obstacleHeight = 20;
    const obstacleSpacing = 200;

    // Generate obstacles
    function generateObstacles() {
      for (let i = 0; i < 5; i++) {
        obstacles.push({
          x: Math.random() * (canvas.width - obstacleWidth),
          y: -i * obstacleSpacing,
          width: obstacleWidth,
          height: obstacleHeight
        });
      }
    }

    // Handle player input
    document.addEventListener("keydown", (e) => (keys[e.key] = true));
    document.addEventListener("keyup", (e) => (keys[e.key] = false));

    // Draw the ball
    function drawBall() {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "lime";
      ctx.fill();
      ctx.closePath();
    }

    // Draw obstacles
    function drawObstacles() {
      ctx.fillStyle = "red";
      obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });
    }

    // Update the game
    function update() {
      // Ball controls
      if (keys["ArrowLeft"] && ball.x - ball.radius > 0) ball.dx = -4;
      if (keys["ArrowRight"] && ball.x + ball.radius < canvas.width) ball.dx = 4;

      ball.x += ball.dx;
      ball.y += ball.dy;

      // Reset horizontal speed gradually
      ball.dx *= 0.9;

      // Update obstacle positions
      obstacles.forEach((obstacle) => {
        obstacle.y += ball.dy;
        if (obstacle.y > canvas.height) {
          obstacle.y = -obstacleHeight;
          obstacle.x = Math.random() * (canvas.width - obstacleWidth);
        }

        // Collision detection
        if (
          ball.x + ball.radius > obstacle.x &&
          ball.x - ball.radius < obstacle.x + obstacle.width &&
          ball.y + ball.radius > obstacle.y &&
          ball.y - ball.radius < obstacle.y + obstacle.height
        ) {
          alert("Game Over!");
          document.location.reload();
        }
      });

      // Prevent ball from leaving the canvas
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.dx = 0;
      if (ball.y - ball.radius > canvas.height) {
        alert("Game Over!");
        document.location.reload();
      }
    }

    // Clear canvas and draw all elements
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

    // Initialize the game
    generateObstacles();
    gameLoop();
  </script>
</body>
</html>