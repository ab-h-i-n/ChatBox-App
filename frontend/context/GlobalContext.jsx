import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [user, setUser] = useState();
  const [socket, setSocket] = useState();
  const [chat , setChat] = useState();

  useEffect(() => {
    // if (user) {
    //   const skt = io(process.env.EXPO_PUBLIC_API_URL);
    //   setSocket(skt);

    //   skt.on("connect", () => {
    //     console.log(`User Connected ${skt.id}`);
    //   });
    // }
  }, [user]);

  return (
    <GlobalContext.Provider value={{ user, socket, setUser , chat ,setChat }}>
      {children}
    </GlobalContext.Provider>
  );
}
