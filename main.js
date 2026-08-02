// Get Canvas Container
const canvas_container = document.getElementById("canvas_container");
// Get Game Canvas
const game_canvas = document.getElementById("game_canvas");
const ctx = game_canvas.getContext("2d");



// Canvas Initialization function
function init_canvas(string) {
    if (string === "start") {
        // Enable Canvas Visibility
        canvas_container.style.display = "block";
        // Enable Fullscreen Orientation
        canvas_container.requestFullscreen();
        screen.orientation.lock("landscape");
        // Resize Canvas
        game_canvas.height = window.outerWidth;
        game_canvas.width = window.outerHeight;
    } else if (string === "stop") {
        // Disable Fullscreen Orientation
        document.exitFullscreen();
        // Disable Canvas Visibility
        canvas_container.style.display = "none";
    }
}



// Game Start function
function start() {
    init_canvas("start");
}



// Game Stop function
function stop() {
    init_canvas("stop");
}