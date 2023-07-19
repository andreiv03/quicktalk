import axios from "utils/axios";

export interface AuthData {
	email?: string;
	password: string;
	username: string;
}

class AuthService {
	login(authData: AuthData) {
		return axios.post<{ accessToken: string }>("/auth/login", authData);
	}

	logout() {
		return axios.get<null>("/auth/logout");
	}

	refreshToken() {
		return axios.get<{ accessToken: string }>("/auth/refresh-token");
	}

	register(authData: AuthData) {
		return axios.post<{ accessToken: string }>("/auth/register", authData);
	}
}

export const authService = new AuthService();
