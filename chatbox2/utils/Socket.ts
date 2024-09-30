import { io } from "socket.io-client";

export const socket = io("https://chatbox-app-0nx2.onrender.com", {
  transports: ["websocket"],
});
