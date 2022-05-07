import { useContext, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { UsersContext } from "../contexts/users-context";
import handlers from "../utils/handlers";
import type { LoginFormDataInterface as FormData } from "../interfaces/auth-interfaces";

import styles from "../styles/pages/auth.module.scss";

interface PropsInterface {
  setAuth: React.Dispatch<React.SetStateAction<string>>;
};

const formDataInitialState: FormData = {
  email: "",
  password: ""
};

const Login: React.FC<PropsInterface> = ({ setAuth }) => {
  const { token: [, setToken] } = useContext(UsersContext);
  
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isFormDisabled = () => {
    if (!formData.email || !formData.password) return true;
    return false;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const { default: authService } = await import("../services/auth-service");
      const { data } = await authService.login(formData);
      setToken(data.accessToken);
      localStorage.setItem("authenticated", "true");
    } catch (error: any) {
      return alert(error);
    }
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>Welcome back!</h1>
          <p>Enter your email address and password in order to access your account.</p>
        
          <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
            <div className={styles.field}>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder=" "
                value={formData.email}
                onChange={event => handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className={styles.field}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder=" "
                value={formData.password}
                onChange={event => handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
              />
              <label htmlFor="password">Password</label>

              <div className={styles.show_button} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
              </div>
            </div>

            <button type="submit" disabled={isFormDisabled()}>Sign in</button>
          </form>

          <h3>Do you need an account? <span onClick={() => setAuth("register")}>Sign up</span></h3>
        </div>
      </div>
    </div>
  );
}

export default Login;