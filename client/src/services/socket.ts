import { io } from "socket.io-client";

const socket = io(
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.REACT_APP_SERVER_URL!
);
export default socket;
