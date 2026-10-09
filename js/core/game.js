// import dependencies
import {player} from "./../entities/player.js";
import {canvas} from "./../utils/canvas.js";
import {camera} from "./../utils/camera.js";
import {joystick} from "./../input/joystick.js";
import {touch} from "./../input/touch.js";
import {trees} from "./../world/trees.js";



// Game Stuff
export const game = {

    
    // Game Variables
    isStarted : false,
    devMode : false,
    lastTime : performance.now(),
    deltaTime : 0,

    
    // Game Start Function
    start() {
        if (this.isStarted) return;
        canvas.initialize("start");
        this.isStarted = true;
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.loop(time));
    },

    
    // Game Stop Function
    stop() {
        canvas.initialize("stop");
        this.isStarted = false;
    },

    
    // Calculate Time Function
    update_time(time) {
        this.deltaTime = time - this.lastTime;
        this.lastTime = time;
    },

    
    // dev Mode
    debug(x,y) {
        canvas.ctx.font = "15px Arial";
        canvas.ctx.fillStyle = "white";
        canvas.ctx.fillText("DeltaTime : " + this.deltaTime,x,y);
    },


    // game loop function
    loop(time) {
        if (this.isStarted) {
            
            // Clear Canvas
            canvas.ctx.clearRect(0,0,canvas.self.width,canvas.self.height);
        
            // update Time
            this.update_time(time);
            // update ui
            joystick.update();
            // Update entities
            player.update(this.deltaTime);
            // update utils
            camera.update(player);
        
            // Draw world objects
            trees.draw();
            // draw entities
            player.draw();
            // draw Ui
            joystick.draw();
            
            // dev mode
            if (this.devMode) {
                this.debug(20,20);
                player.debug(500,250);
                joystick.debug(150,300);
                touch.debug();
                camera.debug(20,60);
            }
        
            // Repeat Everything
            requestAnimationFrame((time) => this.loop(time));
        }
    }
}