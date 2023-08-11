export const constants = {
	DEVELOPMENT_URL: "http://localhost:5000/api",
	PRODUCTION_URL: "https://quicktalk-server.onrender.com/api"
};

Object.entries(constants).forEach(([key, value]) => {
	if (typeof value === "undefined") throw new Error(`${key} not found!`);
});
