import axios from "axios";

import { AXIOS_HEADERS, ENV } from "@/config/constants";
import type { AuthResponse } from "@/types/auth";

const axiosInstance = axios.create({
	headers: AXIOS_HEADERS,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		if (!config.url) {
			return config;
		}

		if (!config.url.startsWith("/api")) {
			config.baseURL = `${ENV.SERVER_URL}/api`;
		}

		if (
			config.url === "/health" ||
			config.url.startsWith("/api/auth") ||
			config.url.startsWith("/auth")
		) {
			return config;
		}

		const { data } = await axios.post<AuthResponse>("/api/auth/refresh-token");
		if (!data.accessToken) {
			return Promise.reject(new axios.Cancel("Failed to refresh token"));
		}

		config.headers.Authorization = `Bearer ${data.accessToken}`;
		return config;
	},
	(error) => Promise.reject(error),
);

export default axiosInstance;
