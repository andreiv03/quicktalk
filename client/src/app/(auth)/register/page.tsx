"use client";

import Link from "next/link";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill, RiInformation2Fill } from "react-icons/ri";

import { AuthContext } from "@/contexts/auth-context";
import { useContextHook } from "@/hooks/use-context-hook";
import { asyncHandler } from "@/utils/async-handler";
import {
	calculatePasswordStrength,
	getClientInfo,
	validateEmail,
	validateUsername,
} from "@/utils/helpers";

import styles from "@/styles/pages/auth.module.scss";

export default function Register() {
	const { register } = useContextHook(AuthContext);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isUsernameValid, setIsUsernameValid] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const validateForm = () => {
		return (
			!!username &&
			isUsernameValid &&
			!!email &&
			!!password &&
			isEmailValid &&
			passwordStrength !== "weak"
		);
	};

	const submitForm = asyncHandler(async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isLoading || !validateForm()) {
			return;
		}

		setIsLoading(true);

		const { userAgent, ip } = await getClientInfo();
		const formData = {
			username: username.toLowerCase(),
			email,
			password,
			userAgent,
			ip,
		};

		const success = await register(formData);
		if (!success) {
			setPassword("");
			setPasswordStrength("");
			setIsPasswordVisible(false);
		}

		setIsLoading(false);
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
							disabled={isLoading}
							onChange={(event) => {
								const username = event.target.value;
								setUsername(username);
								setIsUsernameValid(validateUsername(username));
							}}
							placeholder=""
							type="text"
							value={username}
						/>

						<label htmlFor="username">
							Username
							{username && (
								<span className={styles[isUsernameValid ? "valid" : "invalid"]}>
									({isUsernameValid ? "valid" : "invalid"})
								</span>
							)}
							<span className={styles["tooltip"]}>
								<RiInformation2Fill />
								<span className={styles["tooltip-text"]}>
									<h5>Username requirements</h5>
									<h6>
										<span>Minimum length:</span>At least 3 characters required.
									</h6>
									<h6>
										<span>Allowed characters:</span>Letters (A-Z, a-z), numbers (0-9), and
										underscores (_) only.
									</h6>
									<h6>
										<span>Not allowed:</span>Usernames cannot consist only of underscores or contain
										consecutive underscores.
									</h6>
									<h6>
										<span>No special characters:</span>Spaces, symbols and special characters are
										not permitted.
									</h6>
								</span>
							</span>
						</label>
					</div>

					<div className={styles["field"]}>
						<input
							autoComplete="email"
							id="email"
							disabled={isLoading}
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
							Email
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
							disabled={isLoading}
							onChange={(event) => {
								const password = event.target.value;
								setPassword(password);
								setPasswordStrength(calculatePasswordStrength(password));
							}}
							placeholder=""
							type={isPasswordVisible ? "text" : "password"}
							value={password}
						/>

						<div
							className={styles["show"]}
							onClick={() => setIsPasswordVisible(!isPasswordVisible)}
						>
							{isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
						</div>

						<label htmlFor="password">
							Password
							{password && (
								<span className={styles[passwordStrength.replace("very ", "")]}>
									({passwordStrength})
								</span>
							)}
							<span className={styles["tooltip"]}>
								<RiInformation2Fill />
								<span className={styles["tooltip-text"]}>
									<h5>Password strength levels</h5>
									<h6>
										<span className={styles["weak"]}>Weak:</span>Easily guessable, consider
										improving.
									</h6>
									<h6>
										<span className={styles["medium"]}>Medium:</span>Acceptable, but could be
										stronger.
									</h6>
									<h6>
										<span className={styles["strong"]}>Strong:</span>Secure, meets recommended
										standards.
									</h6>
									<h6>
										<span className={styles["strong"]}>Very strong:</span>Excellent security,
										difficult to crack.
									</h6>
								</span>
							</span>
						</label>
					</div>

					<button disabled={isLoading || !validateForm()} type="submit">
						{isLoading ? <span className={styles["loader"]} /> : "Sign up"}
					</button>
				</form>

				<h3>
					Already have an account? <Link href={"/login"}>Sign in</Link>
				</h3>

				<h4>
					By creating an account, you agree to the{" "}
					<Link href="/terms-and-conditions">Terms and Conditions</Link> and the{" "}
					<Link href="/privacy-policy">Privacy Policy</Link>
				</h4>
			</div>
		</div>
	);
}
