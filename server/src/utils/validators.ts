import type { IMessage } from "@/models/message.model";

const isNonEmptyString = (str: string): boolean => {
	return typeof str === "string" && str.trim() !== "";
};

export const validateConversationId = (conversationId: string): boolean => {
	if (!conversationId) {
		return false;
	}

	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(conversationId);
};

export const validateMessage = (message: IMessage): boolean => {
	if (!message) {
		return false;
	}

	return (
		isNonEmptyString(message.conversation?.toString()) &&
		isNonEmptyString(message.sender?.toString()) &&
		isNonEmptyString(message.text)
	);
};
