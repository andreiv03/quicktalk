export interface LoginFormData {
	password: string;
	username: string;
}

export interface RegisterFormData extends LoginFormData {
	email: string;
}

export interface AuthResponse {
	accessToken: string;
	message: string;
}
