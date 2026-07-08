// import canvas related things
import {canvas,ctx,get_random,debuger} from "./do_page_settup.js";
import {player} from "./player.js";



let bullet = {
    // bullet settings (can be changed)
    speed : 5,
    image_src : "./assets/images/bullet.png", // 64×64
    // bullet variables (can not change)
    active : [],
    image : new Image()
};



// this will load the graphics (image) for the bullets
bullet.image.src = bullet.image_src;
bullet.image.onerror = ()=>{
    bullet.image.src = bullet.image_src;
}



// get touch input to shoot
canvas.addEventListener("pointerdown", ()=>{
    bullet.active.push({
        x: player.x,
        y: player.y,
        a: player.a,
        t: 0,
        fx: 0
    });
});



// bullet spawner functuon
function draw_bullets() {
    for (let i = bullet.active.length - 1; i >= 0; i--) {
        let current_bullet = bullet.active[i];
        let x = current_bullet.x;
        let y = current_bullet.y;
        let a = current_bullet.a;
        let t = current_bullet.t;
        let fx = current_bullet.fx;
        // draw bullet
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(a);
        ctx.drawImage(bullet.image,fx,0,16,16,-7,-40,32,32);
        ctx.restore();
        // animation logic
        if (t > 9) {
            if (fx == 16) {
                current_bullet.fx = 0;
            } else {
                current_bullet.fx = 16;
            }
            current_bullet.t = 0;
        };
        current_bullet.t++;
        // update bullet position
        current_bullet.x += bullet.speed * Math.sin(a);
        current_bullet.y += -bullet.speed * Math.cos(a);
        // remove bullet if outside screen or after hit
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
            bullet.active.splice(i, 1);
        };
    };
}



// export things
export {bullet,draw_bullets};