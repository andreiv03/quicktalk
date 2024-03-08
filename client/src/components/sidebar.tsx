import { startTransition, useState } from "react";
import { RiArrowRightSLine, RiLogoutCircleLine, RiSearchLine } from "react-icons/ri";

import { useAuthContext } from "contexts/auth.context";
import { useConversationContext } from "contexts/conversation.context";
import { truncateText } from "utils/helpers";

import styles from "styles/components/sidebar.module.scss";

interface Props {
	setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<Props> = ({ setIsSearchOpen }) => {
	const [isVisible, setIsVisible] = useState(false);

	const authContext = useAuthContext();
	const conversationContext = useConversationContext();

	return (
		<div className={`${styles["sidebar"]} ${isVisible ? styles["visible"] : ""}`}>
			<div className={styles["top_section"]}>
				<div className={styles["logo"]}>
					<img
						alt="logo"
						src="/logo.svg"
					/>
				</div>
			</div>

			<div className={styles["content"]}>
				<div
					className={styles["search"]}
					onClick={() => setIsSearchOpen(true)}
				>
					<RiSearchLine />
					<span>Find or start a conversation</span>
				</div>

				<div className={styles["conversations"]}>
					<div className={styles["title"]}>
						<h3>Conversations [{conversationContext.conversations.length}]</h3>
					</div>

					{conversationContext.conversations.length > 0 ? (
						<div className={styles["container"]}>
							{conversationContext.conversations.map((conversation) => (
								<div
									className={`${styles["conversation"]} ${
										conversationContext.conversation._id === conversation._id
											? styles["active"]
											: ""
									}`}
									key={conversation._id}
									onClick={() =>
										startTransition(() => conversationContext.joinConversation(conversation))
									}
								>
									<div className={styles["avatar"]}>{conversation.name[0]}</div>
									<h3>{truncateText(conversation.name, 15)}</h3>
								</div>
							))}
						</div>
					) : (
						<div className={styles["subtitle"]}>
							<span>No conversations found</span>
						</div>
					)}
				</div>
			</div>

			<div className={styles["bottom_section"]}>
				<button
					onClick={authContext.logout}
					type="button"
				>
					<RiLogoutCircleLine />
					<span>Log out</span>
				</button>
			</div>

			<div
				className={styles["close"]}
				onClick={() => setIsVisible(!isVisible)}
			>
				<RiArrowRightSLine />
			</div>
		</div>
	);
};

export default Sidebar;
