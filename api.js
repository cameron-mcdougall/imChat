const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', socket => {

    socket.on('username', username => {
        socket.username = username;
        io.emit('is_online', `+ <i><strong>${socket.username}</strong> joned the chat.</i>`);
    });

    socket.on('disconnect', username => {
        io.emit('is_online', `- <i><strong>${socket.username}</strong> left the chat.</i>`);
    });

    socket.on('chat_message', message => {
        io.emit('chat_message', `<strong>${socket.username}</strong>: ${message}`);
    });
    
});