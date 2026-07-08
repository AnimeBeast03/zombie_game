// import canvas and on screen zombie details
import {canvas,ctx,get_random,debuger} from "./do_page_settup.js";
import {spawn_zombies,zombie} from "./zombie_spawner.js";
import {bullet} from "./bullet_spawner.js";



let player = {
    // player image
    image: new Image(),
    image_src: "./assets/images/player_spritesheet.png",
    // player position
    x: canvas.width/2,
    y: 750
}



// this will load the graphics (image) for the player
player.image.src = player.image_src;
player.image.onerror = ()=>{
    player.image.src = player.image_src;
}



function draw_player() {
    let md = Infinity;      // minimum distance
    let cz = null;          // closest zombie
    player.a = 0;
    // for every zombie
    for (let i = zombie.active.length - 1; i >= 0; i--) {  
        let z = zombie.active[i];
        // calculate distance, time, and Aiming position
        z.dx = player.x - z.x;
        z.dy = player.y - z.y;
        z.distance = Math.sqrt(z.dx*z.dx + z.dy*z.dy);
        z.time = z.distance / bullet.speed;
        z.aimX = z.x + 0 * z.time;
        z.aimY = z.y + z.s * z.time;
        // pick the closest zombie
        if (z.dy > 0 && z.dy < md) {
            player.a = Math.atan2(z.aimY - player.y, z.aimX - player.x) + 1.5708;
            md = z.dy;
            cz = z;
        }
        // debugger
        if (debuger == true) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.arc(z.aimX, z.aimY, 2, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
    // draw player
    ctx.save();
    ctx.translate(player.x,player.y);
    ctx.rotate(player.a);
    ctx.drawImage(player.image,128,0,64,64,-32,-32,64,64);
    ctx.restore();
    // debugger
    if (debuger == true) {
        ctx.save();
        ctx.translate(player.x,player.y);
        ctx.rotate(player.a);
        // draw border arround the player
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'green';
        ctx.strokeRect(-32,-32,64,64);
        // draw path to the choosen zombie
        ctx.beginPath();
        ctx.moveTo(10,-5);
        ctx.restore();
        if (cz) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = "blue";
            ctx.lineTo(cz.x,cz.y); 
            ctx.stroke();
        }
        // draw player data
        ctx.font = "15px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("zd: " + Math.floor(md),player.x + 30,player.y);
        ctx.fillText("pa: " + Math.floor(player.a * (180/Math.PI)) + "°",player.x + 30,player.y + 20);
    }
}



// export things
export {draw_player,player};
