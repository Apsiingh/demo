const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const session = require("express-session");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Initialize sessions
const sessionOptions = {
  secret: "Apsingh_secret_code",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1 * 60 * 60 * 1000,
    maxAge: 1 * 60 * 60 * 1000,
  },
  httpOnly: true,
};

app.use(session(sessionOptions));

app.use(express.static(__dirname + "/public"));

let buttonState = { A: true, B: true, C: true };

io.on("connection", function (socket) {
  // Send initial state to the client
  console.log("User Connected")
  socket.emit("initialState", buttonState);

  socket.on("activate", function () {
    buttonState = { A: true, B: true, C: true };
    io.emit("activate");
  });

  socket.on("buttonClick", function (buttonId) {
    buttonState[buttonId] = false;
    io.emit("buttonClick", buttonId);
  });
});

const port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
