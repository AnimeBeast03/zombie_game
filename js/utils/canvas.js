// get refference of on screen elements
const container = document.getElementById("canvas_container");
const self = document.getElementById("game_canvas");
const ctx = self.getContext("2d");



export const canvas = {

    
    // canvas related variables
    container,
    self,
    ctx,

    
    // Canvas Initiation Function
    initialize(string) {
        if (string === "start") {
            
            // Enable Canvas Visibility
            this.container.style.display = "block";
            
            // Enable Fullscreen Orientation
            this.container.requestFullscreen();
            screen.orientation.lock("landscape");
            
            // Resize Canvas
            this.self.height = window.outerWidth; //1000
            this.self.width = window.outerHeight; //450
            this.ctx.imageSmoothingEnabled = false;

        } else if (string === "stop") {
            
            // Disable Fullscreen Orientation
            document.exitFullscreen();
            
            // Disable Canvas Visibility
            this.container.style.display = "none";
        }
    }
}
    