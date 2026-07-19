// initialize canvas
import {canvas,ctx,debuger} from "./src/core/canvas.js";
// import entities
import {draw_zombies,zombie} from "./src/entities/zombie.js";
import {draw_player,player} from "./src/entities/player.js";
import {draw_bullets,bullet} from "./src/entities/bullet.js";

// start game loop
game_loop();



function game_loop() {
ctx.clearRect(0,0,canvas.width,canvas.height);
    draw_zombies();
    draw_player();
    draw_bullets();
requestAnimationFrame(game_loop);
};


