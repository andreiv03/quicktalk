import dotenvFlow from "dotenv-flow";
import type { HelmetOptions } from "helmet";

dotenvFlow.config();

const ENV_DEFAULTS = {
	DEV_CLIENT_URL: "http://localhost:3000",
	NODE_ENV: "development",
	PORT: "5000",
	PROD_CLIENT_URL: "https://quicktalk-client.vercel.app",
};

export const ENV = {
	CLIENT_URL:
		process.env["NODE_ENV"] === "production"
			? ENV_DEFAULTS.PROD_CLIENT_URL
			: ENV_DEFAULTS.DEV_CLIENT_URL,
	JWT_SECRET: process.env["JWT_SECRET"] as string,
	MONGODB_URI: process.env["MONGODB_URI"] as string,
	NODE_ENV: process.env["NODE_ENV"] || ENV_DEFAULTS.NODE_ENV,
	PORT: process.env["PORT"] || ENV_DEFAULTS.PORT,
	UPSTASH_REDIS_REST_TOKEN: process.env["UPSTASH_REDIS_REST_TOKEN"] as string,
	UPSTASH_REDIS_REST_URL: process.env["UPSTASH_REDIS_REST_URL"] as string,
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
