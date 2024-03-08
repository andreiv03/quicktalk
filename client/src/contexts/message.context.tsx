import { createContext, useContext, useEffect, useState } from "react";

import { useAuthContext } from "contexts/auth.context";
import { useConversationContext } from "contexts/conversation.context";
import { messageService, type Message } from "services/message.service";
import { socket } from "utils/socket";

interface MessageContext {
	callback: boolean;
	setCallback: React.Dispatch<React.SetStateAction<boolean>>;
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	sendMessage: (messageData: Omit<Message, "_id" | "createdAt">) => void;
}

export const MessageContext = createContext<MessageContext>({} as MessageContext);

export const useMessageContext = () => {
	const messageContext = useContext(MessageContext);
	if (!messageContext) throw new Error("Something went wrong with the React Context API!");
	return messageContext;
};

export const MessageContextProvider: React.FC<{
	children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
	const [callback, setCallback] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const authContext = useAuthContext();
	const conversationContext = useConversationContext();

	useEffect(() => {
		if (!authContext.accessToken) return;
		if (!conversationContext.conversation._id) return;

		const getMessages = async () => {
			try {
				const { data } = await messageService.getMessages(
					authContext.accessToken,
					conversationContext.conversation._id
				);
				setMessages(data);
			} catch (error: any) {
				alert(error.response.data.message);
			}
		};

		getMessages();
	}, [authContext.accessToken, conversationContext.conversation._id, callback]);

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
			const { data } = await messageService.sendMessage(authContext.accessToken, messageData);
			socket.emit("send_message", { ...messageData, _id: data._id });
			setCallback(!callback);
		} catch (error: any) {
			alert(error.response.data.message);
		}
	};

	const state: MessageContext = {
		callback,
		setCallback,
		messages,
		setMessages,
		sendMessage
	};

	return <MessageContext.Provider value={state}>{children}</MessageContext.Provider>;
};
