export const constants = {
	DEVELOPMENT_URL: "http://localhost:3000",
	JWT_SECRET: process.env["JWT_SECRET"] as string,
	MONGODB_URI: process.env["MONGODB_URI"] as string,
	PRODUCTION_URL: "https://quicktalk-client.vercel.app"
};

Object.entries(constants).forEach(([key, value]) => {
	if (typeof value === "undefined") throw new Error(`${key} not found!`);
});
