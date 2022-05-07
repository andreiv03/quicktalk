import axios from "./axios";
import type { AuthResponseInterface, LoginFormDataInterface, RegisterFormDataInterface } from "../interfaces/auth-interfaces";

class AuthService {
  register(formData: RegisterFormDataInterface) {
    return axios.post<AuthResponseInterface>("/auth/register", formData);
  }

  login(formData: LoginFormDataInterface) {
    return axios.post<AuthResponseInterface>("/auth/login", formData);
  }

  logout() {
    return axios.get<null>("/auth/logout");
  }

  refreshToken() {
    return axios.get<AuthResponseInterface>("/auth/refresh-token");
  }
};

const authService = new AuthService();
export default authService;