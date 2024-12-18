<style>
    body {
        background-color: #e0f7fa; /* Light greenish-blue */
    }

    .wrap {
        margin-left: auto;
        margin-right: auto;
    }

    canvas {
        display: none;
        border-style: solid;
        border-width: 10px;
        border-color: #00796b; /* Teal */
        background-color: #004d40; /* Dark greenish-blue */
    }

    canvas:focus {
        outline: none;
    }

    /* Text Colors */
    #gameover p, #setting p, #menu p {
        font-size: 20px;
        color: #004d40; /* Dark greenish-blue */
    }

    #gameover a, #setting a, #menu a {
        font-size: 30px;
        display: block;
        color: #00796b; /* Teal */
        text-decoration: none;
    }

    #gameover a:hover, #setting a:hover, #menu a:hover {
        cursor: pointer;
        color: #004d40; /* Darker teal on hover */
    }

    #gameover a:hover::before, #setting a:hover::before, #menu a:hover::before {
        content: ">";
        margin-right: 10px;
    }

    /* Active Settings Highlight */
    #setting input:checked + label {
        background-color: #00796b; /* Teal */
        color: #e0f7fa; /* Light greenish-blue */
    }
</style>

<script>
    (function () {
        const canvas = document.getElementById("snake");
        const ctx = canvas.getContext("2d");

        // Snake repaint colors
        const snakeColor = "#80cbc4"; // Aquamarine
        const foodColor = "#004d40"; // Dark greenish-blue
        const backgroundColor = "#004d40"; // Dark background

        let activeDot = function (x, y) {
            // Snake and food parts
            ctx.fillStyle = snakeColor;
            ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
        };

        let mainLoop = function () {
            // Repaint canvas
            ctx.beginPath();
            ctx.fillStyle = backgroundColor; // Background fill
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Paint snake
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = snakeColor;
                ctx.fillRect(snake[i].x * BLOCK, snake[i].y * BLOCK, BLOCK, BLOCK);
            }

            // Paint food
            ctx.fillStyle = foodColor;
            ctx.fillRect(food.x * BLOCK, food.y * BLOCK, BLOCK, BLOCK);

            setTimeout(mainLoop, snake_speed);
        };

        let setWall = function (wall_value) {
            wall = wall_value;
            if (wall === 0) {
                screen_snake.style.borderColor = "#004d40"; // Dark border
            }
            if (wall === 1) {
                screen_snake.style.borderColor = "#00796b"; // Teal border
            }
        };
    })();
</script>

