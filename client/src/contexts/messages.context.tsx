import { createContext, useContext, useEffect, useState } from "react";

import { useAuthContext } from "contexts/auth.context";
import { useConversationsContext } from "contexts/conversations.context";
import { messagesService, type Message } from "services/messages.service";
import { socket } from "utils/socketio";

interface MessagesContext {
	callback: boolean;
	setCallback: React.Dispatch<React.SetStateAction<boolean>>;
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	sendMessage: (messageData: Omit<Message, "_id" | "createdAt">) => void;
}

export const MessagesContext = createContext<MessagesContext>({} as MessagesContext);

export const useMessagesContext = () => {
	const messagesContext = useContext(MessagesContext);
	if (!messagesContext) throw new Error("Something went wrong with the React Context API!");
	return messagesContext;
};

export const MessagesContextProvider: React.FC<{
	children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
	const [callback, setCallback] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const authContext = useAuthContext();
	const conversationsContext = useConversationsContext();

	useEffect(() => {
		if (!authContext.accessToken) return;
		if (!conversationsContext.conversation._id) return;

		const getMessages = async () => {
			try {
				const { data } = await messagesService.getMessages(
					authContext.accessToken,
					conversationsContext.conversation._id
				);
				setMessages(data);
			} catch (error: any) {
				alert(error.response.data.message);
			}
		};

		getMessages();
	}, [authContext.accessToken, callback, conversationsContext.conversation._id]);

	useEffect(() => {
		const handleReceiveMessage = (message: Message) =>
			setMessages((prevState) => [...prevState, message]);

		socket.on("receive_message", handleReceiveMessage);
		return () => {
			socket.off("receive_message", handleReceiveMessage);
		};
	}, [setMessages]);

	const sendMessage = async (messageData: Omit<Message, "_id" | "createdAt">) => {
		try {
			const { data } = await messagesService.sendMessage(authContext.accessToken, messageData);
			socket.emit("send_message", { ...messageData, _id: data._id });
			setCallback(!callback);
		} catch (error: any) {
			alert(error.response.data.message);
		}
	};

	const state: MessagesContext = {
		callback,
		setCallback,
		messages,
		setMessages,
		sendMessage
	};

	return <MessagesContext.Provider value={state}>{children}</MessagesContext.Provider>;
};
