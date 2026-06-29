// import some stuff
import {canvas,ctx,debuger} from "./assets/files/do_page_settup.js";
import {spawn_zombies,zombie} from "./assets/files/zombie_spawner.js";
import {draw_player,player} from "./assets/files/player.js";



// start game loop
game_loop();



function game_loop() {
ctx.clearRect(0,0,canvas.width,canvas.height);
    spawn_zombies();
    draw_player();
requestAnimationFrame(game_loop);
};