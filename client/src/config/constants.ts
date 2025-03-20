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
	Accept: "application/json",
	"Content-Type": "application/json",
} as const;

export const COOKIE_OPTIONS = (maxAge: number) =>
	({
		httpOnly: true,
		maxAge,
		path: "/",
		sameSite: "strict",
		secure: process.env.NODE_ENV !== "development",
	} as const);
