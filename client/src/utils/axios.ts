import axios from "axios";
import { constants } from "utils/constants";

const SERVER_URL =
	process.env["NODE_ENV"] === "production" ? constants.PRODUCTION_URL : constants.DEVELOPMENT_URL;

export default axios.create({
	baseURL: `${SERVER_URL}/api`,
	headers: {
		"Content-Type": "application/json"
	},
	withCredentials: true
});
