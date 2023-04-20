import { useEffect, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { useAuthContext } from "contexts/auth.context";
import { getPasswordStrength, validateEmail } from "utils/helpers";

import styles from "styles/pages/auth.module.scss";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const authContext = useAuthContext();

  useEffect(() => {
    if (!email) return;
    setIsEmailValid(validateEmail(email));
  }, [email]);

  useEffect(() => {
    if (!password) return;
    setPasswordStrength(getPasswordStrength(password));
  }, [password]);

  const isFormDisabled = () => {
    if (!email) return true;
    if (!password) return true;
    if (!username) return true;
    if (!isEmailValid) return true;
    return false;
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = {
        email,
        password,
        username
      };

      setEmail("");
      setPassword("");
      setUsername("");

      authContext.authenticate(formData);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={styles["page"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["content"]}>
          <h1>Create an account</h1>
          <p>Connect with friends and the world around you. It's quick and easy!</p>

          <form
            noValidate
            onSubmit={submitForm}
          >
            <div className={styles["field"]}>
              <input
                autoComplete="username"
                autoFocus
                id="username"
                onChange={(event) => setUsername(event.target.value.toLowerCase())}
                placeholder=" "
                type="text"
                value={username}
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className={styles["field"]}>
              <input
                autoComplete="email"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder=" "
                type="email"
                value={email}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className={styles["field"]}>
              <input
                autoComplete="current-password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder=" "
                type={isPasswordVisible ? "text" : "password"}
                value={password}
              />

              <label htmlFor="password">
                Password{" "}
                {password && (
                  <span className={styles[passwordStrength.replace("very ", "")]}>
                    ({passwordStrength})
                  </span>
                )}
              </label>

              <div
                className={styles["show"]}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
              </div>
            </div>

            <button
              disabled={isFormDisabled()}
              type="submit"
            >
              Sign up
            </button>
          </form>

          <h3>
            Already have an account?{" "}
            <span onClick={() => authContext.setType("LOGIN")}>Sign in</span>
          </h3>
          <h4>
            By creating an account you agree to the <span>Terms and Conditions</span> and{" "}
            <span>Privacy Policy</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Register;
