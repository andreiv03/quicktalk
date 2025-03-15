"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AuthContext } from "@/contexts/auth-context";
import { useContextHook } from "@/hooks/use-context-hook";

export function RedirectHandler({ children }: { children: React.ReactNode }) {
	const { state } = useContextHook(AuthContext);

	const router = useRouter();
	const pathname = usePathname();

	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	useEffect(() => {
		if (state.accessToken) {
			if (pathname === "/login" || pathname === "/register") {
				router.replace("/");
			}
		} else {
			if (pathname !== "/login" && pathname !== "/register") {
				router.replace("/login");
			}
		}

		setIsCheckingAuth(false);
	}, [state.accessToken, pathname, router]);

	if (isCheckingAuth) {
		return null;
	}

	return <>{children}</>;
}
