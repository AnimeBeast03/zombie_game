// Get Canvas Container
const container = document.getElementById("canvas_container");
// Setup Game Canvas
const canvas = document.getElementById("game_canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;



// Create Global Variables
let touches = [];



// Camera Related Stuff
const camera = {
    // camera position
    x: 0,
    y: 0,
    // camera update function
    update() {
        this.x = player.x - (canvas.width/2);
        this.y = player.y - (canvas.height/2);
    }
}



// Joystick Related Stuff
const joystick = {
    // joystick variables
    x: 150,
    y: 300,
    scale: 100,
    angle: 0,
    distance: 0,
    maxDistance: 75,
    isOn: false,
    touchId: null,
    // knob variables
    knobX: 0,
    knobY: 0,
    // update joystick function
    update() {
        // set the starting position of knob
        this.knobX = this.x;
        this.knobY = this.y;
        // detect touch inputs
        for(let [id,touch] of touches.entries()) {
            // if touched on screen
            if (touch) {
                // calculate distance
                let dx = touch.x - this.x;
                let dy = touch.y - this.y;
                let distance = Math.sqrt(dx*dx+dy*dy);
                // if touched inside joystick radius
                if (distance <= this.maxDistance) {
                    // lock the targeted finger
                    this.isOn = true;
                    if (this.touchId === null) {
                        this.touchId = id;
                    }
                    break;
                // stop only if target touch is finished
                } else {
                    if (this.touchId !== null) {
                        break;
                    }
                    this.isOn = false;
                    this.touchId = null;
                }
            // if no touches on screen stop the joystick
            } else {
                this.isOn = false;
                this.touchId = null;
            }
        } 
        // update knob position;
        if (this.isOn === true) {
            let touch = touches[this.touchId];
            if (touch) {
                // calculate joystic states
                let dx = touch.x - this.x;
                let dy = touch.y - this.y;
                this.distance = Math.sqrt(dx*dx+dy*dy);
                this.angle = Math.atan2(dy,dx);
                // update knob position
                this.knobX = touch.x;
                this.knobY = touch.y;
            }
        }
    },
    // draw joystick function
    draw() {
        // draw base
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.scale,
            0,2* Math.PI
        );
        ctx.fillStyle = "rgba(255,255,255,0.189)";
        ctx.fill();
        // draw knob
        ctx.beginPath();
        ctx.arc(
            this.knobX,
            this.knobY,
            this.scale/2,
            0,2* Math.PI
        );
        ctx.fillStyle = "rgba(255,255,255,0.189)";
        ctx.fill();
    },
}



// Player Related Stuff
const player = {
    // player data
    x: 500,
    y: 250,
    speed: 0.1,
    // player update function
    update() {
        if(joystick.isOn) {
            let angle = joystick.angle
            this.x += this.speed*Math.cos(angle)*game.deltaTime;
            this.y += this.speed*Math.sin(angle)*game.deltaTime;
        }
    },
    // player draw function
    draw() {
        ctx.beginPath();
        ctx.arc(
            this.x - camera.x,
            this.y - camera.y,
            30,0,2* Math.PI
        );
        ctx.fillStyle = "lightblue";
        ctx.fill();
    },
}



// Game Stuff
const game = {
    // Game Variables
    isStarted : false,
    lastTime : performance.now(),
    deltaTime : 0,
    // Canvas Initiation Function
    init_canvas(string) {
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
    },
    // Game Start Function
    start() {
        if (this.isStarted) return;
        this.init_canvas("start");
        this.isStarted = true;
        this.lastTime = performance.now();
        requestAnimationFrame(game_loop);
    },
    // Game Stop Function
    stop() {
        this.init_canvas("stop");
        this.isStarted = false;
    },
    // Calculate Time Function
    update_time(time) {
        this.deltaTime = time - this.lastTime;
        this.lastTime = time;
    }
}



// Game Loop function
function game_loop(time) {
    if (game.isStarted) {
        // Clear Canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        // Calculate Time
        game.update_time(time);
        // Update Joystick
        joystick.update();
        // Update Entities
        player.update();
        camera.update();
        
        // Draw World
        drawTrees(300,250);
        drawTrees(750,100);
        drawTrees(50,150);
        drawTrees(900,200);
        drawTrees(600,300);
        // Draw Entities
        player.draw();
        // Draw Ui
        drawUI();
        joystick.draw();
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



// draw Ui function
function drawUI() {
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    // Draw Text
    ctx.fillText("DeltaTime = " + game.deltaTime,20,50);
    // dtaw joystick states
    let x = joystick.knobX - joystick.x;
    let y = joystick.knobY - joystick.y;
    ctx.fillText("KnobX = " + x,225,300);
    ctx.fillText("knobY = " + y,225,315);
    ctx.fillText("angle = " + joystick.angle,225,330);
    ctx.fillText("distance = " + joystick.distance,225,345);
    ctx.fillText("isOn = " + joystick.isOn,225,360);
    ctx.fillText("touchId = " + joystick.touchId,225,375);
}