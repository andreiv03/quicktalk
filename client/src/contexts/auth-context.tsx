"use client";

import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";

import axios from "@/config/axios";
import type { AuthResponse, LoginFormData, RegisterFormData } from "@/types/auth";
import type { GetUserResponse, User } from "@/types/user";
import { asyncHandler } from "@/utils/async-handler";

interface AuthState {
	accessToken: string;
	user: User | null;
}

type AuthAction =
	| { type: "SET_ACCESS_TOKEN"; payload: string }
	| { type: "SET_USER"; payload: User }
	| { type: "LOGOUT" };

interface AuthContext {
	state: AuthState;
	login: (formData: LoginFormData) => Promise<void>;
	register: (formData: RegisterFormData) => Promise<void>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext | null>(null);

const reducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case "SET_ACCESS_TOKEN":
			return { ...state, accessToken: action.payload };

		case "SET_USER":
			return { ...state, user: action.payload };

		case "LOGOUT":
			return { ...state, accessToken: "", user: null };

		default:
			return state;
	}
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, { accessToken: "", user: null });

	const login = useCallback((authData: LoginFormData) => {
		return asyncHandler(async () => {
			const { data } = await axios.post<AuthResponse>("/auth/login", authData);
			dispatch({ type: "SET_ACCESS_TOKEN", payload: data.accessToken });
		})();
	}, []);

	const register = useCallback((authData: RegisterFormData) => {
		return asyncHandler(async () => {
			const { data } = await axios.post<AuthResponse>("/auth/register", authData);
			dispatch({ type: "SET_ACCESS_TOKEN", payload: data.accessToken });
		})();
	}, []);

	const logout = useCallback(() => {
		return asyncHandler(async () => {
			await axios.post("/auth/logout");
			dispatch({ type: "LOGOUT" });
		})();
	}, []);

	const fetchUser = useCallback(async () => {
		try {
			await asyncHandler(async () => {
				if (state.accessToken) {
					const { data } = await axios.get<GetUserResponse>("/users/user", {
						headers: { Authorization: `Bearer ${state.accessToken}` },
					});
					dispatch({ type: "SET_USER", payload: data.user });
				}
			}, true)();
		} catch {
			await logout();
		}
	}, [state.accessToken, logout]);

	useEffect(() => {
		if (state.accessToken) {
			fetchUser();
		}
	}, [state.accessToken, fetchUser]);

	const refreshToken = useCallback(async () => {
		try {
			await asyncHandler(async () => {
				const { data } = await axios.get<AuthResponse>("/auth/refresh-token");
				dispatch({ type: "SET_ACCESS_TOKEN", payload: data.accessToken });
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
		return () => clearInterval(interval);
	}, [refreshToken]);

	const contextValue = useMemo(
		() => ({ state, login, register, logout }),
		[state, login, register, logout],
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
