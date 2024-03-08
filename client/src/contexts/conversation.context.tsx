import { createContext, useContext, useEffect, useState } from "react";

import { useAuthContext } from "contexts/auth.context";
import { conversationService, type Conversation } from "services/conversation.service";
import { socket } from "utils/socket";

interface ConversationContext {
	callback: boolean;
	setCallback: React.Dispatch<React.SetStateAction<boolean>>;
	conversation: Conversation;
	setConversation: React.Dispatch<React.SetStateAction<Conversation>>;
	conversations: Conversation[];
	setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
	joinConversation: (newConversation: Conversation) => void;
}

export const ConversationContext = createContext<ConversationContext>({} as ConversationContext);

export const useConversationContext = () => {
	const conversationContext = useContext(ConversationContext);
	if (!conversationContext) throw new Error("Something went wrong with the React Context API!");
	return conversationContext;
};

export const ConversationContextProvider: React.FC<{
	children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
	const [callback, setCallback] = useState(false);
	const [conversation, setConversation] = useState<Conversation>({} as Conversation);
	const [conversations, setConversations] = useState<Conversation[]>([]);

	const authContext = useAuthContext();

	useEffect(() => {
		if (!authContext.accessToken) return;

		const getConversations = async () => {
			try {
				const { data } = await conversationService.getConversations(authContext.accessToken);
				setConversations(data);
			} catch (error: any) {
				alert(error.response.data.message);
			}
		};

		getConversations();
	}, [authContext.accessToken, callback]);

	const joinConversation = (newConversation: Conversation) => {
		if (conversation._id === newConversation._id) return;
		if (conversation._id) socket.emit("leave_conversation", conversation._id);
		socket.emit("join_conversation", newConversation._id);
		setConversation(newConversation);
	};

	const state: ConversationContext = {
		callback,
		setCallback,
		conversation,
		setConversation,
		conversations,
		setConversations,
		joinConversation
	};

	return <ConversationContext.Provider value={state}>{children}</ConversationContext.Provider>;
};
