// Get Canvas Container
const container = document.getElementById("canvas_container");
// Setup Game Canvas
const canvas = document.getElementById("game_canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
// Create Global Variables
let isStarted = false;



// Canvas Initialization function
function init_canvas(string) {
    if (string === "start") {
        // Enable Canvas Visibility
        container.style.display = "block";
        // Enable Fullscreen Orientation
        container.requestFullscreen();
        screen.orientation.lock("landscape");
        // Resize Canvas
        canvas.height = window.outerWidth;
        canvas.width = window.outerHeight;
    } else if (string === "stop") {
        // Disable Fullscreen Orientation
        document.exitFullscreen();
        // Disable Canvas Visibility
        container.style.display = "none";
    }
}



// Game Start function
function start() {
    init_canvas("start");
    isStarted = true;
    game_loop();
}



// Game Stop function
function stop() {
    init_canvas("stop");
    isStarted = false;
}



// Game Loop function
function game_loop() {
    if (isStarted) {
        // Clear Canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // Draw Text
        ctx.font = "30px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText("Game Started",410,250);
        // Draw Rectangle
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.strokeRect(400,210,200,60);
        // Repeat Everything
        requestAnimationFrame(game_loop);
    }
}