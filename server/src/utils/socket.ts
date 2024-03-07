import type { Server, Socket } from "socket.io";

import type { Message } from "api/models/message";
import { validateConversationId, validateMessage } from "utils/validators";

const handleJoinConversation = (socket: Socket, conversationId: string) => {
	if (!validateConversationId(conversationId)) return;
	socket.join(conversationId);
};

const handleLeaveConversation = (socket: Socket, conversationId: string) => {
	if (!validateConversationId(conversationId)) return;
	socket.leave(conversationId);
};

const handleSendMessage = (socket: Socket, message: Message) => {
	if (!validateMessage(message)) return;
	socket.to(message.conversation).emit("receive_message", {
		...message,
		createdAt: new Date()
	});
};

export const establishSocketIOConnection = (io: Server) => {
	try {
		io.on("connection", (socket) => {
			console.log(`Socket ${socket.id} connected`);

			socket.on("join_conversation", (conversationId: string) =>
				handleJoinConversation(socket, conversationId)
			);
			socket.on("leave_conversation", (conversationId: string) =>
				handleLeaveConversation(socket, conversationId)
			);
			socket.on("send_message", (message: Message) => handleSendMessage(socket, message));
		});
	} catch (error: any) {
		console.error(`Socket connection error:\n${error}`);
		process.exit(1);
	}
};
