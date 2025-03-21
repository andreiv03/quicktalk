import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { RiArrowRightSLine, RiSearchLine } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";

import { AuthContext } from "@/contexts/auth-context";
import { ConversationsContext } from "@/contexts/conversations-context";
import { MessagesContext } from "@/contexts/message-context";
import { useContextHook } from "@/hooks/use-context-hook";
import { truncateString } from "@/utils/helpers";

import styles from "@/styles/components/sidebar.module.scss";

interface Props {
	setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SKELETON_ITEM_HEIGHT = 44;

export default function Sidebar({ setIsSearchOpen }: Props) {
	const { user, logout } = useContextHook(AuthContext);
	const {
		state: conversationsState,
		joinConversation,
		leaveConversation,
	} = useContextHook(ConversationsContext);
	const { clearMessages } = useContextHook(MessagesContext);

	const skeletonContainerRef = useRef<HTMLDivElement>(null);
	const [skeletonCount, setSkeletonCount] = useState(30);

	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (conversationsState.conversations && conversationsState.conversations.length > 0) {
			setIsLoading(false);
		}
	}, [conversationsState.conversations]);

	useEffect(() => {
		if (!skeletonContainerRef.current) {
			return;
		}

		const updateSkeletonCount = () => {
			const containerHeight = skeletonContainerRef.current?.clientHeight ?? 0;
			setSkeletonCount(Math.floor(containerHeight / SKELETON_ITEM_HEIGHT));
		};

		const observer = new ResizeObserver(updateSkeletonCount);
		observer.observe(skeletonContainerRef.current);
		updateSkeletonCount();

		return () => {
			observer.disconnect();
		};
	}, []);

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

					{isLoading ? (
						<div
							className={`${styles["container"]} ${isLoading ? styles["loading"] : ""}`}
							ref={skeletonContainerRef}
						>
							{Array.from({ length: skeletonCount + 1 }).map((_, index) => (
								<div className={styles["skeleton"]} key={index}>
									<div className={styles["avatar"]} />
									<div className={styles["text"]} />
								</div>
							))}
						</div>
					) : conversations.length > 0 ? (
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
										className={`${styles["conversation"]} ${isActive ? styles["active"] : ""}`}
										key={conversation._id}
										onClick={() => {
											joinConversation(conversation);
											setIsVisible(false);
										}}
									>
										<div className={styles["avatar"]}>{participant.username.charAt(0)}</div>
										<h3>{truncateString(participant.username, 15)}</h3>
									</div>
								);
							})}
						</div>
					) : (
						<div className={styles["subtitle"]}>No conversations found</div>
					)}
				</div>
			</div>

			<div className={styles["bottom_section"]}>
				<button
					onClick={() => {
						leaveConversation();
						clearMessages();
						logout();
					}}
					type="button"
				>
					<CgLogOut />
					Log out
				</button>
			</div>

			<div className={styles["close"]} onClick={() => setIsVisible(!isVisible)}>
				<RiArrowRightSLine />
			</div>
		</div>
	);
}
