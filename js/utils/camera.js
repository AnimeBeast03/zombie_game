// import dependencies
import {canvas} from "./canvas.js";


// Camera Related Stuff
export const camera = {

    
    // camera position
    x: 0,
    y: 0,
    follow: true,

    
    // camera update function
    update(entity) {
        if (this.follow) {
            this.x = entity.x - (canvas.self.width/2);
            this.y = entity.y - (canvas.self.height/2);
        }
    },


    // dev mode 
    debug(x,y) {
        canvas.ctx.font = "15px Arial";
        canvas.ctx.fillStyle = "white";
        canvas.ctx.fillText("camera_x : " + this.x,x,y);
        canvas.ctx.fillText("camera_y : " + this.y,x,y+15);
        canvas.ctx.fillText("camera_follow : " + this.follow,x,y+30);
    }
}