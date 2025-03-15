"use client";

import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";

import axios from "@/config/axios";
import { getSocket } from "@/config/socket";
import { AuthContext } from "@/contexts/auth-context";
import { useContextHook } from "@/hooks/use-context-hook";
import type { Conversation, GetConversationsResponse } from "@/types/conversation";
import { asyncHandler } from "@/utils/async-handler";

interface ConversationsState {
	conversations: Conversation[];
	activeConversation: Conversation | null;
}

type ConversationsAction =
	| { type: "SET_CONVERSATIONS"; payload: Conversation[] }
	| { type: "ADD_CONVERSATION"; payload: Conversation }
	| { type: "SET_ACTIVE_CONVERSATION"; payload: Conversation }
	| { type: "CLEAR_ACTIVE_CONVERSATION" };

interface ConversationsContext {
	state: ConversationsState;
	joinConversation: (conversation: Conversation) => void;
	leaveConversation: () => void;
}

export const ConversationsContext = createContext<ConversationsContext | null>(null);

const reducer = (state: ConversationsState, action: ConversationsAction): ConversationsState => {
	switch (action.type) {
		case "SET_CONVERSATIONS":
			return { ...state, conversations: action.payload };

		case "ADD_CONVERSATION":
			return { ...state, conversations: [...state.conversations, action.payload] };

		case "SET_ACTIVE_CONVERSATION":
			return { ...state, activeConversation: action.payload };

		case "CLEAR_ACTIVE_CONVERSATION":
			return { ...state, activeConversation: null };

		default:
			return state;
	}
};

export function ConversationsProvider({ children }: { children: React.ReactNode }) {
	const { state: authState } = useContextHook(AuthContext);

	const [state, dispatch] = useReducer(reducer, { conversations: [], activeConversation: null });

	const fetchConversations = useCallback(() => {
		return asyncHandler(async () => {
			if (authState.accessToken) {
				const { data } = await axios.get<GetConversationsResponse>("/conversations", {
					headers: { Authorization: `Bearer ${authState.accessToken}` },
				});
				dispatch({ type: "SET_CONVERSATIONS", payload: data.conversations });
			}
		})();
	}, [authState.accessToken]);

	useEffect(() => {
		if (authState.accessToken) {
			fetchConversations();
		}
	}, [authState.accessToken, fetchConversations]);

	const joinConversation = useCallback(
		(conversation: Conversation) => {
			if (!conversation) {
				return;
			}

			if (state.activeConversation?._id === conversation._id) {
				return;
			}

			const socket = getSocket();
			if (!socket.connected) {
				socket.connect();
			}

			if (state.activeConversation?._id) {
				socket.emit("leave_conversation", state.activeConversation._id);
			}

			socket.emit("join_conversation", conversation._id);
			dispatch({ type: "SET_ACTIVE_CONVERSATION", payload: conversation });

			if (!state.conversations.find((c) => c._id === conversation._id)) {
				dispatch({ type: "ADD_CONVERSATION", payload: conversation });
			}
		},
		[state.activeConversation, state.conversations],
	);

	const leaveConversation = useCallback(() => {
		if (!state.activeConversation) {
			return;
		}

		const socket = getSocket();
		if (!socket.connected) {
			socket.connect();
		}

		socket.emit("leave_conversation", state.activeConversation._id);
		dispatch({ type: "CLEAR_ACTIVE_CONVERSATION" });
	}, [state.activeConversation]);

	const contextValue = useMemo(
		() => ({ state, joinConversation, leaveConversation }),
		[state, joinConversation, leaveConversation],
	);

	return (
		<ConversationsContext.Provider value={contextValue}>{children}</ConversationsContext.Provider>
	);
}
