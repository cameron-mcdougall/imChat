const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

io.sockets.on('connection', socket => {
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

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});