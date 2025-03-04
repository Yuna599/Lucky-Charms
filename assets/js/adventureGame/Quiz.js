export class Quiz {
    constructor() {
        this.questions = [
            { q: "What is 2+2?", choices: ["3", "4", "5"], answer: 1 },
            { q: "What is the capital of France?", choices: ["Berlin", "Paris", "Rome"], answer: 1 }
        ];
        this.currentQuestion = 0;
        this.strength = 0;
    }
    askQuestion() {
        let userAnswer = prompt(this.questions[this.currentQuestion].q + "\n" + this.questions[this.currentQuestion].choices.join("\n"));
        if (parseInt(userAnswer) - 1 === this.questions[this.currentQuestion].answer) {
            this.strength += 50;
        } else {
            this.strength -= 10;
        }
        this.currentQuestion = (this.currentQuestion + 1) % this.questions.length;
    }
}
