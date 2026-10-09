// import dependencies
import {game} from "./core/game.js";



// Get Buttons
const startBtn = document.getElementById("start_btn");
const stopBtn = document.getElementById("stop_btn");
const devModeBtn = document.getElementById("devMode_btn");



// Start and Stop Button functioning
startBtn.addEventListener("click",()=>{game.start();});
stopBtn.addEventListener("click",()=>{game.stop();});
devModeBtn.addEventListener("click",()=>{
    if(game.devMode) {
        game.devMode = false;
        devModeBtn.innerHTML = "&nbsp;&nbsp;DevMode &nbsp; Off";
        devModeBtn.style.backgroundColor = "red";
    } else {
        game.devMode = true;
        devModeBtn.innerHTML = "DevMode Onn";
        devModeBtn.style.backgroundColor = "green";
    }
});