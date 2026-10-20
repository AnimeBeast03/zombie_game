// get refference to http
const http = require("http");
// set port
const PORT = process.env.PORT || 3000;



// Server Loop
// create server with how to react on respective routs
const server = http.createServer((req,res) => {

    
    // set response type to json
    res.setHeader("content-type","application/json");

    
    // handle homepage request
    if (req.url === "/") {
        // set http status to success
        res.writeHead(200);
        // send a response back
        res.end(JSON.stringify({
            message: "Zombie Game backend is running!"
        }));
    }

        
    // handle api request
    else if (req.url === "/api/status") {
        // set http status to success
        res.writeHead(200);
        // send a response back
        res.end(JSON.stringify({
            status: "online",
            game: "zombie_game"
        }));
    }

        
    // handle unknown requests
    else {
        // set http status to failed
        res.writeHead(404);
        // send error msg
        res.end(JSON.stringify({
            error: "Route not found"
        }));
    }
    
});



// Server Listener
server.listen(PORT,"0.0.0.0",()=>{
    // print this msg on every request
    console.log("Server is running on port " + PORT);
});