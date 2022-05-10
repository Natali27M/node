export const socketController = {
    messageCreate: (io: any, socket: any, data: any) =>{
        console.log(data);

        // socket.emit('message:get-all', {messages: [{text: data.message}]});

        socket.broadcast.emit('message:get-all', 'TEST');
    }
}