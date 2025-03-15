import { io, Socket } from "socket.io-client";
import { ENV } from "@/config/constants";

let socket: Socket | null = null;

export const getSocket = () => {
	if (!socket) {
		socket = io(ENV.SERVER_URL, {
			autoConnect: false,
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 1000,
			transports: ["websocket"],
		});

		socket.on("connect_error", (error) => console.error("Socket connection error:", error));
	}

	return socket;
};

export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
};
