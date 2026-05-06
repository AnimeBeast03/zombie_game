// import some stuff
import {canvas,ctx} from "./assets/do_page_settup.js";
import {spawn_zombies,zombie} from "./assets/zombie/spawner.js";

// Load player Image
const playerImg = new Image();
playerImg.src = "./assets/player.png";
playerImg.onerror = ()=>{
    playerImg.src = "/assets/player.png";
}
let posX = canvas.width/2;
let posY = 500;

// start game loop
game_loop();

function game_loop() {
ctx.clearRect(0,0,canvas.width,canvas.height);
spawn_zombies();
    
    let md = Infinity;
    let angle = 0;
    for (let i = zombie.active.length - 1; i >= 0; i--) {  
        let z = zombie.active[i];
        z.dx = posX - z.x;          // later based on Gate position
        z.dy = posY - z.y;          // later based on Gate position
        z.a = Math.atan2(z.dy,z.dx) - 1.6;
        if (z.dy > 0 && z.dy < md) {  
            angle = z.a;
            md = z.dy;
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "blue";
            ctx.moveTo(posX, posY); 
            ctx.lineTo(z.x,z.y); 
            ctx.stroke(); 
        }
    }
    ctx.save();
    ctx.translate(posX,posY);
    ctx.rotate(angle);
    ctx.drawImage(playerImg,128,0,64,64,-32,-32,64,64);
    ctx.restore();
    ctx.fillText(md,posX,posY - 10);
    ctx.fillText(angle * (180/Math.PI),posX,posY - 30);  

requestAnimationFrame(game_loop);
};
