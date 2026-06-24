// import some stuff
import {canvas,ctx,debuger} from "./assets/files/do_page_settup.js";
import {spawn_zombies,zombie} from "./assets/files/zombie_spawner.js";
import {draw_player,player} from "./assets/files/player.js";




let bullet = {
    img: new Image(),
    img_src: "./assets/images/bullet.png",
    active : [],
    speed : 5,
}
let timeGap = 5;


bullet.img.src = bullet.img_src;
bullet.img.onerror = ()=>{
    bullet.img.src = bullet.img_src;
};


canvas.addEventListener("pointerdown", (e)=>{
    bullet.active.push({
        x: player.x,
        y: player.y,
        a: player.a - 1.5708,
        FT1 : 0,        // frame 1 timer
        FT2 : 0         // frame 2 timer
    });
});




// start game loop
game_loop();



function game_loop() {
ctx.clearRect(0,0,canvas.width,canvas.height);
    spawn_zombies();
    draw_player();
    
    draw_bullets();
    
requestAnimationFrame(game_loop);
};



function draw_bullets() {
    for (let i = 0; i < bullet.active.length; i++) {
        let b = bullet.active[i];
        ctx.save();
        ctx.translate(b.x,b.y);
        ctx.rotate(b.a);
        if (b.FT1 > timeGap) {
            ctx.drawImage(
                bullet.img,
                16,0,16,16,
                10,-7,32,32
            );
            if (b.FT2 > timeGap) {
                b.FT1 = 0;
                b.FT2 = 0;
            } else {
                b.FT2++;
            }
        } else {
            ctx.drawImage(
                bullet.img,
                0,0,16,16,
                10,-7,32,32
            );
            b.FT1++;
        }
        ctx.restore();
        b.x += Math.cos(b.a) * bullet.speed;
        b.y += Math.sin(b.a) * bullet.speed;
    }
}
