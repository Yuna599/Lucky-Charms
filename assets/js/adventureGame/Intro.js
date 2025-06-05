class Intro {
    constructor(gameControl) {
        this.gameControl = gameControl; // Reference to GameControl
    }

    showStartButton() {
        const startButton = document.createElement("button");
        startButton.innerHTML = "Click to Start";
        startButton.id = "start-button";

        // Style the button
        startButton.style.position = "absolute";
        startButton.style.top = "50%";
        startButton.style.left = "50%";
        startButton.style.transform = "translate(-50%, -50%)";
        startButton.style.padding = "20px 40px";
        startButton.style.backgroundColor = "#758a49";
        startButton.style.color = "white";
        startButton.style.border = "none";
        startButton.style.borderRadius = "10px";
        startButton.style.cursor = "pointer";
        startButton.style.fontSize = "24px";
        startButton.style.fontWeight = "bold";
        startButton.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";

        document.body.appendChild(startButton);

        startButton.addEventListener("click", () => {
            startButton.remove();
            this.gameControl.addExitKeyListener();
            this.gameControl.transitionToLevel();
            this.gameControl.addBackgroundChangeButton();

            const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
            audio.play().catch((error) => console.error("Error playing audio:", error));

            this.showConversationModal();
        });
    }

    showConversationModal() {
        // Create the modal container
        const modal = document.createElement("div");
        modal.id = "conversation-modal";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.width = "400px";
        modal.style.padding = "20px";
        modal.style.backgroundColor = "#fff";
        modal.style.borderRadius = "10px";
        modal.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
        modal.style.textAlign = "center";

        // Add initial conversation text
        const conversationText = document.createElement("p");
        conversationText.innerText = "Hello!";
        conversationText.style.fontSize = "18px";
        conversationText.style.marginBottom = "20px";
        modal.appendChild(conversationText);

        // Add choice buttons
        const choice1 = document.createElement("button");
        choice1.innerText = "Hello";
        choice1.style.padding = "10px 20px";
        choice1.style.margin = "10px";
        choice1.style.backgroundColor = "#4CAF50";
        choice1.style.color = "white";
        choice1.style.border = "none";
        choice1.style.borderRadius = "5px";
        choice1.style.cursor = "pointer";
        choice1.addEventListener("click", () => {
            modal.remove();
            this.showNextConversation("I came to Tisneyland to have fun with my friends!", [
                { text: "Oh that's cool!", action: () => this.showNextConversation("And I saw this sword stuck in the stone! But I don't have much power to pull out the sword! Can you help?", [
                    { text: "Of course!", action: () => this.showNextConversation("I am planning on going to the gym to work out! The path to the gym is somewhere inside Tisneyland! First ask the employee in front of the merry-go-round! Oh, and be careful, there is a cute unicorn wandering around and it's a bit aggressive ;)", [
                        { text: "Let's go!", action: () => this.startAdventure() },
                        { text: "Tell me more!", action: () => this.showResponse("The unicorn is guarding the path to the gym. You'll need to find a way to distract it!") }
                    ]) },
                    { text: "Yeah, what do you want me to do for you?", action: () => this.showNextConversation("I am planning on going to the gym to work out! The path to the gym is somewhere inside Tisneyland! First ask the employee in front of the merry-go-round! Oh, and be careful, there is a cute unicorn wandering around and it's a bit aggressive ;)", [
                        { text: "Let's go!", action: () => this.startAdventure() },
                        { text: "Tell me more!", action: () => this.showResponse("The unicorn is guarding the path to the gym. You'll need to find a way to distract it!") }
                    ]) }
                ]) },
                { text: "So?", action: () => this.showNextConversation("And I saw this sword stuck in the stone! But I don't have much power to pull out the sword! Can you help?", [
                    { text: "Of course!", action: () => this.showNextConversation("I am planning on going to the gym to work out! The path to the gym is somewhere inside Tisneyland! First ask the employee in front of the merry-go-round! Oh, and be careful, there is a cute unicorn wandering around and it's a bit aggressive ;)", [
                        { text: "Let's go!", action: () => this.startAdventure() },
                        { text: "Tell me more!", action: () => this.showResponse("The unicorn is guarding the path to the gym. You'll need to find a way to distract it!") }
                    ]) },
                    { text: "Yeah, what do you want me to do for you?", action: () => this.showNextConversation("I am planning on going to the gym to work out! The path to the gym is somewhere inside Tisneyland! First ask the employee in front of the merry-go-round! Oh, and be careful, there is a cute unicorn wandering around and it's a bit aggressive ;)", [
                        { text: "Let's go!", action: () => this.startAdventure() },
                        { text: "Tell me more!", action: () => this.showResponse("The unicorn is guarding the path to the gym. You'll need to find a way to distract it!") }
                    ]) }
                ]) }
            ]);
        });

        const choice2 = document.createElement("button");
        choice2.innerText = "What's your name?";
        choice2.style.padding = "10px 20px";
        choice2.style.margin = "10px";
        choice2.style.backgroundColor = "#FF5722";
        choice2.style.color = "white";
        choice2.style.border = "none";
        choice2.style.borderRadius = "5px";
        choice2.style.cursor = "pointer";
        choice2.addEventListener("click", () => {
            modal.remove();
            this.showNextConversation("My name is Chill Guy! I came to Tisneyland to have fun with my friends!", [
                { text: "Oh that's cool!", action: () => this.showNextConversation("And I saw this sword stuck in the stone! But I don't have much power to pull out the sword! Can you help?", [
                    { text: "Of course!", action: () => this.showNextConversation("I am planning on going to the gym to work out! The path to the gym is somewhere inside Tisneyland! First ask the employee in front of the merry-go-round! Oh, and be careful, there is a cute unicorn wandering around and it's a bit aggressive ;)", [
                        { text: "Let's go!", action: () => this.startAdventure() },
                        { text: "Tell me more!", action: () => this.showResponse("Good Luck!") }
                    ]) },
                    { text: "Yeah, what do you want me to do for you?", action: () => this.showNextConversation("I am planning on going to the gym to work out! The path to the gym is somewhere inside Tisneyland! First ask the employee in front of the merry-go-round! Oh, and be careful, there is a cute unicorn wandering around and it's a bit aggressive ;)", [
                        { text: "Let's go!", action: () => this.startAdventure() },
                        { text: "Tell me more!", action: () => this.showResponse("Good Luck!") }
                    ]) }
                ]) },
                { text: "So?", action: () => this.showNextConversation("And I saw this sword stuck in the stone! But I don't have much power to pull out the sword! Can you help?", [
                    { text: "Of course!", action: () => this.showNextConversation("I am planning on going to the gym to work out! The path to the gym is somewhere inside Tisneyland! First ask the employee in front of the merry-go-round! Oh, and be careful, there is a cute unicorn wandering around and it's a bit aggressive ;)", [
                        { text: "Let's go!", action: () => this.startAdventure() },
                        { text: "Tell me more!", action: () => this.showResponse("Good Luck!") }
                    ]) },
                    { text: "Yeah, what do you want me to do for you?", action: () => this.showNextConversation("I am planning on going to the gym to work out! The path to the gym is somewhere inside Tisneyland! First ask the employee in front of the merry-go-round! Oh, and be careful, there is a cute unicorn wandering around and it's a bit aggressive ;)", [
                        { text: "Let's go!", action: () => this.startAdventure() },
                        { text: "Tell me more!", action: () => this.showResponse("Good Luck!") }
                    ]) }
                ]) }
            ]);
        });

        modal.appendChild(choice1);
        modal.appendChild(choice2);

        // Append the modal to the page
        document.body.appendChild(modal);
    }

    showNextConversation(text, choices) {
        // Create the modal container
        const modal = document.createElement("div");
        modal.id = "next-conversation-modal";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.width = "400px";
        modal.style.padding = "20px";
        modal.style.backgroundColor = "#fff";
        modal.style.borderRadius = "10px";
        modal.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
        modal.style.textAlign = "center";

        // Add conversation text
        const conversationText = document.createElement("p");
        conversationText.innerText = text;
        conversationText.style.fontSize = "18px";
        conversationText.style.marginBottom = "20px";
        modal.appendChild(conversationText);

        // Add choice buttons dynamically
        choices.forEach(choice => {
            const button = document.createElement("button");
            button.innerText = choice.text;
            button.style.padding = "10px 20px";
            button.style.margin = "10px";
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.addEventListener("click", () => {
                modal.remove();
                choice.action();
            });
            modal.appendChild(button);
        });

        // Append the modal to the page
        document.body.appendChild(modal);
    }

    showResponse(responseText) {
        // Create a response modal
        const responseModal = document.createElement("div");
        responseModal.id = "response-modal";
        responseModal.style.position = "fixed";
        responseModal.style.top = "50%";
        responseModal.style.left = "50%";
        responseModal.style.transform = "translate(-50%, -50%)";
        responseModal.style.width = "400px";
        responseModal.style.padding = "20px";
        responseModal.style.backgroundColor = "#fff";
        responseModal.style.borderRadius = "10px";
        responseModal.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
        responseModal.style.textAlign = "center";

        // Add response text
        const responseTextElement = document.createElement("p");
        responseTextElement.innerText = responseText;
        responseTextElement.style.fontSize = "18px";
        responseTextElement.style.marginBottom = "20px";
        responseModal.appendChild(responseTextElement);

        // Add a close button
        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.style.padding = "10px 20px";
        closeButton.style.backgroundColor = "#4CAF50";
        closeButton.style.color = "white";
        closeButton.style.border = "none";
        closeButton.style.borderRadius = "5px";
        closeButton.style.cursor = "pointer";
        closeButton.addEventListener("click", () => {
            responseModal.remove();
        });

        responseModal.appendChild(closeButton);

        // Append the response modal to the page
        document.body.appendChild(responseModal);
    }

    startAdventure() {
        console.log("Adventure started! Navigate to the gym!");
        // Add logic for starting the adventure here
    }
}

export default Intro;
