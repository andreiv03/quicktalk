import { useConversationContext } from "contexts/conversation.context";
import { useMessageContext } from "contexts/message.context";
import type { Conversation } from "services/conversation.service";

import styles from "styles/components/menu.module.scss";

interface Props {
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
	const conversationContext = useConversationContext();
	const messageContext = useMessageContext();

	const endConversation = () => {
		conversationContext.setConversation({} as Conversation);
		messageContext.setMessages([]);
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
