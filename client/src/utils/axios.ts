import axios from "axios";

import { config } from "utils/config";

export default axios.create({
	baseURL: `${config.SERVER_URL}/api`,
	headers: {
		"Content-Type": "application/json"
	},
	withCredentials: true
});
