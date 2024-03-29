import { useEffect, useState } from "react";

import { useAuthContext } from "contexts/auth.context";
import { useConversationContext } from "contexts/conversation.context";
import { conversationService } from "services/conversation.service";
import { userService, type User } from "services/user.service";

import styles from "styles/components/search.module.scss";

interface Props {
	isSearchOpen: boolean;
	setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<Props> = ({ isSearchOpen, setIsSearchOpen }) => {
	const [username, setUsername] = useState("");
	const [users, setUsers] = useState<User[]>([]);

	const authContext = useAuthContext();
	const conversationContext = useConversationContext();

	useEffect(() => {
		if (!username) return setUsers([]);

		const getUsersByUsername = async () => {
			try {
				const { data } = await userService.getUsersByUsername(authContext.accessToken, username);
				setUsers(data);
			} catch (error: any) {
				alert(error.response.data.message);
			}
		};

		getUsersByUsername();
	}, [username]);

	const closeSearch = () => {
		setIsSearchOpen(false);
		setUsername("");
		setUsers([]);
	};

	const openConversation = async (receiverId: string, receiverUsername: string) => {
		try {
			const { data } = await conversationService.getConversation(
				authContext.accessToken,
				receiverId,
				receiverUsername,
				authContext.user.username
			);
			conversationContext.setConversation(data);
			conversationContext.setCallback(!conversationContext.callback);
			closeSearch();
		} catch (error: any) {
			alert(error.response.data.message);
		}
	};

	return (
		<>
			<div className={`${styles["search"]} ${isSearchOpen ? styles["open"] : ""}`}>
				<form onSubmit={() => {}}>
					<label htmlFor="username">Find or start a conversation</label>
					<div className={styles["input_container"]}>
						<input
							autoComplete="off"
							id="username"
							onChange={(event) => setUsername(event.target.value)}
							placeholder="username"
							type="text"
							value={username}
						/>
					</div>
				</form>

				{users.length > 0 ? (
					<div className={styles["users"]}>
						{users.map((user) => (
							<div
								className={styles["user"]}
								key={user._id}
							>
								<span onClick={() => openConversation(user._id, user.username)}>
									{user.username}
								</span>
							</div>
						))}
					</div>
				) : null}

				<button
					onClick={closeSearch}
					type="button"
				>
					Close
				</button>
			</div>

			<div
				className={`${styles["overlay"]} ${isSearchOpen ? styles["open"] : ""}`}
				onClick={closeSearch}
			/>
		</>
	);
};

export default Search;
