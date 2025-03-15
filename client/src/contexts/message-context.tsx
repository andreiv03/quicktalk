"use client";

import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";

import axios from "@/config/axios";
import { getSocket } from "@/config/socket";
import { AuthContext } from "@/contexts/auth-context";
import { ConversationsContext } from "@/contexts/conversations-context";
import { useContextHook } from "@/hooks/use-context-hook";
import type { SendMessageResponse, GetMessagesResponse, Message } from "@/types/message";
import { asyncHandler } from "@/utils/async-handler";

interface MessagesState {
	messages: Message[];
}

type MessagesAction = { type: "SET_MESSAGES"; payload: Message[] } | { type: "CLEAR_MESSAGES" };

interface MessagesContext {
	state: MessagesState;
	sendMessage: (text: string) => void;
	clearMessages: () => void;
}

export const MessagesContext = createContext<MessagesContext | null>(null);

const reducer = (state: MessagesState, action: MessagesAction): MessagesState => {
	switch (action.type) {
		case "SET_MESSAGES":
			return { ...state, messages: action.payload };

		case "CLEAR_MESSAGES":
			return { ...state, messages: [] };

		default:
			return state;
	}
};

export function MessagesProvider({ children }: { children: React.ReactNode }) {
	const { state: authState } = useContextHook(AuthContext);
	const { state: conversationsState } = useContextHook(ConversationsContext);

	const [state, dispatch] = useReducer(reducer, { messages: [] });

	const fetchMessages = useCallback(() => {
		return asyncHandler(async () => {
			if (authState.accessToken && conversationsState.activeConversation) {
				const API_ROUTE = `/messages/conversation/${conversationsState.activeConversation._id}`;
				const { data } = await axios.get<GetMessagesResponse>(API_ROUTE, {
					headers: { Authorization: `Bearer ${authState.accessToken}` },
				});
				dispatch({ type: "SET_MESSAGES", payload: data.messages });
			}
		})();
	}, [authState.accessToken, conversationsState.activeConversation]);

	useEffect(() => {
		if (authState.accessToken && conversationsState.activeConversation?._id) {
			fetchMessages();
		}
	}, [authState.accessToken, conversationsState.activeConversation, fetchMessages]);

	const receiveMessage = useCallback(
		(message: Message) => {
			dispatch({ type: "SET_MESSAGES", payload: [...state.messages, message] });
		},
		[state.messages],
	);

	useEffect(() => {
		const socket = getSocket();
		if (!socket.connected) {
			socket.connect();
		}

		socket.off("receive_message").on("receive_message", receiveMessage);

		return () => {
			socket.off("receive_message", receiveMessage);
		};
	}, [receiveMessage]);

	const sendMessage = useCallback(
		(text: string) => {
			return asyncHandler(async () => {
				if (!authState.accessToken || !authState.user) {
					return;
				}

				if (!conversationsState.activeConversation) {
					return;
				}

				const socket = getSocket();
				if (!socket.connected) {
					socket.connect();
				}

				const formData = {
					conversation: conversationsState.activeConversation._id,
					sender: authState.user._id,
					text,
				};

				const { data } = await axios.post<SendMessageResponse>("/messages/send-message", formData, {
					headers: { Authorization: `Bearer ${authState.accessToken}` },
				});

				socket.emit("send_message", data);
				dispatch({ type: "SET_MESSAGES", payload: [...state.messages, data.newMessage] });
			})();
		},
		[authState.accessToken, authState.user, conversationsState.activeConversation, state.messages],
	);

	const clearMessages = useCallback(() => {
		dispatch({ type: "CLEAR_MESSAGES" });
	}, []);

	const contextValue = useMemo(
		() => ({ state, sendMessage, clearMessages }),
		[state, sendMessage, clearMessages],
	);

	return <MessagesContext.Provider value={contextValue}>{children}</MessagesContext.Provider>;
}
