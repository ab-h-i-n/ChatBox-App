import { log } from "@/utils/log";
import { socket } from "@/utils/Socket";
import { createContext, useEffect } from "react";

export const SocketContext = createContext({});


export const SocketContextProvider = ({ children }: { children: any }) => {

    useEffect(() => {

        socket.on('connect', () => {
            log("Socket connected! " + socket.id)
        });

        return () => {
            socket.disconnect();
        }

    }, [])

    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    )
}