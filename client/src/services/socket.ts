import { io } from "socket.io-client";

const socket = io(
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : process.env.SERVER_URL!
);
export default socket;
