import axios from "utils/axios";

export interface Conversation {
	_id: string;
	name: string;
}

class ConversationsService {
	getConversation(
		accessToken: string,
		receiverId: string,
		receiverUsername: string,
		senderUsername: string
	) {
		const receiverQuery = `receiverId=${receiverId}&receiverUsername=${receiverUsername}`;
		const senderQuery = `senderUsername=${senderUsername}`;

		return axios.get<Conversation>(`/conversations/conversation?${receiverQuery}&${senderQuery}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
	}

	getConversations(accessToken: string) {
		return axios.get<Conversation[]>("/conversations", {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
	}
}

export const conversationsService = new ConversationsService();
