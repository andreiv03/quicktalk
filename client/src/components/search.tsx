import { useCallback, useEffect, useRef, useState } from "react";

import axios from "@/config/axios";
import { ConversationsContext } from "@/contexts/conversations-context";
import { useContextHook } from "@/hooks/use-context-hook";
import type { GetConversationResponse } from "@/types/conversation";
import type { GetUsersResponse, User } from "@/types/user";

import styles from "@/styles/components/search.module.scss";
import { truncateString } from "@/utils/helpers";
import { asyncHandler } from "@/utils/async-handler";

interface Props {
	isSearchOpen: boolean;
	setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<Props> = ({ isSearchOpen, setIsSearchOpen }) => {
	const { joinConversation } = useContextHook(ConversationsContext);

	const searchRef = useRef<HTMLInputElement>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchUsers = useCallback(async (searchQuery: string) => {
		try {
			await asyncHandler(async () => {
				if (searchQuery.trim()) {
					setLoading(true);
					const { data } = await axios.get<GetUsersResponse>(`/users/search/${searchQuery}`);
					setUsers(data.users);
					setLoading(false);
				}
			}, true)();
		} catch {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		const delaySearch = setTimeout(() => {
			if (searchQuery.trim()) {
				fetchUsers(searchQuery);
			}
		}, 300);

		return () => clearTimeout(delaySearch);
	}, [searchQuery, fetchUsers]);

	const closeSearch = useCallback(() => {
		setIsSearchOpen(false);
		setSearchQuery("");
		setUsers([]);
	}, [setIsSearchOpen]);

	const openConversation = useCallback(
		(receiverId: string) => {
			return asyncHandler(async () => {
				const { data } = await axios.get<GetConversationResponse>(`/conversations/${receiverId}`);
				joinConversation(data.conversation);
				closeSearch();
			})();
		},
		[joinConversation, closeSearch],
	);

	return (
		<>
			<div className={`${styles["search"]} ${styles[isSearchOpen ? "open" : ""]}`}>
				<form>
					<label htmlFor="search">Find or start a conversation</label>
					<div className={styles["input_container"]}>
						<input
							autoComplete="off"
							autoFocus
							id="search"
							onChange={(event) => setSearchQuery(event.target.value)}
							placeholder="username"
							ref={searchRef}
							type="text"
							value={searchQuery}
						/>
					</div>
				</form>

				{loading && <div className={styles["loading"]}>Searching...</div>}

				{!loading && users.length > 0 ? (
					<div className={styles["users"]}>
						{users.map((user) => (
							<div
								className={styles["user"]}
								key={user._id}
								onClick={() => openConversation(user._id)}
							>
								<span>{truncateString(user.username, 20)}</span>
							</div>
						))}
					</div>
				) : null}

				<button onClick={closeSearch} type="button">
					Close
				</button>
			</div>

			<div
				className={`${styles["overlay"]} ${styles[isSearchOpen ? "open" : ""]}`}
				onClick={closeSearch}
			/>
		</>
	);
};

export default Search;
