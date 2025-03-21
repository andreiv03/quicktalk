import type { Server, Socket } from "socket.io";

import type { IMessage } from "@/models/message.model";
import { Types } from "mongoose";

const joinConversation = (socket: Socket, conversationId: string) => {
	if (!Types.ObjectId.isValid(conversationId)) {
		socket.emit("error", "Invalid conversation ID");
		return;
	}

	socket.join(conversationId);
	console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
};

const leaveConversation = (socket: Socket, conversationId: string) => {
	if (!Types.ObjectId.isValid(conversationId)) {
		socket.emit("error", "Invalid conversation ID");
		return;
	}

	socket.leave(conversationId);
	console.log(`Socket ${socket.id} left conversation ${conversationId}`);
};

const sendMessage = (socket: Socket, message: IMessage) => {
	if (!Types.ObjectId.isValid(message.conversation)) {
		socket.emit("error", "Invalid conversation ID");
		return;
	}

	socket.to(message.conversation.toString()).emit("receive_message", message);
	console.log(`Message sent to conversation ${message.conversation}`);
};

export const establishSocketIOConnection = (io: Server) => {
	io.on("connection", (socket: Socket) => {
		console.log(`Socket ${socket.id} connected`);

		socket.on("join_conversation", (conversationId: string) =>
			joinConversation(socket, conversationId),
		);

		socket.on("leave_conversation", (conversationId: string) =>
			leaveConversation(socket, conversationId),
		);

		socket.on("send_message", (message: IMessage) => {
			sendMessage(socket, message);
		});

		socket.on("disconnect", () => {
			console.log(`Socket ${socket.id} disconnected`);
		});
	});
};
