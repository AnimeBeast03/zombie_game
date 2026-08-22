// Get Canvas Container
const container = document.getElementById("canvas_container");
// Setup Game Canvas
const canvas = document.getElementById("game_canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;



// Create Global Variables
let isStarted = false;
let touches = [];
let camera = {
    x: 0,
    y: 0,
}
let player = {
    x: 500,
    y: 250,
}



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
    if (isStarted) return;
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
        // Draw Game World
        drawTrees(300,250);
        drawTrees(750,100);
        drawTrees(50,150);
        drawTrees(900,200);
        drawTrees(600,300);
        // Draw Player
        updatePlayer();
        drawPlayer();
        // Draw Ui
        drawUI();
        // Draw Touch Inputs
        handleTouches();
        // Repeat Everything
        requestAnimationFrame(game_loop);
    }
}



// Touch Input Detection System
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
canvas.addEventListener("touchcancel",(e)=>{
    e.preventDefault();
    for (let touch of e.changedTouches) {
        delete touches[touch.identifier];
    }
});



// handle touch function
function handleTouches() {
    // draw touches
    for (let touch of touches) {
        // Skip If Touch Undefined
        if (!touch) continue;
        // Draw Circle
        ctx.beginPath();
        ctx.arc(touch.x,touch.y,20,0,2* Math.PI);
        ctx.fillStyle = "rgba(255,255,255,0.492)";
        ctx.fill();
    }
}



// Draw Trees
function drawTrees(x,y) {
    ctx.beginPath();
    ctx.arc(
        x - camera.x,
        y - camera.y,
        80,0,2* Math.PI
    );
    ctx.fillStyle = "green";
    ctx.fill();
}



// update Player stats
function updatePlayer() {
    let dx,dy,angle = 0;
    if(touches[0]) {
        dx = touches[0].x - (player.x - camera.x);
        dy = touches[0].y - (player.y - camera.y);
        angle = Math.atan2(dy,dx);
        player.x += 1*Math.cos(angle);
        player.y += 1*Math.sin(angle);
        camera.x += 1*Math.cos(angle);
        camera.y += 1*Math.sin(angle);
    }
}
// draw Player
function drawPlayer() {
    ctx.beginPath();
    ctx.arc(
        player.x - camera.x,
        player.y - camera.y,
        30,0,2* Math.PI
    );
    ctx.fillStyle = "lightblue";
    ctx.fill();
}



// draw Ui function
function drawUI() {
    // Draw Text
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Game Started",410,250);
    // Draw Rectangle
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.strokeRect(400,210,200,60);
}