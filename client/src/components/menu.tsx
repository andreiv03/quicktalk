import { useConversationsContext } from "contexts/conversations.context";
import { useMessagesContext } from "contexts/messages.context";
import type { Conversation } from "services/conversations.service";

import styles from "styles/components/menu.module.scss";

interface Props {
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
	const conversationsContext = useConversationsContext();
	const messagesContext = useMessagesContext();

	const endConversation = () => {
		conversationsContext.setConversation({} as Conversation);
		messagesContext.setMessages([]);
		setIsMenuOpen(false);
	};

	return (
		<>
			<div className={`${styles["menu"]} ${isMenuOpen ? styles["open"] : ""}`}>
				<button
					onClick={endConversation}
					type="button"
				>
					End conversation
				</button>

				<button
					onClick={() => setIsMenuOpen(false)}
					type="button"
				>
					Close
				</button>
			</div>

			<div
				className={`${styles["overlay"]} ${isMenuOpen ? styles["open"] : ""}`}
				onClick={() => setIsMenuOpen(false)}
			/>
		</>
	);
};

export default Menu;
