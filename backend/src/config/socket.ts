import { messageQueue } from "../jobs/MessageQueue.js";
import { Server } from "node:http";
import { Socket, Server as SocketServer } from "socket.io";

export default (server: Server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on("join-room", async (roomId, data) => {
      socket.join(roomId);
      // * Add Payload in queue
      await messageQueue.add("messageQueue", data);
      io.to(roomId).emit("user-joined", data);
    });

    socket.on("message", async (data, roomId) => {
      await messageQueue.add("messageQueue", data);
      io.to(roomId).emit("new-message", data);
    });

    socket.on("left-group", async (roomId, data) => {
      io.to(roomId).emit("user-left", data);
      await messageQueue.add("messageQueue", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected...");
    });
  });
};
