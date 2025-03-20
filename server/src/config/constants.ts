import dotenvFlow from "dotenv-flow";
import type { HelmetOptions } from "helmet";

dotenvFlow.config();

const DEFAULTS = {
	NODE_ENV: "development",
	DEV_CLIENT_URL: "http://localhost:3000",
	PROD_CLIENT_URL: "https://quicktalk-client.vercel.app",
	PORT: "5000",
};

export const ENV = {
	NODE_ENV: process.env["NODE_ENV"] || DEFAULTS.NODE_ENV,
	CLIENT_URL:
		process.env["NODE_ENV"] === "production" ? DEFAULTS.PROD_CLIENT_URL : DEFAULTS.DEV_CLIENT_URL,
	JWT_SECRET: process.env["JWT_SECRET"] as string,
	MONGODB_URI: process.env["MONGODB_URI"] as string,
	PORT: process.env["PORT"] || DEFAULTS.PORT,
} as const;

Object.entries(ENV).forEach(([key, value]) => {
	if (!key || !value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
});

export const CORS_OPTIONS = {
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
	origin: ENV.CLIENT_URL,
};

export const HELMET_OPTIONS: HelmetOptions = {
	contentSecurityPolicy: {
		directives: {
			connectSrc: ["'self'", "wss://quicktalk-client.vercel.app"],
			defaultSrc: ["'self'"],
			frameAncestors: ["'none'"],
			imgSrc: ["'self'", "data:"],
			scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
		},
	},
	dnsPrefetchControl: { allow: false },
	frameguard: { action: "deny" },
	hidePoweredBy: true,
	hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
	ieNoOpen: true,
	noSniff: true,
	permittedCrossDomainPolicies: { permittedPolicies: "none" },
	referrerPolicy: { policy: "no-referrer" },
	xssFilter: true,
} as const;

export const COOKIE_OPTIONS = {
	httpOnly: true,
	maxAge: 7 * 24 * 60 * 60, // 7 days
	path: "/",
	sameSite: "strict",
	secure: process.env["NODE_ENV"] !== "development",
} as const;
