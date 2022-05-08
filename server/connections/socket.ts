import { Server, Socket } from "socket.io";

import type { ChannelInterface } from "../api/models/channels-model";
import type { MessageInterface } from "../api/models/messages-model";

const socket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("join_channel", (channel: string) => {
      socket.join(channel);
    });

    socket.on("leave_channel", (channel: string) => {
      socket.leave(channel);
    });

    socket.on("create_channel", (channel: ChannelInterface) => {
      socket.join(channel._id);
      io.emit("create_channel", channel);
    });

    socket.on("delete_channel", (channel: string) => {
      socket.leave(channel);
      io.emit("delete_channel", channel);
    });

    socket.on("send_message", (data: MessageInterface) => {
      io.sockets.in(data.channel).emit("send_message", { ...data, createdAt: new Date() });
    });
  });
}

export default socket;