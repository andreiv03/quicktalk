export interface Conversation {
	_id: string;
	isArchived: boolean;
	participants: {
		_id: string;
		username: string;
	}[];
	type: "private" | "group";
}

export interface GetConversationsResponse {
	conversations: Conversation[];
	message: string;
}

export interface GetConversationResponse {
	conversation: Conversation;
	message: string;
}
