"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import axios from "@/config/axios";
import type { LoginFormData, RegisterFormData } from "@/types/auth";
import type { GetUserResponse, User } from "@/types/user";
import { asyncHandler } from "@/utils/async-handler";

interface AuthContext {
	user: User | null;
	login: (formData: LoginFormData) => Promise<void>;
	register: (formData: RegisterFormData) => Promise<void>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	const logout = useCallback(() => {
		return asyncHandler(async () => {
			await axios.post("/api/auth/logout");
			setUser(null);
			router.replace("/login");
		})();
	}, [router]);

	const fetchUser = useCallback(async () => {
		try {
			await asyncHandler(async () => {
				const { data } = await axios.get<GetUserResponse>("/users/user");
				setUser(data.user);
			}, true)();
		} catch {
			await logout();
		}
	}, [logout]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	const login = useCallback(
		(formData: LoginFormData) => {
			return asyncHandler(async () => {
				await axios.post("/api/auth/login", formData);
				await fetchUser();
				router.replace("/");
			})();
		},
		[fetchUser, router],
	);

	const register = useCallback(
		(formData: RegisterFormData) => {
			return asyncHandler(async () => {
				await axios.post("/api/auth/register", formData);
				await fetchUser();
				router.replace("/");
			})();
		},
		[fetchUser, router],
	);

	const refreshToken = useCallback(async () => {
		try {
			await asyncHandler(async () => {
				await axios.get("/api/auth/refresh-token");
			}, true)();
		} catch {
			await logout();
		}
	}, [logout]);

	useEffect(() => {
		refreshToken();
	}, [refreshToken]);

	useEffect(() => {
		const interval = setInterval(refreshToken, 10 * 60 * 1000); // 10 minutes
		return () => {
			clearInterval(interval);
		};
	}, [refreshToken]);

	const contextValue = useMemo(
		() => ({ user, login, register, logout }),
		[user, login, register, logout],
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
