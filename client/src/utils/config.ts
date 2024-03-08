const enum Environment {
	Development = "development",
	Production = "production"
}

const loadConfig = () => {
	const NODE_ENV = process.env["NODE_ENV"] as Environment;

	const config = {
		SERVER_URL:
			NODE_ENV === Environment.Production
				? "https://quicktalk-server.onrender.com"
				: "http://localhost:5000"
	};

	Object.entries(config).forEach(([key, value]) => {
		if (value === undefined || value === null || value === "")
			throw new Error(`Environment variable ${key} not found`);
	});

	return config;
};

export const config = loadConfig();
