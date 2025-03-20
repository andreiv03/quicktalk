"use client";

import Link from "next/link";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { AuthContext } from "@/contexts/auth-context";
import { useContextHook } from "@/hooks/use-context-hook";
import { asyncHandler } from "@/utils/async-handler";
import { calculatePasswordStrength, validateEmail } from "@/utils/helpers";

import styles from "@/styles/pages/auth.module.scss";

export default function Register() {
	const { register } = useContextHook(AuthContext);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState("");

	const validateForm = () => {
		return !!username && !!email && !!password && isEmailValid && passwordStrength !== "weak";
	};

	const submitForm = asyncHandler(async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		const formData = {
			username: username.toLowerCase(),
			email,
			password,
		};

		setUsername("");
		setEmail("");
		setPassword("");

		setIsEmailValid(false);
		setPasswordStrength("");
		setIsPasswordVisible(false);

		await register(formData);
	});

	return (
		<div className={styles["page"]}>
			<div className={styles["content"]}>
				<h1>Create an account</h1>
				<p>Connect with friends and the world around you. It&apos;s quick and easy!</p>

				<form noValidate onSubmit={submitForm}>
					<div className={styles["field"]}>
						<input
							autoComplete="username"
							autoFocus
							id="username"
							onChange={(event) => setUsername(event.target.value)}
							placeholder=""
							type="text"
							value={username}
						/>
						<label htmlFor="username">Username</label>
					</div>

					<div className={styles["field"]}>
						<input
							autoComplete="email"
							id="email"
							onChange={(event) => {
								const email = event.target.value;
								setEmail(email);
								setIsEmailValid(validateEmail(email));
							}}
							placeholder=""
							type="email"
							value={email}
						/>
						<label htmlFor="email">
							Email{" "}
							{email && (
								<span className={styles[isEmailValid ? "valid" : "invalid"]}>
									({isEmailValid ? "valid" : "invalid"})
								</span>
							)}
						</label>
					</div>

					<div className={styles["field"]}>
						<input
							autoComplete="current-password"
							id="password"
							onChange={(event) => {
								const password = event.target.value;
								setPassword(password);
								setPasswordStrength(calculatePasswordStrength(password));
							}}
							placeholder=""
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

					<button disabled={!validateForm()} type="submit">
						Sign up
					</button>
				</form>

				<h3>
					Already have an account? <Link href={"/login"}>Sign in</Link>
				</h3>

				<h4>
					By creating an account you agree to the{" "}
					<Link href="/terms-and-conditions">Terms and Conditions</Link> and{" "}
					<Link href="/privacy-policy">Privacy Policy</Link>
				</h4>
			</div>
		</div>
	);
}
