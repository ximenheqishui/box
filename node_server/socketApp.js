module.exports = function app (io) {
    io.on('connect', function(socket){
        console.log("connection")
        socket.on('disconnect', function(){
            console.log("disconnect")
        });
    });

    //  在这里创建房间号  并加入房间  进行交流
    const adminNamespace = io.of('/admin')
    adminNamespace.on('connect', (socket) => {
        const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
        // broadcast to all clients in the given sub-namespace
        let room = socket.handshake.query.room
        console.log("connection1")
        socket.on('disconnect', function(){
            console.log("disconnect")
            socket.to(room).emit('chat message',(socket.nicknames || socket.id)   + ':离开房间');
        });
        socket.on('name', function(msg){
            socket.nicknames = msg
            socket.join(room, () => {
                let rooms = Object.keys(socket.rooms);
                console.log(rooms); // [ <socket.id>, 'room 237' ]
                console.log(socket.broadcast)
                socket.broadcast.to(room).emit('chat message',(socket.nicknames || socket.id) + ':加入房间');
            });
        });


        socket.on('chat message', function(msg){
            socket.broadcast.to(room).emit('chat message',(socket.nicknames || socket.id) + "说：" +  msg);
        });
    });

    //
    const adminNamespace2 = io.of('/admin2')
    adminNamespace2.on('connect', (socket) => {
        const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
        // broadcast to all clients in the given sub-namespace

        console.log("connection2")
        socket.on('disconnect', function(){
            console.log("disconnect")
            socket.broadcast.emit('chat message',(socket.nicknames || socket.id)   + ':离开房间');
        });

        socket.on('name', function(msg){
            socket.nicknames = msg
            socket.broadcast.emit('chat message',(socket.nicknames || socket.id) + ':加入房间');
        });


        socket.on('chat message', function(msg){
            socket.broadcast.emit('chat message',(socket.nicknames || socket.id) + "说：" +  msg);
        });
    });
}
