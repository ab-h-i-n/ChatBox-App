import { API_URL } from "@/env";
import { io } from "socket.io-client";

export const socket = io(API_URL, {
  transports: ["websocket"],
});
