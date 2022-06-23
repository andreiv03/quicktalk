import { createContext, useState, useEffect } from "react";
import type { UserInterface } from "../interfaces/users-interfaces";

interface ProviderStateInterface {
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  user: [UserInterface, React.Dispatch<React.SetStateAction<UserInterface>>];
};

export const userInitialState: UserInterface = {
  _id: "",
  email: "",
  username: ""
};

export const UsersContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const UsersProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserInterface>(userInitialState);

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) return;

    const getAccesToken = async () => {
      try {
        const { default: authService } = await import("../services/auth-service");
        const { data } = await authService.refreshToken();
        setToken(data.accessToken);
        setTimeout(() => getAccesToken, 1000 * 60 * 10); // 10 minutes
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    getAccesToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const getUser = async () => {
      try {
        const { default: usersService } = await import("../services/users-service");
        const { data } = await usersService.getCurrentUser(token);
        setUser(data);
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    getUser();
  }, [token]);

  const state: ProviderStateInterface = {
    token: [token, setToken],
    user: [user, setUser]
  };

  return (
    <UsersContext.Provider value={state}>
      {children}
    </UsersContext.Provider>
  );
}