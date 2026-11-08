
export const websocket = {
    isConnected : false,
    address : "wss://zombie-game-backend.onrender.com/",
    connect() {
        this.socket = new WebSocket(this.address);
        this.socket.addEventListener("open", (event) => {
            this.isConnected = true;
            this.socket.send("Server Connection Started");
        });
        this.socket.addEventListener("message", (event) => {
            console.log("Message from connection ", event.data);
        });
        this.socket.addEventListener("close", (event) => {
            console.log("Server is Closed");
            this.isConnected = false;
        });
        this.socket.addEventListener("error", (event) => {
            console.log("Connection Error found : ", event);
        });
    },
    send(data) {
        if (this.isConnected) {
            this.socket.send(data);
        } else {
            console.warn("Cannot send data, Websocket is not connected");
        }
    },
    disconnect() {
        if (this.socket && this.isConnected) {
            this.socket.close();
        }
    },
}