"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const socket = (io) => {
    io.on("connection", (socket) => {
        socket.on("join_channel", (channel) => {
            socket.join(channel);
        });
        socket.on("send_message", (data) => {
            socket.to(data.channel).emit("send_message", Object.assign(Object.assign({}, data), { createdAt: new Date() }));
        });
    });
};
exports.default = socket;
