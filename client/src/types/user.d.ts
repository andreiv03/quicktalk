export interface User {
	_id: string;
	email: string;
	username: string;
}

export interface GetUserResponse {
	message: string;
	user: User;
}

export interface GetUsersResponse {
	message: string;
	users: User[];
}
