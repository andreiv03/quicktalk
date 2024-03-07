import dotenv from "dotenv";

dotenv.config();

const enum Environment {
	Development = "development",
	Production = "production"
}

const loadConfig = () => {
	const NODE_ENV = process.env["NODE_ENV"] as Environment;

	const config = {
		CLIENT_URL:
			NODE_ENV === Environment.Production
				? "https://quicktalk-client.vercel.app"
				: "http://localhost:3000",
		JWT_SECRET: process.env["JWT_SECRET"] as string,
		MONGODB_URI: process.env["MONGODB_URI"] as string,
		PORT: NODE_ENV === Environment.Production ? (process.env["PORT"] as string) : "5000"
	};

	Object.entries(config).forEach(([key, value]) => {
		if (value === undefined || value === null || value === "")
			throw new Error(`Environment variable ${key} not found`);
	});

	return config;
};

export const config = loadConfig();
