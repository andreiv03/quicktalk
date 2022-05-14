import { useContext, useState, useEffect } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { SystemContext } from "../contexts/system-context";
import { UsersContext } from "../contexts/users-context";
import handlers from "../utils/handlers";
import type { RegisterFormDataInterface as FormData } from "../interfaces/auth-interfaces";

import styles from "../styles/pages/auth.module.scss";

interface PropsInterface {
  setAuth: React.Dispatch<React.SetStateAction<string>>;
};

const formDataInitialState: FormData = {
  email: "",
  password: "",
  username: ""
};

const Register: React.FC<PropsInterface> = ({ setAuth }) => {
  const { createNewToast } = useContext(SystemContext);
  const { token: [, setToken] } = useContext(UsersContext);

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => {
    if (!formData.email) return;

    const checkEmailValidity = async () => {
      const { default: helpers } = await import("../utils/helpers");
      setIsEmailValid(helpers.checkEmailValidity(formData.email));
    }

    checkEmailValidity();
  }, [formData.email]);

  useEffect(() => {
    if (!formData.password) return;

    const checkPasswordStrength = async () => {
      const { default: helpers } = await import("../utils/helpers");
      setPasswordStrength(helpers.checkPasswordStrength(formData.password));
    }

    checkPasswordStrength();
  }, [formData.password]);

  const isFormDisabled = () => {
    if (!formData.email || !formData.password || !formData.username) return true;
    if (!isEmailValid) return true;
    return false;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { default: authService } = await import("../services/auth-service");
      const { data } = await authService.register(formData);
      setToken(data.accessToken);
      localStorage.setItem("authenticated", "true");
    } catch (error: any) {
      return createNewToast(error, "error");
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>Create an account</h1>
          <p>Connect with friends and the world around you. It's quick and easy!</p>
        
          <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
            <div className={styles.field}>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                placeholder=" "
                value={formData.username}
                onChange={event => handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
                autoFocus
              />
              <label htmlFor="username">Username</label>
            </div>

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
                autoComplete="new-password"
                placeholder=" "
                value={formData.password}
                onChange={event => handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
              />

              <label htmlFor="password">
                Password {formData.password && <span className={styles[passwordStrength.replace("very ", "")]}>({passwordStrength})</span>}
              </label>

              <div className={styles.show_button} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
              </div>
            </div>

            <button type="submit" disabled={isFormDisabled()}>Sign up</button>
          </form>

          <h3>Already have an account? <span onClick={() => setAuth("login")}>Sign in</span></h3>
          <h4>By creating an account you agree to the <span>Terms and Conditions</span> and <span>Privacy Policy</span></h4>
        </div>
      </div>
    </div>
  );
}

export default Register;