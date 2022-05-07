import { Server, Socket } from "socket.io";

interface SendMessageEventInterface {
  _id: string;
  channel: string;
  sender: string;
  text: string;
};

const socket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("join_channel", (channel: any) => {
      socket.join(channel);
    });

    socket.on("send_message", (data: SendMessageEventInterface) => {
      socket.to(data.channel).emit("send_message", { ...data, createdAt: new Date() });
    });
  });
}

export default socket;