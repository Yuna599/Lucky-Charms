// RPG Game: Ali's Strength Quest

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;

document.addEventListener("keydown", moveAli);

// Game Variables
let gameState = "start"; // start, gym, disneyland, end
let strength = 0;
let questions = [
    { q: "What is 2+2?", choices: ["3", "4", "5"], answer: 1 },
    { q: "What is the capital of France?", choices: ["Berlin", "Paris", "Rome"], answer: 1 },
    { q: "What color is the sky?", choices: ["Blue", "Green", "Red"], answer: 0 }
];
let currentQuestion = 0;

// Player Position
let aliX = 300;
let aliY = 300;
let speed = 10;

// Assets
let aliImg = new Image();
aliImg.src = "images/gamify/Ali_Before_Buffed.png";
let buffedAliImg = new Image();
buffedAliImg.src = "images/gamify/pixil-frame-0 (3).png";
let gymImg = new Image();
gymImg.src = "images/gamify/gym.png";
let disneyImg = new Image();
disneyImg.src = "images/gamify/disneyland.png";

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameState === "start") {
        ctx.fillText("Welcome to Ali's Strength Quest!", 300, 100);
        ctx.fillText("Click to Start", 350, 200);
    } else if (gameState === "gym") {
        ctx.drawImage(gymImg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(aliImg, aliX, aliY, 100, 100);
        ctx.fillText("Strength: " + strength, 50, 50);
        ctx.fillText(questions[currentQuestion].q, 50, 100);
        questions[currentQuestion].choices.forEach((choice, index) => {
            ctx.fillText(index + 1 + ") " + choice, 50, 150 + index * 30);
        });
    } else if (gameState === "disneyland") {
        ctx.drawImage(disneyImg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(strength >= 800 ? buffedAliImg : aliImg, aliX, aliY, 100, 100);
        ctx.fillText("Ali tries to pull the sword...", 300, 100);
        ctx.fillText(strength >= 800 ? "Ali is victorious!" : "Not strong enough!", 320, 200);
    }
}

// Handle movement
function moveAli(event) {
    if (event.key === "ArrowLeft") aliX -= speed;
    if (event.key === "ArrowRight") aliX += speed;
    if (event.key === "ArrowUp") aliY -= speed;
    if (event.key === "ArrowDown") aliY += speed;
    draw();
}

// Handle click events
canvas.addEventListener("click", () => {
    if (gameState === "start") {
        gameState = "gym";
    } else if (gameState === "gym") {
        let userAnswer = prompt(questions[currentQuestion].q + "\n" + questions[currentQuestion].choices.join("\n"));
        if (parseInt(userAnswer) - 1 === questions[currentQuestion].answer) {
            strength += 50;
        } else {
            strength -= 10;
        }
        currentQuestion = (currentQuestion + 1) % questions.length;
        if (strength >= 800) aliImg = buffedAliImg;
    } else if (gameState === "disneyland") {
        if (strength >= 800) {
            gameState = "end";
        } else {
            gameState = "gym";
        }
    }
    draw();
});

// Start game loop
draw();