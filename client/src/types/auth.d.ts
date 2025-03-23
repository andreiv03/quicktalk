export interface LoginFormData {
	ip: string;
	password: string;
	username: string;
	userAgent: string;
}

export interface RegisterFormData extends LoginFormData {
	email: string;
}

export interface AuthResponse {
	accessToken: string;
	message: string;
	refreshToken: string;
	sessionId: string;
}
