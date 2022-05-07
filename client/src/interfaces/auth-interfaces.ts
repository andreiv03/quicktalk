export interface AuthResponseInterface {
  accessToken: string;
};

export interface LoginFormDataInterface {
  email: string;
  password: string;
};

export interface RegisterFormDataInterface extends LoginFormDataInterface {
  username: string;
};