// Get Canvas Container
const container = document.getElementById("canvas_container");
// Setup Game Canvas
const canvas = document.getElementById("game_canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;



// Create Global Variables
let isStarted = false;
let lastTime = performance.now();
let deltaTime = 0;
let touches = [];
let camera = {
    x: 0,
    y: 0,
}
let player = {
    x: 500,
    y: 250,
    speed: 0.1,
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
    lastTime = performance.now();
    requestAnimationFrame(game_loop);
}



// Game Stop function
function stop() {
    init_canvas("stop");
    isStarted = false;
}



// Game Loop function
function game_loop(currentTime) {
    if (isStarted) {
        // Clear Canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // Calculate Time
        deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        // Draw Player
        updatePlayer();
        // Update Camera
        updateCamera();
        // Draw Game World
        drawTrees(300,250);
        drawTrees(750,100);
        drawTrees(50,150);
        drawTrees(900,200);
        drawTrees(600,300);
        // Draw Player
        drawPlayer();
        // Draw Ui
        drawUI();
        // Draw Touch Inputs
        drawTouches();
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
function drawTouches() {
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
        player.x += player.speed*Math.cos(angle)*deltaTime;
        player.y += player.speed*Math.sin(angle)*deltaTime;
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



// Update camera
function updateCamera() {
    camera.x = player.x - (canvas.width/2);
    camera.y = player.y - (canvas.height/2);
}



// draw Ui function
function drawUI() {
    // Draw Text
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("DeltaTime = " + deltaTime,20,50);
}