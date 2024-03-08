import { lazy, useState } from "react";

import { useConversationContext } from "contexts/conversation.context";

import styles from "styles/pages/app.module.scss";

const Chat = lazy(() => import("components/chat"));
const Menu = lazy(() => import("components/menu"));
const Search = lazy(() => import("components/search"));
const Sidebar = lazy(() => import("components/sidebar"));

const App: React.FC = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const conversationContext = useConversationContext();

	return (
		<div className={styles["page"]}>
			<div className={styles["container"]}>
				<Sidebar setIsSearchOpen={setIsSearchOpen} />

				<Search
					isSearchOpen={isSearchOpen}
					setIsSearchOpen={setIsSearchOpen}
				/>

				{conversationContext.conversation._id ? (
					<>
						<Chat setIsMenuOpen={setIsMenuOpen} />
						<Menu
							isMenuOpen={isMenuOpen}
							setIsMenuOpen={setIsMenuOpen}
						/>
					</>
				) : (
					<div className={styles["idle"]}>
						<img
							alt="logo greyed out"
							src="/logo-greyed.svg"
						/>
						<h3>No active conversation</h3>
						<p>Connect with friends and the world around you. It's quick and easy!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
