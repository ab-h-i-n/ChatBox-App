
import { createContext } from "react";
import { SocketContextProvider } from "./SocketContext";
import { AuthContextProvider } from "./AuthContext";
import { ChatContextProvider } from "./ChatContext";

export const GlobalContext = createContext({});

export function GlobalContextProvider({ children }: { children: any }) {
  return (
    <GlobalContext.Provider
      value={{}}
    >
      <ChatContextProvider>
        <SocketContextProvider>
          <AuthContextProvider>

            {children}

          </AuthContextProvider>
        </SocketContextProvider>
      </ChatContextProvider>
    </GlobalContext.Provider>
  );
}
