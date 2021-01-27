const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when user connects
io.on('connection', socket => {
    // console.log('new connection');

    // welcome for current user
    socket.emit('message', 'Welcome to Chatte-R');

    // broadcast when new user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // when user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        // console.log(msg);
        io.emit('message', msg);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));