import { useCallback, useEffect, useRef, useState } from "react";

import axios from "@/config/axios";
import { ConversationsContext } from "@/contexts/conversations-context";
import { useContextHook } from "@/hooks/use-context-hook";
import type { GetConversationResponse } from "@/types/conversation";
import type { GetUsersResponse, User } from "@/types/user";
import { asyncHandler } from "@/utils/async-handler";
import { truncateString } from "@/utils/helpers";

import styles from "@/styles/components/search.module.scss";

interface Props {
	isSearchOpen: boolean;
	setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<Props> = ({ isSearchOpen, setIsSearchOpen }) => {
	const { joinConversation } = useContextHook(ConversationsContext);

	const searchRef = useRef<HTMLInputElement>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchUsers = useCallback(async (searchQuery: string) => {
		try {
			await asyncHandler(async () => {
				if (searchQuery) {
					setIsLoading(true);
					const { data } = await axios.get<GetUsersResponse>(`/users/search/${searchQuery}`);
					setUsers(data.users);
				}
			}, true)();
		} catch {
			setUsers([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		const delaySearch = setTimeout(() => {
			if (searchQuery.trim()) {
				fetchUsers(searchQuery.trim());
			} else {
				setUsers([]);
			}
		}, 300);

		return () => {
			clearTimeout(delaySearch);
		};
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
			<div className={`${styles["search"]} ${isSearchOpen ? styles["open"] : ""}`}>
				<form
					onKeyDown={(event) => {
						if (event.key === "Enter" && users.length > 0 && users[0]) {
							openConversation(users[0]._id);
						}
					}}
					onSubmit={(event) => event.preventDefault()}
				>
					<label htmlFor="search">Find or start a conversation</label>
					<div className={styles["field"]}>
						<input
							autoComplete="off"
							id="search"
							onChange={(event) => setSearchQuery(event.target.value)}
							placeholder="username"
							ref={searchRef}
							type="text"
							value={searchQuery}
						/>

						{searchQuery && isLoading && <div className={styles["loader"]} />}
					</div>
				</form>

				{!isLoading && users.length > 0 ? (
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
				className={`${styles["overlay"]} ${isSearchOpen ? styles["open"] : ""}`}
				onClick={closeSearch}
			/>
		</>
	);
};

export default Search;
