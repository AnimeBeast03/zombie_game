// import dependensies
import {joystick} from "./../input/joystick.js";
import {camera} from "./../utils/camera.js";
import {canvas} from "./../utils/canvas.js";



// Player Related Stuff
export const player = {

    
    // player data
    x: 500,
    y: 250,
    maxSpeed: 0.1,
    angle: 0,
    
    
    // player update function
    update(deltaTime) {
        if(joystick.isOn) {
            this.angle = joystick.angle
            this.x += this.maxSpeed*Math.cos(this.angle)*deltaTime;
            this.y += this.maxSpeed*Math.sin(this.angle)*deltaTime;
        }
    },
    
    
    // player draw function
    draw() {

        // temperory variables
        let x = this.x - camera.x;
        let y = this.y - camera.y;
        let dx = x + Math.cos(this.angle)*30;
        let dy = y + Math.sin(this.angle)*30;
        
        // draw a bluue circle
        canvas.ctx.beginPath();
        canvas.ctx.arc(x,y,30,0,2* Math.PI);
        canvas.ctx.fillStyle = "lightblue";
        canvas.ctx.fill();
        
        // draw a reed line
        canvas.ctx.beginPath();
        canvas.ctx.moveTo(x,y);
        canvas.ctx.lineTo(dx,dy);
        canvas.ctx.strokeStyle = "red";
        canvas.ctx.lineWidth = 5;
        canvas.ctx.stroke();
    },


    // dev mode 
    debug() {
        let x = this.x - camera.x;
        let y = this.y - camera.y;
        canvas.ctx.font = "15px Arial";
        canvas.ctx.fillStyle = "white";
        // show position
        canvas.ctx.fillText("PosX : " + this.x,x,y);
        canvas.ctx.fillText("PosY : " + this.y,x,y+15);
        // show direction
        canvas.ctx.fillText("angle : " + this.angle,x,y+30);
    }
}