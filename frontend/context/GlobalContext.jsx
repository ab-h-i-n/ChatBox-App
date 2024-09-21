import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [user, setUser] = useState();
  const [socket, setSocket] = useState();
  const [chat , setChat] = useState();
  const [roomUsers, setRoomUsers] = useState();

  useEffect(() => {
    if (user) {
      const skt = io(process.env.EXPO_PUBLIC_API_URL);
      setSocket(skt);

      skt.on("connect", () => {
        console.log(`User Connected ${skt.id}`);
      });

      skt.on("users_response", (data) => setRoomUsers(data));
    }
  }, [user]);

  useEffect(()=>{
    console.log(roomUsers);
    
  },[roomUsers])

  return (
    <GlobalContext.Provider value={{ user, socket, setUser , chat ,setChat }}>
      {children}
    </GlobalContext.Provider>
  );
}
