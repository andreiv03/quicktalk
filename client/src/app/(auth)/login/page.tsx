"use client";

import Link from "next/link";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { AuthContext } from "@/contexts/auth-context";
import { useContextHook } from "@/hooks/use-context-hook";
import { asyncHandler } from "@/utils/async-handler";
import { getClientInfo } from "@/utils/helpers";

import styles from "@/styles/pages/auth.module.scss";

export default function Login() {
	const { login } = useContextHook(AuthContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const validateForm = () => {
		return !!username && !!password;
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
			password,
			userAgent,
			ip,
		};

		const success = await login(formData);
		if (!success) {
			setPassword("");
		}

		setIsLoading(false);
	});

	return (
		<div className={styles["page"]}>
			<div className={styles["content"]}>
				<h1>Welcome back!</h1>
				<p>Enter your email address and password in order to access your account.</p>

				<form noValidate onSubmit={submitForm}>
					<div className={styles["field"]}>
						<input
							autoComplete="username"
							autoFocus
							id="username"
							disabled={isLoading}
							onChange={(event) => setUsername(event.target.value)}
							placeholder=""
							type="text"
							value={username}
						/>
						<label htmlFor="username">Username</label>
					</div>

					<div className={styles["field"]}>
						<input
							autoComplete="current-password"
							id="password"
							disabled={isLoading}
							onChange={(event) => setPassword(event.target.value)}
							placeholder=""
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

					<button disabled={isLoading || !validateForm()} type="submit">
						{isLoading ? <span className={styles["loader"]} /> : "Sign in"}
					</button>
				</form>

				<h3>
					Do you need an account? <Link href="/register">Sign up</Link>
				</h3>
			</div>
		</div>
	);
}
