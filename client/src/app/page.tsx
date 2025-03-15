"use client";

import Image from "next/image";
import { useState } from "react";

import { ConversationsContext } from "@/contexts/conversations-context";
import { useContextHook } from "@/hooks/use-context-hook";

import Chat from "@/components/chat";
import Menu from "@/components/menu";
import Search from "@/components/search";
import Sidebar from "@/components/sidebar";
import styles from "@/styles/pages/app.module.scss";

export default function App() {
	const { state } = useContextHook(ConversationsContext);

	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className={styles["page"]}>
			<div className={styles["container"]}>
				<Sidebar setIsSearchOpen={setIsSearchOpen} />
				<Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

				{state.activeConversation ? (
					<>
						<Chat setIsMenuOpen={setIsMenuOpen} />
						<Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
					</>
				) : (
					<div className={styles["idle"]}>
						<Image alt="logo greyed" src="/logo-greyed.svg" priority height={100} width={150} />
						<h3>No active conversation</h3>
						<p>Connect with friends and the world around you. It&apos;s quick and easy!</p>
					</div>
				)}
			</div>
		</div>
	);
}
