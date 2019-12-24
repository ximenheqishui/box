module.exports = function app (webSocket,wsServer) {
    let rooms = [{
        id: 1,
        name: 123,
        allMessage: [],
        create_time: new Date(),
        des: '假的'
    }]
    webSocket.on('connection', function connection(ws) {
        console.log("connection")
        ws.on('message', function incoming(message) {
            let data = JSON.parse(message)
            switch (data.type) {
                case 'join_room':
                    ws.room = data.data.room
                    rooms.forEach(function(item){
                        if (item.name == ws.room) {
                            ws.send(JSON.stringify({
                                type: 'all_message',
                                data: item.allMessage
                            }))
                        }
                    })
                    webSocket.clients.forEach(function each(client) {
                        if (client !== ws && client.room == ws.room && client.readyState === wsServer.OPEN) {
                            client.send(message);
                        }
                    });
                    break
                case 'message':
                    rooms.forEach(function(item){
                        if (item.name == ws.room) {
                           item.allMessage.push(data.data)
                        }
                    })
                    webSocket.clients.forEach(function each(client) {
                        if (client.room == ws.room && client.readyState === wsServer.OPEN) {
                            client.send(message);
                        }
                    });
                    break
            }
        });
        ws.on('open', function open() {
        });
        ws.on('close', function close() {
            console.log('disconnected');
        });
    });
}
