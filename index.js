import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors"; // Import cors package

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 4000;

app.use(express.static(__dirname + "/public"));

// Enable CORS middleware
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("data", (msg) => {
    io.emit("data", msg);
  });

  socket.on("dtcData", (msg) => {
    io.emit("dtcData", msg);
  });

  socket.on("log", (msg) => {
    io.emit("log", msg);
  });
});

io.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
