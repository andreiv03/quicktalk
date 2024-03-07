import type { Message } from "api/models/message";

export const validateConversationId = (conversationId: string) => {
	if (!conversationId) return false;
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(conversationId);
};

export const validateMessage = (message: Message) => {
	if (!message) return false;
	return (
		typeof message.conversation === "string" &&
		message.conversation.trim() !== "" &&
		typeof message.sender === "string" &&
		message.sender.trim() !== "" &&
		typeof message.text === "string" &&
		message.text.trim() !== ""
	);
};
