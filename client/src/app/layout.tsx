import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { AuthProvider } from "@/contexts/auth-context";
import { ConversationsProvider } from "@/contexts/conversations-context";
import { MessagesProvider } from "@/contexts/message-context";

import { RedirectHandler } from "@/app/redirect-handler";
import "@/styles/globals.scss";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "QuickTalk",
	description: "A real-time chat application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<AuthProvider>
					<RedirectHandler>
						<ConversationsProvider>
							<MessagesProvider>{children}</MessagesProvider>
						</ConversationsProvider>
					</RedirectHandler>
				</AuthProvider>
			</body>
		</html>
	);
}
