import { log } from "@/utils/log";
import { socket } from "@/utils/Socket";
import { createContext, useEffect, useState } from "react";

type SocketContextTypes = {
    isSocketOn? : boolean;
}

export const SocketContext = createContext<SocketContextTypes>({});


export const SocketContextProvider = ({ children }: { children: any }) => {

    const [isSocketOn, setSocketOn] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            setSocketOn(true);
            log("Socket connected! " + socket.id)
        });

        return () => {
            socket.disconnect();
            setSocketOn(false);
        }

    }, [])

    return (
        <SocketContext.Provider value={{ isSocketOn }}>
            {children}
        </SocketContext.Provider>
    )
}