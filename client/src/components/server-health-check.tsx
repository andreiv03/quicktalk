"use client";

import { useEffect, useState } from "react";

import axios from "@/config/axios";

import Notification from "@/components/notification";
import styles from "@/styles/components/server-health-check.module.scss";

export function ServerHealthCheck({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);
	const [isServerDown, setIsServerDown] = useState(false);

	const checkHealth = async () => {
		try {
			const { status } = await axios.get("/health", { timeout: 2000 });
			setIsServerDown(status !== 200);
		} catch {
			setIsServerDown(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkHealth();
		const interval = setInterval(checkHealth, 5000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	if (isLoading) {
		return <div className={styles["loader"]}></div>;
	}

	if (isServerDown) {
		return (
			<Notification
				type="SERVER_DOWN"
				message="Unable to connect as the server is temporarily unavailable."
			/>
		);
	}

	return <>{children}</>;
}
