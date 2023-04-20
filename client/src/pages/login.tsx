import { startTransition, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { useAuthContext } from "contexts/auth.context";

import styles from "styles/pages/auth.module.scss";

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const authContext = useAuthContext();

  const isFormDisabled = () => {
    if (!password) return true;
    if (!username) return true;
    return false;
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = {
        password,
        username
      };

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
          <h1>Welcome back!</h1>
          <p>Enter your email address and password in order to access your account.</p>

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
                autoComplete="current-password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder=" "
                type={isPasswordVisible ? "text" : "password"}
                value={password}
              />
              <label htmlFor="password">Password</label>

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
              Sign in
            </button>
          </form>

          <h3>
            Do you need an account?{" "}
            <span onClick={() => startTransition(() => authContext.setType("REGISTER"))}>
              Sign up
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
