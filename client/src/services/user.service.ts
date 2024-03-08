import axios from "utils/axios";

export interface User {
	_id: string;
	email: string;
	username: string;
}

class UserService {
	getUser(accessToken: string) {
		return axios.get<User>("/users/user", {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
	}

	getUsersByUsername(accessToken: string, username: string) {
		return axios.get<User[]>(`/users/username/${username}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
	}
}

export const userService = new UserService();
