// import dependencies
import {canvas} from "./../utils/canvas.js";
import {touch} from "./touch.js";

    

// Joystick Related Stuff
export const joystick = {

    
    // joystick variables
    x: 150,
    y: 300,
    scale: 100,
    angle: 0,
    distance: 0,
    maxDistance: 100,
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
        for(let [i,t] of touch.list.entries()) {
            // if touched on screen
            if (t) {
                
                // calculate distance
                let dx = t.x - this.x;
                let dy = t.y - this.y;
                let distance = Math.sqrt(dx*dx+dy*dy);
                
                // if touched inside joystick radius
                if (distance <= this.maxDistance) {
                    // lock the targeted finger
                    this.isOn = true;
                    if (this.touchId === null) {
                        this.touchId = i;
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
            let t = touch.list[this.touchId];
            if (t) {
                
                // calculate joystic states
                let dx = t.x - this.x;
                let dy = t.y - this.y;
                this.distance = Math.sqrt(dx*dx+dy*dy);
                this.angle = Math.atan2(dy,dx);
                
                // update knob position based on distance
                if (this.distance > this.maxDistance) {
                    this.distance = this.maxDistance;
                    this.knobX = this.x + Math.cos(this.angle)*this.maxDistance;
                    this.knobY = this.y + Math.sin(this.angle)*this.maxDistance;
                } else {
                    this.knobX = t.x;
                    this.knobY = t.y;
                }
                
            }
        }
        
    },

    
    // draw joystick function
    draw() {
        
        // draw base
        canvas.ctx.beginPath();
        canvas.ctx.arc(
            this.x,
            this.y,
            this.scale,
            0,2* Math.PI
        );
        canvas.ctx.fillStyle = "rgba(255,255,255,0.189)";
        canvas.ctx.fill();
        
        // draw knob
        canvas.ctx.beginPath();
        canvas.ctx.arc(
            this.knobX,
            this.knobY,
            this.scale/2,
            0,2* Math.PI
        );
        canvas.ctx.fillStyle = "rgba(255,255,255,0.189)";
        canvas.ctx.fill();
    },


    // dev Mode 
    debug(x,y) {
        canvas.ctx.font = "15px Arial";
        canvas.ctx.fillStyle = "white";
        // status
        canvas.ctx.fillText("isOn : " + this.isOn,x,y);
        // touch 
        canvas.ctx.fillText("touchId : " + this.touchId,x,y+15);
        // knob stats
        let kx = this.knobX - this.x;
        let ky = this.knobY - this.y;
        canvas.ctx.fillText("KnobX : " + kx,x,y+30);
        canvas.ctx.fillText("knobY : " + ky,x,y+45);
        canvas.ctx.fillText("angle : " + this.angle,x,y+60);
        canvas.ctx.fillText("distance : " + joystick.distance,x,y+75);
    },
}