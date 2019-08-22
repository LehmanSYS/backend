const groupHandler = require('../App');
const api = require('../Api');

module.exports = (io) => {

    io.on('connection', function (socket) {
        console.log(`${socket.id} has connected to the server`);
        io.emit('refresh-dashboard');
      
        socket.on('create', roomName => {
            console.log(`attempting to create ${roomName}`)
            if (!groupHandler.exists(roomName)) { 
                groupHandler.addGroup(roomName);
                socket.join(roomName);
                console.log(`${socket.id} has joined and created ${roomName}`)
                io.sockets.in(roomName).emit('joined', socket.id);
            }
            else {
                console.log("Room already exists");
            }
        });
      
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
      
        socket.on('leave-current-room', (roomName) => {
            socket.leave(roomName);
            console.log(`${socket.id} has left room ${roomName}`)
        });

        socket.on('enter-group', (roomName) => {
            socket.join(roomName);
            console.log(`${socket.id} has joined room ${roomName}`);
        })

        socket.on('invite-refresh', (filler) =>{
            //broadcast to all connected clients
            io.emit('refresh-dashboard');
        })
      });
}