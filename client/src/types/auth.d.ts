export interface LoginFormData {
	username: string;
	password: string;
}

export interface RegisterFormData extends LoginFormData {
	email: string;
}

export interface AuthResponse {
	accessToken: string;
	message: string;
}
