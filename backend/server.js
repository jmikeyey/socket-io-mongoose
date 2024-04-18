require('dotenv').config();
const express = require('express');
const { db } = require('./config/db');
const { setupChangeStream } = require('./services/audit');
// socket io
const http = require('http')
const socketIo = require('socket.io')
const port = process.env.PORT;
const app = express();
const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URI
  }
})


// Connect to MongoDB
db();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Start the HTTP server
server.listen(port, () => console.log(`Server started on port http://localhost:${port}`));

// Define your Express routes here...

app.get('/', (req, res) => {
  res.send('Welcome');
});

// Note Routes
const noteRoutes = require('./routes/notesRoute');
app.use('/api/notes', noteRoutes);

const connectedUsers = {};
// Initialize Socket.IO
io.of("/api/audit").on('connection', (socket) => {
  // Listen for the "send-message" event from the client
  socket.on('send-message', (data) => {
    console.log("Message Received:", data);
    // Here, you can handle the received message data as needed
  });
  socket.on('join_room', (room, cb) => {
    socket.join(room)
    connectedUsers[socket.id] = room;
    cb(`Joined Room ${room}`)
  })
  console.log(socket.id)
  setupChangeStream(socket);

  console.log(connectedUsers)
  // Function to send a sample message to a random room
  const sendSampleMessageToRoom = () => {
    // Get the keys (socket IDs) of connectedUsers
    const socketIds = Object.keys(connectedUsers);
    if (socketIds.length > 0) {
      // Get a random socket ID
      const randomSocketId = socketIds[0];
      // Get the room ID associated with the random socket ID
      const room = connectedUsers[randomSocketId];
      // Emit a sample message to the room
      io.of("/api/audit").to(room).emit('message', 'This is a sample message. Hello testing');
    }
  };
  // Example: Sending a sample message to a random room
});

setInterval(() => {
  io.of("/api/audit").to('20').emit('message', 'This is a sample message.');
}, 5000);

