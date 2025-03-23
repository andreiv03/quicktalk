import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { AuthProvider } from "@/contexts/auth-context";
import { ConversationsProvider } from "@/contexts/conversations-context";
import { MessagesProvider } from "@/contexts/message-context";

import { ServerHealthCheck } from "@/components/server-health-check";
import "@/styles/globals.scss";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "QuickTalk",
	description: "Connect with friends and the world around you. It's quick and easy!",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<ServerHealthCheck>
					<AuthProvider>
						<ConversationsProvider>
							<MessagesProvider>{children}</MessagesProvider>
						</ConversationsProvider>
					</AuthProvider>
				</ServerHealthCheck>
			</body>
		</html>
	);
}
