import { io } from "socket.io-client";

const socket = io("https://quicktalk-web-app.herokuapp.com/");

export default socket;