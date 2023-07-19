import { createContext, useContext, useEffect, useState } from "react";

import { authService, type AuthData } from "services/auth.service";
import { usersService, type User } from "services/users.service";

interface AuthContext {
	accessToken: string;
	setAccessToken: React.Dispatch<React.SetStateAction<string>>;
	callback: boolean;
	setCallback: React.Dispatch<React.SetStateAction<boolean>>;
	type: string;
	setType: React.Dispatch<React.SetStateAction<string>>;
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	authenticate: (authData: AuthData) => void;
	logout: () => void;
}

const userInitialState: User = {
	_id: "",
	email: "",
	username: ""
};

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const useAuthContext = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) throw new Error("Something went wrong with the React Context API!");
	return authContext;
};

export const AuthContextProvider: React.FC<{
	children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
	const [accessToken, setAccessToken] = useState("");
	const [callback, setCallback] = useState(false);
	const [type, setType] = useState("LOGIN");
	const [user, setUser] = useState(userInitialState);

	useEffect(() => {
		const authenticated = localStorage.getItem("authenticated");
		if (!authenticated) return;

		const getAccessToken = async () => {
			try {
				const { data } = await authService.refreshToken();
				setAccessToken(data.accessToken);
				setTimeout(() => getAccessToken, 1000 * 60 * 10); // 10 minutes
			} catch (error: any) {
				alert(error.response.data.message);
			}
		};

		getAccessToken();
	}, []);

	useEffect(() => {
		if (!accessToken) return;

		const getUser = async () => {
			try {
				const { data } = await usersService.getUser(accessToken);
				setUser(data);
			} catch (error: any) {
				alert(error.response.data.message);
			}
		};

		getUser();
	}, [accessToken, callback]);

	const authenticate = async (formData: AuthData) => {
		try {
			if (type === "LOGIN") {
				const { data } = await authService.login(formData);
				setAccessToken(data.accessToken);
			}

			if (type === "REGISTER") {
				const { data } = await authService.register(formData);
				setAccessToken(data.accessToken);
			}

			localStorage.setItem("authenticated", "true");
		} catch (error: any) {
			alert(error.response.data.message);
		}
	};

	const logout = async () => {
		try {
			await authService.logout();
			setAccessToken("");
			setUser(userInitialState);
			localStorage.removeItem("authenticated");
		} catch (error: any) {
			alert(error.response.data.message);
		}
	};

	const state: AuthContext = {
		accessToken,
		setAccessToken,
		callback,
		setCallback,
		type,
		setType,
		user,
		setUser,
		authenticate,
		logout
	};

	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
