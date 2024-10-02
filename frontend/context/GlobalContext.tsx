
import { createContext } from "react";
import { SocketContextProvider } from "./SocketContext";
import { AuthContextProvider } from "./AuthContext";
import { ChatContextProvider } from "./ChatContext";
import { ModalContextProvider } from "./ModalContext";

export const GlobalContext = createContext({});

export function GlobalContextProvider({ children }: { children: any }) {
  return (
    <GlobalContext.Provider
      value={{}}
    >

      <SocketContextProvider>
        <AuthContextProvider>
          <ChatContextProvider>
            <ModalContextProvider>
              {children}
            </ModalContextProvider>
          </ChatContextProvider>
        </AuthContextProvider>
      </SocketContextProvider>
    </GlobalContext.Provider>
  );
}
