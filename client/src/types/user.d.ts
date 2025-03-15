export interface User {
	_id: string;
	username: string;
	email: string;
}

export interface GetUserResponse {
	message: string;
	user: User;
}

export interface GetUsersResponse {
	message: string;
	users: User[];
}
