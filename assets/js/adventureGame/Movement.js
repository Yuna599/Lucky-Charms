document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") ali.move("left");
    if (event.key === "ArrowRight") ali.move("right");
    if (event.key === "ArrowUp") ali.move("up");
    if (event.key === "ArrowDown") ali.move("down");
});
