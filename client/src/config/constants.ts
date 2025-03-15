const DEFAULTS = {
	NODE_ENV: "development",
	DEV_SERVER_URL: "http://localhost:5000",
	PROD_SERVER_URL: "https://quicktalk-server.onrender.com",
};

export const ENV = {
	NODE_ENV: process.env["NODE_ENV"] || DEFAULTS.NODE_ENV,
	SERVER_URL:
		process.env["NODE_ENV"] === "production" ? DEFAULTS.PROD_SERVER_URL : DEFAULTS.DEV_SERVER_URL,
} as const;

Object.entries(ENV).forEach(([key, value]) => {
	if (!key || !value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
});

export const AXIOS_HEADERS = {
	"Content-Type": "application/json",
} as const;
