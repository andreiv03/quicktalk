import { createContext, useContext, useEffect, useState } from "react";

import { useAuthContext } from "contexts/auth.context";
import { conversationsService, type Conversation } from "services/conversations.service";
import { socket } from "utils/socketio";

interface ConversationsContext {
	callback: boolean;
	setCallback: React.Dispatch<React.SetStateAction<boolean>>;
	conversation: Conversation;
	setConversation: React.Dispatch<React.SetStateAction<Conversation>>;
	conversations: Conversation[];
	setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
	joinConversation: (newConversation: Conversation) => void;
}

export const ConversationsContext = createContext<ConversationsContext>({} as ConversationsContext);

export const useConversationsContext = () => {
	const conversationsContext = useContext(ConversationsContext);
	if (!conversationsContext) throw new Error("Something went wrong with the React Context API!");
	return conversationsContext;
};

export const ConversationsContextProvider: React.FC<{
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
				const { data } = await conversationsService.getConversations(authContext.accessToken);
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

	const state: ConversationsContext = {
		callback,
		setCallback,
		conversation,
		setConversation,
		conversations,
		setConversations,
		joinConversation
	};

	return <ConversationsContext.Provider value={state}>{children}</ConversationsContext.Provider>;
};
