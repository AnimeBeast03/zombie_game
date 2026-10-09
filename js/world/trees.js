// importing dependensies
import {canvas} from "./../utils/canvas.js";
import {camera} from "./../utils/camera.js";



export const trees = {

    // multi draw function
    draw() {
        this.drawTrees(300,250);
        this.drawTrees(750,100);
        this.drawTrees(50,150);
        this.drawTrees(900,200);
        this.drawTrees(600,300);
    },

    // actual tree drawing function
    drawTrees(x,y) {
        canvas.ctx.beginPath();
        canvas.ctx.arc(
            x - camera.x,
            y - camera.y,
            80,0,2* Math.PI
        );
        canvas.ctx.fillStyle = "green";
        canvas.ctx.fill();
    },
}