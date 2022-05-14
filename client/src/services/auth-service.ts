import axios from "./axios";
import type { LoginFormDataInterface, RegisterFormDataInterface } from "../interfaces/auth-interfaces";

class AuthService {
  register(formData: RegisterFormDataInterface) {
    return axios.post<{ accessToken: string }>("/auth/register", formData);
  }

  login(formData: LoginFormDataInterface) {
    return axios.post<{ accessToken: string }>("/auth/login", formData);
  }

  logout() {
    return axios.get<null>("/auth/logout");
  }

  refreshToken() {
    return axios.get<{ accessToken: string }>("/auth/refresh-token");
  }
};

const authService = new AuthService();
export default authService;