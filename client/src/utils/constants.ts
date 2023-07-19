export const constants = {
	DEVELOPMENT_URL: "http://localhost:5000",
	PRODUCTION_URL: ""
};

Object.entries(constants).forEach(([key, value]) => {
	if (typeof value === "undefined") throw new Error(`${key} not found!`);
});
