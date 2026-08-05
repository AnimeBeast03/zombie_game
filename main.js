// Get Canvas Container
const container = document.getElementById("canvas_container");
// Setup Game Canvas
const canvas = document.getElementById("game_canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
// Create Global Variables
let isStarted = false;
let touches = [];



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
        // Draw Touch Inputs
        for (let touch of touches) {
            // Skip If Touch Undefined
            if (!touch) continue;
            // Draw Circle
            ctx.beginPath();
            ctx.arc(touch.x,touch.y,20,0,2* Math.PI);
            ctx.fillStyle = "rgba(255,255,255,0.492)";
            ctx.fill();
        }
        // Repeat Everything
        requestAnimationFrame(game_loop);
    }
}



// Touch Input Detection
canvas.addEventListener("touchstart",(e)=>{
    e.preventDefault();
    for (let touch of e.touches) {
        touches[touch.identifier] = {
            x: touch.clientX,
            y: touch.clientY,
        }
    }
});
canvas.addEventListener("touchmove",(e)=>{
    e.preventDefault();
    for (let touch of e.touches) {
        touches[touch.identifier] = {
            x: touch.clientX,
            y: touch.clientY,
        }
    }
});
canvas.addEventListener("touchend",(e)=>{
    e.preventDefault();
    for (let touch of e.changedTouches) {
        delete touches[touch.identifier];
    }
});