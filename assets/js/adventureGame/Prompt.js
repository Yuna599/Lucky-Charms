const Prompt = {
    isOpen: false,
    dim: false,
    currentNpc: null,

    backgroundDim: {
        create() {
            this.dim = true;
            const dimDiv = document.createElement("div");
            dimDiv.id = "dim";
            dimDiv.style.backgroundColor = "black";
            dimDiv.style.width = "100%";
            dimDiv.style.height = "100%";
            dimDiv.style.position = "absolute";
            dimDiv.style.opacity = "0.8";
            dimDiv.style.zIndex = "9998";
            document.body.append(dimDiv);
            dimDiv.addEventListener("click", Prompt.backgroundDim.remove);
        },
        remove() {
            this.dim = false;
            const dimDiv = document.getElementById("dim");
            if (dimDiv) dimDiv.remove();
            Prompt.isOpen = false;
            document.getElementById("promptTitle").style.display = "none";
            document.querySelector(".promptDropDown").style.display = "none";
        }
    },

    openPromptPanel(npc) {
        const promptDropDown = document.querySelector('.promptDropDown');
        const promptTitle = document.getElementById("promptTitle");
        
        if (!promptDropDown || !promptTitle) {
            console.error("Prompt elements missing in the HTML!");
            return;
        }

        if (this.isOpen) {
            this.backgroundDim.remove();
        }

        this.currentNpc = npc;
        this.isOpen = true;

        promptDropDown.innerHTML = ""; 
        promptTitle.style.display = "block";
        promptTitle.innerHTML = npc.quiz?.title || "Questions";
        promptDropDown.appendChild(promptTitle);
        promptDropDown.appendChild(this.updatePromptTable());

        this.backgroundDim.create();
        promptDropDown.style.display = "block";
    },

    updatePromptTable() {
        const table = document.createElement("table");
        table.className = "table prompt";

        const header = document.createElement("tr");
        const th = document.createElement("th");
        th.colSpan = 2;
        th.innerText = "Answer the Questions Below:";
        header.appendChild(th);
        table.appendChild(header);

        if (this.currentNpc && this.currentNpc.questions) {
            this.currentNpc.questions.forEach((question, index) => {
                const row = document.createElement("tr");
                const questionCell = document.createElement("td");
                questionCell.innerText = `${index + 1}. ${question.question}`;
                row.appendChild(questionCell);
                const inputCell = document.createElement("td");
                question.choices.forEach((choice, i) => {
                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = `question${index}`;
                    input.value = choice;
                    input.id = `question${index}_choice${i}`;
                    const label = document.createElement("label");
                    label.htmlFor = input.id;
                    label.innerText = choice;
                    inputCell.appendChild(input);
                    inputCell.appendChild(label);
                    inputCell.appendChild(document.createElement("br"));
                });
                row.appendChild(inputCell);
                table.appendChild(row);
            });

            const submitRow = document.createElement("tr");
            const submitCell = document.createElement("td");
            submitCell.colSpan = 2;
            submitCell.style.textAlign = "center";
            const submitButton = document.createElement("button");
            submitButton.id = "submitButton";
            submitButton.innerText = "Submit";
            submitButton.addEventListener("click", this.handleSubmit.bind(this)); // Bind the handleSubmit function
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

        const container = document.createElement("div");
        container.style.maxHeight = "400px";
        container.style.overflowY = "auto";
        container.style.border = "1px solid #ccc";
        container.style.padding = "10px";
        container.appendChild(table);
        return container;
    },

    handleSubmit() {
        const inputs = document.querySelectorAll("input[type='radio']:checked");
        const answers = Array.from(inputs).map(input => ({
            questionIndex: input.name.replace('question', ''),
            answer: input.value
        }));
        console.log("Submitted Answers:", answers);
        alert("Your answers have been submitted!");
        this.isOpen = false;
        this.backgroundDim.remove();
    },

    initializePrompt() {
        console.log("Prompt initialized");
        // Add any initialization logic here
    }
};

// Attach it after defining
document.addEventListener("DOMContentLoaded", function() {
    // Ensure the correct function is referenced if needed
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
        submitButton.addEventListener("click", Prompt.handleSubmit.bind(Prompt));
    }
});

export default Prompt;