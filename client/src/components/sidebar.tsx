import Image from "next/image";
import { useMemo, useState } from "react";
import { RiArrowRightSLine, RiSearchLine } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";

import { truncateString } from "@/utils/helpers";

import styles from "@/styles/components/sidebar.module.scss";
import { useContextHook } from "@/hooks/use-context-hook";
import { AuthContext } from "@/contexts/auth-context";
import { ConversationsContext } from "@/contexts/conversations-context";

interface Props {
	setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ setIsSearchOpen }: Props) {
	const { user, logout } = useContextHook(AuthContext);
	const { state: conversationsState, joinConversation } = useContextHook(ConversationsContext);

	const [isVisible, setIsVisible] = useState(false);

	const conversations = useMemo(
		() => conversationsState.conversations ?? [],
		[conversationsState.conversations],
	);

	return (
		<div className={`${styles["sidebar"]} ${isVisible ? styles["visible"] : ""}`}>
			<div className={styles["top_section"]}>
				<div className={styles["logo"]}>
					<Image alt="logo" src="/logo.svg" priority height={40} width={40} />
				</div>
			</div>

			<div className={styles["content"]}>
				<div className={styles["search"]} onClick={() => setIsSearchOpen(true)}>
					<RiSearchLine />
					<span>Find or start a conversation</span>
				</div>

				<div className={styles["conversations"]}>
					<div className={styles["title"]}>
						<h3>Conversations [{conversations.length}]</h3>
					</div>

					{conversations.length > 0 ? (
						<div className={styles["container"]}>
							{conversations.map((conversation) => {
								const isActive = conversationsState.activeConversation?._id === conversation._id;
								const participant = conversation.participants.find(
									(participant) => participant._id !== user?._id,
								);

								if (!participant) {
									return null;
								}

								return (
									<div
										className={`${styles["conversation"]} ${styles[isActive ? "active" : ""]}`}
										key={conversation._id}
										onClick={() => joinConversation(conversation)}
									>
										<div className={styles["avatar"]}>{participant.username.charAt(0)}</div>
										<h3>{truncateString(participant.username, 15)}</h3>
									</div>
								);
							})}
						</div>
					) : (
						<div className={styles["subtitle"]}>
							<span>No conversations found</span>
						</div>
					)}
				</div>
			</div>

			<div className={styles["bottom_section"]}>
				<button onClick={logout} type="button">
					<CgLogOut />
					<span>Log out</span>
				</button>
			</div>

			<div className={styles["close"]} onClick={() => setIsVisible(!isVisible)}>
				<RiArrowRightSLine />
			</div>
		</div>
	);
}
