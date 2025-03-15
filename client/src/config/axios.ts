import axios from "axios";
import { AXIOS_HEADERS, ENV } from "@/config/constants";

export default axios.create({
	baseURL: `${ENV.SERVER_URL}/api`,
	headers: AXIOS_HEADERS,
	withCredentials: true,
});
