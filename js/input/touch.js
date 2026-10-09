// import dependencies
import {canvas} from "./../utils/canvas.js";



// all touch input related stuff
export const touch = {

    
    // list of active touches
    list: [],

    
    // dev mode
    debug() {
        // define text style
        canvas.ctx.font = "15px Arial";
        canvas.ctx.fillStyle = "white";
        // display touch position
        for (let [i,t] of this.list.entries()) {
            // Skip If Touch Undefined
            if (!t) continue;
            // Draw Circle
            canvas.ctx.beginPath();
            canvas.ctx.arc(t.x,t.y,20,0,2* Math.PI);
            canvas.ctx.fillStyle = "rgba(255,255,255,0.492)";
            canvas.ctx.fill();
            // show position and id
            canvas.ctx.fillText("id : " + i,t.x,t.y);
            canvas.ctx.fillText("PosX : " + t.x,t.x,t.y+15);
            canvas.ctx.fillText("PosY : " + t.y,t.x,t.y+30);
        }
    },
}



// Touch Input Detection System
canvas.self.addEventListener("touchstart",(e)=>{
    e.preventDefault();
    for (let t of e.touches) {
        touch.list[t.identifier] = {
            x: t.clientX,
            y: t.clientY,
        }
    }
});
canvas.self.addEventListener("touchmove",(e)=>{
    e.preventDefault();
    for (let t of e.touches) {
        touch.list[t.identifier] = {
            x: t.clientX,
            y: t.clientY,
        }
    }
});
canvas.self.addEventListener("touchend",(e)=>{
    e.preventDefault();
    for (let t of e.changedTouches) {
        delete touch.list[t.identifier];
    }
});
canvas.self.addEventListener("touchcancel",(e)=>{
    e.preventDefault();
    for (let t of e.changedTouches) {
        delete touch.list[t.identifier];
    }
});