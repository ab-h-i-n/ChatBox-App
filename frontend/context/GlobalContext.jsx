import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState(null);
  const [roomUsers, setRoomUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        setLoggedIn(token !== null);
      } catch (error) {
        console.error("Error retrieving auth status", error);
        setLoggedIn(false);
      }
    };

    getAuthStatus();
  }, [user]);

  useEffect(() => {
    if (user) {
      const skt = io(process.env.EXPO_PUBLIC_API_URL);
      setSocket(skt);

      skt.on("connect", () => {
        console.log(`User Connected ${skt.id}`);
      });

      skt.on("users_response", (data) => setRoomUsers(data));

      skt.on("receive-message", (data) => {
        setMessages((prev) => [...prev, data]);
      });

      // Clean up socket connection on unmount
      return () => {
        skt.disconnect();
      };
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        socket,
        setUser,
        chat,
        setChat,
        roomUsers,
        messages,
        setMessages,
        isLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
