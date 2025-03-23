import type { Server, Socket } from "socket.io";

import type { IMessage } from "@/models/message.model";
import { Types } from "mongoose";

const joinConversation = (socket: Socket, conversationId: string) => {
	if (!Types.ObjectId.isValid(conversationId)) {
		socket.emit("error", "Invalid conversation ID");
		return;
	}

	socket.join(conversationId);
};

const leaveConversation = (socket: Socket, conversationId: string) => {
	if (!Types.ObjectId.isValid(conversationId)) {
		socket.emit("error", "Invalid conversation ID");
		return;
	}

	socket.leave(conversationId);
};

const sendMessage = (socket: Socket, message: IMessage) => {
	if (!Types.ObjectId.isValid(message.conversation)) {
		socket.emit("error", "Invalid conversation ID");
		return;
	}

	socket.to(message.conversation.toString()).emit("receive_message", message);
};

export const establishSocketIOConnection = (io: Server) => {
	io.on("connection", (socket: Socket) => {
		socket.on("join_conversation", (conversationId: string) =>
			joinConversation(socket, conversationId),
		);

		socket.on("leave_conversation", (conversationId: string) =>
			leaveConversation(socket, conversationId),
		);

		socket.on("send_message", (message: IMessage) => {
			sendMessage(socket, message);
		});
	});
};
