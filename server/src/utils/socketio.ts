import type { Server, Socket } from "socket.io";
import type { Message } from "api/models/messages.model";

export const establishSocketIOConnection = (io: Server) => {
	io.on("connection", (socket: Socket) => {
		console.log(`Socket ${socket.id} connected!`);

		socket.on("join_conversation", (conversationId: string) => {
			socket.join(conversationId);
		});

		socket.on("leave_conversation", (conversationId: string) => {
			socket.leave(conversationId);
		});

		socket.on("send_message", (message: Message) => {
			socket
				.to(message.conversation)
				.emit("receive_message", { ...message, createdAt: new Date() });
		});
	});
};
