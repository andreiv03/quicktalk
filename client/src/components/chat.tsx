import { useEffect, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";

import { useAuthContext } from "contexts/auth.context";
import { useConversationContext } from "contexts/conversation.context";
import { useMessageContext } from "contexts/message.context";
import type { Message } from "services/message.service";
import { formatDate } from "utils/helpers";

import styles from "styles/components/chat.module.scss";

interface Props {
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chat: React.FC<Props> = ({ setIsMenuOpen }) => {
	const messagesContainerRef = useRef({} as HTMLDivElement);
	const [messageText, setMessageText] = useState("");

	const authContext = useAuthContext();
	const conversationContext = useConversationContext();
	const messageContext = useMessageContext();

	useEffect(() => {
		messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
	}, [messageContext.messages]);

	const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const messageData: Omit<Message, "_id" | "createdAt"> = {
				conversation: conversationContext.conversation._id,
				sender: authContext.user.username,
				text: messageText
			};
			messageContext.sendMessage(messageData);
			setMessageText("");
		} catch (error: any) {
			alert(error.response.data.message);
		}
	};

	return (
		<div className={styles["chat"]}>
			<div className={styles["top_section"]}>
				<div className={styles["column"]}>
					<div className={styles["avatar"]}>{conversationContext.conversation.name[0]}</div>
					<h3>{conversationContext.conversation.name}</h3>
				</div>

				<div className={styles["column"]}>
					<div
						className={styles["button"]}
						onClick={() => setIsMenuOpen(true)}
					>
						<HiOutlineDotsVertical />
					</div>
				</div>
			</div>

			<div
				className={styles["messages"]}
				ref={messagesContainerRef}
			>
				<div className={styles["toast"]}>Each message is automatically deleted after 24 hours.</div>

				{messageContext.messages.map((message, index) => (
					<div
						className={
							message.sender === authContext.user.username ? styles["right"] : styles["left"]
						}
						key={message._id}
					>
						<div
							className={`${styles["wrapper"]} ${
								index < messageContext.messages.length - 1 &&
								message.sender === messageContext.messages[index + 1]?.sender
									? styles["current_sender"]
									: ""
							}`}
						>
							<div className={styles["message"]}>{message.text}</div>

							<div className={styles["sender"]}>
								<div
									className={`${styles["avatar"]} ${
										message.sender !== authContext.user.username ? styles["visible"] : ""
									}`}
								>
									{message.sender[0]}
								</div>

								<div className={styles["informations"]}>
									<div className={styles["username"]}>
										{message.sender === authContext.user.username ? "You" : message.sender}
									</div>
									<div className={styles["date"]}>{formatDate(message.createdAt)}</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className={styles["bottom_section"]}>
				<form
					noValidate
					onKeyDown={(event) => event.key === "Enter" && sendMessage(event)}
					onSubmit={sendMessage}
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

					<button
						disabled={!messageText}
						type="submit"
					>
						<RiSendPlaneFill />
						<span>Send</span>
					</button>
				</form>
			</div>
		</div>
	);
};

export default Chat;
