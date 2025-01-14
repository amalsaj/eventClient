import { io } from "socket.io-client";

const socket = io("https://eventserver-sfrb.onrender.com");

export default socket;
