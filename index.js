import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";

// const express = require("express");
const app = express();

import http from "http";
// const http = require("http");
const server = http.createServer(app);

import { Server } from "socket.io";
// const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 4000;

// const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// This sets up an event listener for the 'connection' event, which is triggered whenever a client connects to the server
// This sets up an event listener for the 'data' event sent by the client. When the server receives a 'data' event from any client, it emits the same 'data' event to all connected clients using io.emit().

io.on("connection", (socket) => {
  socket.on("data", (msg) => {
    console.log("Something1");
    io.emit("data", msg);
    console.log("Something2");
  });

  socket.on("dtcData", (msg) => {
    io.emit("dtcData", msg);
  });

  socket.on("log", (msg) => {
    io.emit("log", msg);
  });
});

// This method starts the server and binds it to the specified port. The port parameter specifies the port number on which the server should listen for incoming connections.
io.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
