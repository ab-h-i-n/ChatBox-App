import { socket } from "@/utils/Socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";

export type GlobalContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  chat: any;
  setChat: React.Dispatch<React.SetStateAction<any>>;
  roomUsers: Record<string, any>;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  isLoggedIn: boolean;
  handleLogOut: () => Promise<void>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const getAuthStatus = async () => {
  try {
    const token = await AsyncStorage.getItem("user");
    console.log("isLogged in : " + (token !== null));
    return token !== null;
  } catch (error) {
    console.error("Error retrieving auth status", error);
    return false;
  }
};

export function GlobalContextProvider({ children } : { children : any }) {
  const [user, setUser] = useState("");
  const [chat, setChat] = useState(null);
  const [roomUsers, setRoomUsers] = useState({});
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const IsUserLoggedIn = async () => {
      const isLogged = await getAuthStatus();
      setLoggedIn(isLogged);
    };
    IsUserLoggedIn();
  }, [user]);

  useEffect(() => {
    if (user) {

      socket.on("connect", () => {
        console.log(`User Connected ${socket.id}`);
      });

      socket.on("users_response", (data) => setRoomUsers(data));

      socket.on("receive-message", (data) => {
        setMessages((prev: any[]) => [...prev, data]);
      });

      // Clean up socket connection on unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("messages");
    setUser("");
    setMessages([]);
    setRoomUsers({});
    setChat(null);
    socket?.disconnect();
    router.push("/");
    console.log("logoout");
  };

  useEffect(() => {
    const saveMessages = async () => {
      await AsyncStorage.setItem("messages", JSON.stringify(messages));
    };
    if (messages.length > 0) {
      saveMessages();
    }
  }, [messages]);

  useEffect(() => {
    const getSavedMessages = async () => {
      const msgs = await AsyncStorage.getItem("messages");
      if (msgs) {
        setMessages(JSON.parse(msgs));
      }
    };

    getSavedMessages();
  }, []);

  useEffect(() => {
    const getSavedUser = async () => {
      const usr = await AsyncStorage.getItem("user");
      if (usr) {
        setUser(usr);
      }
    };

    getSavedUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        chat,
        setChat,
        roomUsers,
        messages,
        setMessages,
        isLoggedIn,
        handleLogOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
