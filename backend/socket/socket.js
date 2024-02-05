import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Seen
  socket.on("markMessagesAsSeen", async ({ senderId, receiverId }) => {
    // console.log(senderId, receiverId);
    try {
      await Message.updateMany(
        { senderId: senderId, receiverId: receiverId, seen: false },
        { $set: { seen: true } }
      );
      console.log(userId);
      console.log("sreod", senderId, receiverId);
      io.to(userSocketMap[receiverId]).emit("messagesSeen", {
        senderId: senderId,
        receiverId: receiverId,
      });
      // io.emit("messagesSeen", { senderId, receiverId });
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
