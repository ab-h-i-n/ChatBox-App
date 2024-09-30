
import { createContext } from "react";
import { SocketContextProvider } from "./SocketContext";
import { AuthContextProvider } from "./AuthContext";

export const GlobalContext = createContext({});


export function GlobalContextProvider({ children }: { children: any }) {
  return (
    <GlobalContext.Provider
      value={{}}
    >
      <SocketContextProvider>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </SocketContextProvider>
    </GlobalContext.Provider>
  );
}
