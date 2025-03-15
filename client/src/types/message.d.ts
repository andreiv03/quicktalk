export interface Message {
	_id: string;
	conversation: string;
	createdAt: string;
	sender: string;
	text: string;
}

export interface GetMessagesResponse {
	message: string;
	messages: Message[];
}

export interface SendMessageResponse {
	message: string;
	newMessage: Message;
}
