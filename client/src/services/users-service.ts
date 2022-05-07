import axios from "./axios";
import type { UserInterface } from "../interfaces/users-interfaces";

class UsersService {
  getCurrentUser(token: string) {
    return axios.get<UserInterface>("/users/current", {
      headers: { authorization: token }
    });
  }
  
  getAllUsers(token: string) {
    return axios.get<UserInterface[]>("/users/all", {
      headers: { authorization: token }
    });
  }
};

const usersService = new UsersService();
export default usersService;