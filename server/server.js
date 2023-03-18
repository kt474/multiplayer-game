const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

let circlePosition = { x: 250, y: 250 };

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the initial position of the circle to the client
  socket.emit('position', circlePosition);

  // Handle the 'position' event sent by the client and update the circle's position
  socket.on('position', (data) => {
    circlePosition = data;
    console.log(`Circle position updated to (${circlePosition.x}, ${circlePosition.y})`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
