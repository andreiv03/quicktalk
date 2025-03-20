import { useEffect, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";

import { AuthContext } from "@/contexts/auth-context";
import { ConversationsContext } from "@/contexts/conversations-context";
import { MessagesContext } from "@/contexts/message-context";
import { useContextHook } from "@/hooks/use-context-hook";
import type { Message } from "@/types/message";
import { formatTime12Hour } from "@/utils/helpers";

import styles from "@/styles/components/chat.module.scss";

interface Props {
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Chat({ setIsMenuOpen }: Props) {
	const { user } = useContextHook(AuthContext);
	const { state: conversationsState } = useContextHook(ConversationsContext);
	const { state: messagesState, sendMessage } = useContextHook(MessagesContext);

	const messagesContainerRef = useRef({} as HTMLDivElement);
	const [messageText, setMessageText] = useState("");

	useEffect(() => {
		messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
	}, [messagesState.messages]);

	const getConversationName = () => {
		if (!user || !conversationsState.activeConversation) {
			return "";
		}

		const participant = conversationsState.activeConversation.participants.find(
			(participant) => participant._id !== user?._id,
		);

		return participant?.username ?? "";
	};

	const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		sendMessage(messageText);
		setMessageText("");
	};

	return (
		<div className={styles["chat"]}>
			<div className={styles["top_section"]}>
				<div className={styles["column"]}>
					<div className={styles["avatar"]}>{getConversationName()[0]}</div>
					<h3>{getConversationName()}</h3>
				</div>

				<div className={styles["column"]}>
					<div className={styles["button"]} onClick={() => setIsMenuOpen(true)}>
						<HiOutlineDotsVertical />
					</div>
				</div>
			</div>

			<div className={styles["messages"]} ref={messagesContainerRef}>
				<div className={styles["toast"]}>Each message is automatically deleted after 24 hours.</div>

				{messagesState.messages.map((message: Message, index: number) => (
					<div
						className={message.sender === user?.username ? styles["right"] : styles["left"]}
						key={message._id}
					>
						<div
							className={`${styles["wrapper"]} ${
								index < messagesState.messages.length - 1 &&
								message.sender === messagesState.messages[index + 1]?.sender
									? styles["current_sender"]
									: ""
							}`}
						>
							<div className={styles["message"]}>{message.text}</div>

							<div className={styles["sender"]}>
								<div
									className={`${styles["avatar"]} ${
										message.sender !== user?.username ? styles["visible"] : ""
									}`}
								>
									{message.sender[0]}
								</div>

								<div className={styles["informations"]}>
									<div className={styles["username"]}>
										{message.sender === user?.username ? "You" : message.sender}
									</div>
									<div className={styles["date"]}>{formatTime12Hour(message.createdAt)}</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className={styles["bottom_section"]}>
				<form
					noValidate
					onKeyDown={(event) => event.key === "Enter" && handleSendMessage(event)}
					onSubmit={handleSendMessage}
				>
					<input
						autoComplete="off"
						autoFocus
						id="message"
						placeholder="Write a message..."
						onChange={(event) => setMessageText(event.target.value)}
						type="text"
						value={messageText}
					/>

					<button disabled={!messageText} type="submit">
						<RiSendPlaneFill />
						<span>Send</span>
					</button>
				</form>
			</div>
		</div>
	);
}
