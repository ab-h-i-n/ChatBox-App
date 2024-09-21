import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import log from "../utils/log.js";

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 2e7,
});

let roomUsers = {};

io.on("connection", (socket) => {
  log("User Connected " + socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    roomUsers = {
      ...roomUsers,
      [roomId]: [...(roomUsers[roomId] ?? []), socket.id],
    };
    io.emit("users_response", roomUsers);
    log(`User with ID: ${socket.id} joined room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    log("User Disconnected " + socket.id);
    for (const [roomId, users] of Object.entries(roomUsers)) {
      if (users.includes(socket.id)) {
        roomUsers[roomId] = [...users.filter((id) => id !== socket.id)];
      }
    }
    io.emit("users_response", roomUsers);
  });
});
