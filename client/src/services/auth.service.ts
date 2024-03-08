import axios from "utils/axios";

export interface AuthData {
	email?: string;
	password: string;
	username: string;
}

interface AuthResponse {
	accessToken: string;
}

class AuthService {
	login(authData: AuthData) {
		return axios.post<AuthResponse>("/auth/login", authData);
	}

	logout() {
		return axios.get<null>("/auth/logout");
	}

	refreshToken() {
		return axios.get<AuthResponse>("/auth/refresh-token");
	}

	register(authData: AuthData) {
		return axios.post<AuthResponse>("/auth/register", authData);
	}
}

export const authService = new AuthService();
