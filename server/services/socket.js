const { Server } = require("socket.io");

class SocketService {

    constructor(){
        this._io = new Server({
            cors : {
                allowedHeaders : ['*'],
                origin : 'http://localhost:5173'
            }
        })
    }

    initListeners(){
        const _io = this._io;
        _io.on("connect", (socket) => {
            // console.log("socket connected")
        })
    }
}

module.exports = SocketService;