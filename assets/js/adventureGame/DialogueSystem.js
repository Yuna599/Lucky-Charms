class DialogueSystem {
  constructor(options = {}) {
    this.dialogues = options.dialogues || [
      "You've come far, traveler. The skies whisper your name.",
      "The End holds secrets only the brave dare uncover.",
      "Retrieve the elytra and embrace your destiny!"
    ];

    this.id = options.id || "dialogue_" + Math.random().toString(36).substr(2, 9);
    this.lastShownIndex = -1;
    this.dialogueBox = null;
    this.dialogueText = null;
    this.closeBtn = null;
    this.isOpen = false;
    
    // Optional sound
    this.sound = options.sound;

    this.createDialogueBox();
  }

  createDialogueBox() {
    this.dialogueBox = document.createElement("div");
    this.dialogueBox.id = "dialogue-box-" + this.id;

    Object.assign(this.dialogueBox.style, {
      position: "fixed",
      bottom: "100px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "20px 30px",
      maxWidth: "90%",
      background: "rgba(255, 255, 255, 0.15)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "16px",
      color: "#fff",
      fontFamily: "'Segoe UI', sans-serif",
      fontSize: "16px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
      textAlign: "left",
      display: "none",
      zIndex: "9999",
      transition: "opacity 0.3s ease"
    });

    // Avatar
    const avatar = document.createElement("div");
    avatar.id = "dialogue-avatar-" + this.id;
    Object.assign(avatar.style, {
      width: "60px",
      height: "60px",
      borderRadius: "8px",
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginRight: "15px",
      flexShrink: "0",
      display: "none"
    });

    // Speaker
    const speaker = document.createElement("div");
    speaker.id = "dialogue-speaker-" + this.id;
    Object.assign(speaker.style, {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#ffcc70",
      marginBottom: "5px"
    });

    // Text
    this.dialogueText = document.createElement("div");
    this.dialogueText.id = "dialogue-text-" + this.id;
    this.dialogueText.style.lineHeight = "1.5";

    // Text container
    const textBox = document.createElement("div");
    textBox.appendChild(speaker);
    textBox.appendChild(this.dialogueText);

    const contentWrapper = document.createElement("div");
    Object.assign(contentWrapper.style, {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginBottom: "10px"
    });

    contentWrapper.appendChild(avatar);
    contentWrapper.appendChild(textBox);

    // Close button
    this.closeBtn = document.createElement("button");
    this.closeBtn.innerText = "×";
    Object.assign(this.closeBtn.style, {
      position: "absolute",
      top: "10px",
      right: "15px",
      fontSize: "24px",
      color: "#fff",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      lineHeight: "1"
    });
    this.closeBtn.onclick = () => this.closeDialogue();

    // Build box
    this.dialogueBox.appendChild(contentWrapper);
    this.dialogueBox.appendChild(this.closeBtn);

    document.body.appendChild(this.dialogueBox);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) this.closeDialogue();
    });
  }

  showDialogue(message, speaker = "", avatarSrc = null) {
    const speakerElement = document.getElementById("dialogue-speaker-" + this.id);
    const avatarElement = document.getElementById("dialogue-avatar-" + this.id);

    if (speakerElement) {
      speakerElement.textContent = speaker;
      speakerElement.style.display = speaker ? "block" : "none";
    }

    if (avatarElement) {
      if (avatarSrc) {
        avatarElement.style.display = "block";
        avatarElement.style.backgroundImage = `url(${avatarSrc})`;
      } else {
        avatarElement.style.display = "none";
      }
    }

    this.dialogueText.textContent = message;
    this.dialogueBox.style.display = "block";
    this.dialogueBox.style.opacity = "1";
    this.isOpen = true;

    if (this.sound) {
      this.sound.currentTime = 0;
      this.sound.play().catch(() => {});
    }

    return this.dialogueBox;
  }

  showRandomDialogue(speaker = "", avatarSrc = null) {
    if (!this.dialogues.length) return;

    let i;
    do {
      i = Math.floor(Math.random() * this.dialogues.length);
    } while (i === this.lastShownIndex && this.dialogues.length > 1);

    this.lastShownIndex = i;
    return this.showDialogue(this.dialogues[i], speaker, avatarSrc);
  }

  closeDialogue() {
    if (!this.isOpen) return;
    this.dialogueBox.style.opacity = "0";
    setTimeout(() => {
      this.dialogueBox.style.display = "none";
      this.isOpen = false;
    }, 300);
  }

  isDialogueOpen() {
    return this.isOpen;
  }

  addButtons(buttons = []) {
    if (!this.isOpen || !buttons.length) return;

    const btnContainer = document.createElement("div");
    btnContainer.style.marginTop = "15px";
    btnContainer.style.display = "flex";
    btnContainer.style.gap = "10px";

    buttons.forEach(({ text, action, primary }) => {
      const btn = document.createElement("button");
      btn.textContent = text;
      Object.assign(btn.style, {
        padding: "10px 15px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        background: primary ? "#00bcd4" : "#555",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "14px",
        transition: "all 0.2s ease"
      });

      btn.onmouseover = () => (btn.style.opacity = "0.85");
      btn.onmouseout = () => (btn.style.opacity = "1");

      btn.onclick = () => {
        if (typeof action === "function") action();
      };

      btnContainer.appendChild(btn);
    });

    this.dialogueBox.appendChild(btnContainer);
  }
}

export default DialogueSystem;
