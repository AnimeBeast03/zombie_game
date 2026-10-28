// get dependencies
const http = require("http");
const websocket = require("ws");



// get port
const PORT = process.env.PORT || 3000;



// create a server
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



// attach a websocket to existing http server
const wss = new websocket.Server({server});



// detect when a player connects the server
wss.on("connection",(ws)=>{
    // print msg when player connects
    console.log("A player connected!");
    // send a msg to player
    ws.send(JSON.stringify({
        type: "welcome",
        message: "Connected to zombie game multiplayer"
    }));
    // receive any data from player
    ws.on("message",(data)=>{
        console.log("Received from player: " + data.toString());
    });
    // print a msg when player leaves
    ws.on("close",()=>{
        console.log("Player disconnected");
    });
    // detect errors in the connection with player
    ws.on("error",(error)=>{
        console.log("Websocket error : " + error.message);
    });
});



// Listen to any server start request
server.listen(PORT,"0.0.0.0",()=>{
    // print this msg when server is ready
    console.log("Server is running on port " + PORT);
    console.log("Websocket connection is ready");
});