// import canvas and math files
import {canvas,ctx,get_random,debuger} from "../core/canvas.js";



export let zombie = {
    // zombie settings (can be changed)
    spawn_delay : 3750, // 3750
    image_src : "./src/assets/images/zombie_1.png", // 64×64
    // zombie variables (can not change)
    active : [],
    image : new Image()
};



// this will load the graphics (image) for the zombie
zombie.image.src = zombie.image_src;
zombie.image.onerror = ()=>{
    zombie.image.src = zombie.image_src;
}



// snapshot current time in the game
let current_time = performance.now();



// zombie spawner function
export function draw_zombies() {
    // create zombies
    let new_time = performance.now();
    if (new_time - current_time >= zombie.spawn_delay) {
        zombie.active.push({
            x: get_random(30,canvas.width - 40),
            y: -60,
            s: get_random(0.5,1)
        });
        if (zombie.spawn_delay >= 100) {
            zombie.spawn_delay -= 50;
        }
        current_time = new_time;
    }
    // update positions and draw zombies
    for (let i = zombie.active.length - 1; i >= 0; i--) {
        let z = zombie.active[i];
        if (z.y < canvas.height +60) {
            z.y += z.s;
            ctx.drawImage(zombie.image,z.x-32,z.y-32);
            // debugger // display zombie position & speed
            if (debuger == true) {
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'red';
                ctx.strokeRect(z.x-32,z.y-32,64,64);
                ctx.font = "10px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("id: " + i, z.x-10,z.y-50);
                ctx.fillText("x: " + Math.floor(z.x),z.x-10,z.y-40); 
                ctx.fillText("y: " + Math.floor(z.y),z.x-10,z.y-30); 
                ctx.fillText("s: " + z.s.toFixed(2),z.x-10,z.y-20);
            }
        } else {
            zombie.active.splice(i, 1);
        }
    }
    // debugger // diaplay total zombie count
    if (debuger == true) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(zombie.active.length,1,20);
        ctx.fillText(zombie.spawn_delay,1,40);
    }
}

