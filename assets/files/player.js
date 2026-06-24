// import canvas and on screen zombie details
import {canvas,ctx,get_random,debuger} from "./do_page_settup.js";
import {spawn_zombies,zombie} from "./zombie_spawner.js";



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
    for (let i = zombie.active.length - 1; i >= 0; i--) {  
        let z = zombie.active[i];
        z.dx = player.x - z.x;          // later based on Gate position
        z.dy = player.y - z.y;          // later based on Gate position
        if (z.dy > 0 && z.dy < md) {
            player.a = Math.atan2(z.dy,z.dx) - 1.6;
            md = z.dy;
            cz = z;
        }
    }
    if (debuger && cz) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.moveTo(player.x, player.y); 
        ctx.lineTo(cz.x,cz.y); 
        ctx.stroke();
    }
    ctx.save();
    ctx.translate(player.x,player.y);
    ctx.rotate(player.a);
    ctx.drawImage(player.image,128,0,64,64,-32,-32,64,64);
    if (debuger == true) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'green';
        ctx.strokeRect(-32,-32,64,64);
    }
    ctx.restore();
    if (debuger == true) {
        ctx.font = "15px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("zd: " + Math.floor(md),player.x + 30,player.y);
        ctx.fillText("pa: " + Math.floor(player.a * (180/Math.PI)) + "°",player.x + 30,player.y + 20);
    }
}



// export things
export {draw_player,player};