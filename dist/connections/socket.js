"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket = (io) => {
    io.on("connection", (socket) => {
        socket.on("join_channel", (channel) => {
            socket.join(channel);
        });
        socket.on("leave_channel", (channel) => {
            socket.leave(channel);
        });
        socket.on("create_channel", (channel) => {
            socket.join(channel._id);
            io.emit("create_channel", channel);
        });
        socket.on("delete_channel", (channel) => {
            socket.leave(channel);
            io.emit("delete_channel", channel);
        });
        socket.on("send_message", (data) => {
            io.sockets.in(data.channel).emit("send_message", Object.assign(Object.assign({}, data), { createdAt: new Date() }));
        });
    });
};
exports.default = socket;
