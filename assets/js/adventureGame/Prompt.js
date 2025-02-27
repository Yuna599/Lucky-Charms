import statsManager from "./StatsManager.js";

const Prompt = {
    isOpen: false,
    dim: false,

    backgroundDim: {
        create() {
            this.dim = true;
            console.log("CREATE DIM");
            const dimDiv = document.createElement("div");
            dimDiv.id = "dim";
            dimDiv.style.backgroundColor = "black";
            dimDiv.style.width = "100%";
            dimDiv.style.height = "100%";
            dimDiv.style.position = "absolute";
            dimDiv.style.opacity = "0.8";
            document.body.append(dimDiv);
            dimDiv.style.zIndex = "9998";
            dimDiv.addEventListener("click", Prompt.backgroundDim.remove);
        },
        remove() {
            this.dim = false;
            console.log("REMOVE DIM");
            const dimDiv = document.getElementById("dim");
            if (dimDiv) dimDiv.remove();
            Prompt.isOpen = false;
        },
    },

    createPromptDisplayTable() {
        const table = document.createElement("table");
        table.className = "table prompt";

        // Header row for questions
        const header = document.createElement("tr");
        const th = document.createElement("th");
        th.colSpan = 2;
        th.innerText = "Answer the Questions Below:";
        header.appendChild(th);
        table.appendChild(header);

        return table;
    },

    updatePromptTable() {
        const table = this.createPromptDisplayTable();

        if (this.currentNpc && this.currentNpc.questions) {
            this.currentNpc.questions.forEach((questionObj, index) => {
                const row = document.createElement("tr");

                // Question cell
                const questionCell = document.createElement("td");
                questionCell.innerText = `${index + 1}. ${questionObj.question}`;
                row.appendChild(questionCell);

                // Input cell
                const inputCell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Your answer here...";
                input.dataset.index = index; // Save index for validation
                inputCell.appendChild(input);
                row.appendChild(inputCell);

                table.appendChild(row);
            });

            // Submit button
            const submitRow = document.createElement("tr");
            const submitCell = document.createElement("td");
            submitCell.colSpan = 2;
            submitCell.style.textAlign = "center";
            const submitButton = document.createElement("button");
            submitButton.innerText = "Submit";
            submitButton.addEventListener("click", this.handleSubmit.bind(this)); // Attach submission handler
            submitCell.appendChild(submitButton);
            submitRow.appendChild(submitCell);
            table.appendChild(submitRow);
        } else {
            const row = document.createElement("tr");
            const noQuestionsCell = document.createElement("td");
            noQuestionsCell.colSpan = 2;
            noQuestionsCell.innerText = "No questions available.";
            row.appendChild(noQuestionsCell);
            table.appendChild(row);
        }

        // Scrollable container
        const container = document.createElement("div");
        container.style.maxHeight = "400px";
        container.style.overflowY = "auto";
        container.style.border = "1px solid #ccc";
        container.style.padding = "10px";
        container.appendChild(table);
        return container;
    },

    handleSubmit() {
        const inputs = document.querySelectorAll("input[type='text']");
        const answers = Array.from(inputs).map(input => ({
            index: input.dataset.index,
            answer: input.value.trim(),
        }));

        let correctCount = 0;
        let incorrectCount = 0;

        answers.forEach(({ index, answer }) => {
            const correctAnswer = this.currentNpc.questions[index].answer.trim().toLowerCase();
            if (answer.toLowerCase() === correctAnswer) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });

        // Adjust Ali's strength
        if (correctCount > 0) {
            statsManager.addStrength(correctCount * 50);
        }
        if (incorrectCount > 0) {
            statsManager.reduceStrength(incorrectCount * 10);
        }

        alert(`Correct: ${correctCount}, Incorrect: ${incorrectCount}`);
        this.isOpen = false;
        this.backgroundDim.remove();
    },

    openPromptPanel(npc) {
        this.currentNpc = npc; // Assign the current NPC
        const promptDropDown = document.querySelector('.promptDropDown');
        const promptTitle = document.getElementById("promptTitle");
    
        promptTitle.innerHTML = npc.quiz.title || "Questions";
        this.isOpen = true;
    
        if (this.isOpen) {
            Prompt.backgroundDim.create();
    
            // Remove old table
            const oldTable = document.getElementsByClassName("table scores")[0];
            if (oldTable) oldTable.remove();
    
            // Update questions
            Prompt.updatePromptDisplay();
    
            // Display prompt
            promptDropDown.style.position = "fixed";
            promptDropDown.style.zIndex = "9999";
            promptDropDown.style.width = "70%";
            promptDropDown.style.top = "15%";
            promptDropDown.style.left = "15%";
            promptDropDown.style.transition = "all 0.3s ease-in-out";
        }
    },

    initializePrompt() {
        const promptTitle = document.createElement("div");
        promptTitle.id = "promptTitle";
        document.getElementById("promptDropDown").appendChild(promptTitle);
    },
};

export default Prompt;

