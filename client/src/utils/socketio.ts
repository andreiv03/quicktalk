import { io } from "socket.io-client";
import { constants } from "utils/constants";

const SERVER_URL =
	process.env["NODE_ENV"] === "production" ? constants.PRODUCTION_URL : constants.DEVELOPMENT_URL;

export const socket = io(SERVER_URL);
