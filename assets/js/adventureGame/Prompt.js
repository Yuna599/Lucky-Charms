const Prompt = {
    isOpen: false,
    dim: false,

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
            document.body.append(dimDiv);
            dimDiv.style.zIndex = "9998";
            dimDiv.addEventListener("click", Prompt.backgroundDim.remove);
        },
        remove() {
            this.dim = false;
            const dimDiv = document.getElementById("dim");
            dimDiv.remove();
            Prompt.isOpen = false;
            promptTitle.style.display = "none";
            promptDropDown.style.width = "0";
            promptDropDown.style.top = "0";
            promptDropDown.style.left = "-100%";
            promptDropDown.style.transition = "all 0.3s ease-in-out";
        },
    },

    createPromptDisplayTable() {
        const table = document.createElement("table");
        table.className = "table prompt";
    
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
            this.currentNpc.questions.forEach((question, index) => {
                const row = document.createElement("tr");
                const questionCell = document.createElement("td");
                questionCell.innerText = `${index + 1}. ${question}`;
                row.appendChild(questionCell);
                const inputCell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Your answer here...";
                input.dataset.questionIndex = index;
                inputCell.appendChild(input);
                row.appendChild(inputCell);
                table.appendChild(row);
            });
            const submitRow = document.createElement("tr");
            const submitCell = document.createElement("td");
            submitCell.colSpan = 2;
            submitCell.style.textAlign = "center";
            const submitButton = document.createElement("button");
            submitButton.innerText = "Submit";
            submitButton.addEventListener("click", this.handleSubmit.bind(this));
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
        const inputs = document.querySelectorAll("input[type='text']");
        const answers = Array.from(inputs).map(input => ({
            questionIndex: input.dataset.questionIndex,
            answer: input.value.trim()
        }));
        console.log("Submitted Answers:", answers);
        alert("Your answers have been submitted!");
        Prompt.isOpen = false;
        Prompt.backgroundDim.remove();
    },
    
    openPromptPanel(npc) {
        const promptDropDown = document.querySelector('.promptDropDown');
        const promptTitle = document.getElementById("promptTitle");
    
        if (this.isOpen) {
            this.backgroundDim.remove();
        }
    
        this.currentNpc = npc;
        this.isOpen = true;
    
        promptDropDown.innerHTML = ""; 
        
        promptTitle.style.display = "block";
        promptTitle.innerHTML = npc.quiz.title || "Questions";
        promptDropDown.appendChild(promptTitle);
    
        promptDropDown.appendChild(this.updatePromptTable());
    
        this.backgroundDim.create();
    
        promptDropDown.style.position = "fixed";
        promptDropDown.style.zIndex = "9999";
        promptDropDown.style.width = "70%"; 
        promptDropDown.style.top = "15%";
        promptDropDown.style.left = "15%"; 
        promptDropDown.style.transition = "all 0.3s ease-in-out"; 
    },
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};

export default Prompt;