import { useCallback } from "react";

import { ConversationsContext } from "@/contexts/conversations-context";
import { MessagesContext } from "@/contexts/message-context";
import { useContextHook } from "@/hooks/use-context-hook";

import styles from "@/styles/components/menu.module.scss";

interface Props {
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ isMenuOpen, setIsMenuOpen }: Props) {
	const { leaveConversation } = useContextHook(ConversationsContext);
	const { clearMessages } = useContextHook(MessagesContext);

	const closeConversation = useCallback(() => {
		leaveConversation();
		clearMessages();
		setIsMenuOpen(false);
	}, [leaveConversation, clearMessages, setIsMenuOpen]);

	return (
		<>
			<div className={`${styles["menu"]} ${styles[isMenuOpen ? "open" : ""]}`}>
				<button onClick={closeConversation} type="button">
					End conversation
				</button>

				<button onClick={() => setIsMenuOpen(false)} type="button">
					Close
				</button>
			</div>

			<div
				className={`${styles["overlay"]} ${styles[isMenuOpen ? "open" : ""]}`}
				onClick={() => setIsMenuOpen(false)}
			/>
		</>
	);
}
