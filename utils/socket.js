import { io } from "socket.io-client";
import { host } from "./http";

let socket = null;

export const connect = () => {
  socket = io(host);
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    connect();
  }
  return socket;
};

export const disconnectSocket = () => {
  socket.disconnect();
  socket = null;
};
