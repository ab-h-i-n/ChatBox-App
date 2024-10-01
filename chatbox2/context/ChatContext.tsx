import { log } from "@/utils/log";
import React, { createContext, useEffect, useState, ReactNode } from "react";


type RoomProps = {
    title: string;
    id: string;
};

type ChatContextTypes = {
    globalRooms?: RoomProps[];
};

export const ChatContext = createContext<ChatContextTypes>({});

export const ChatContextProvider = ({ children }: any) => {
    const [globalRooms, setGlobalRooms] = useState<RoomProps[]>([]); 

    const fetchRooms = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/rooms`);
            const gRooms = await response.json();
            setGlobalRooms(gRooms); 
            log("Global Rooms: ");
            log(gRooms); 
        } catch (error) {
            console.error("Failed to fetch rooms", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <ChatContext.Provider value={{ globalRooms }}>
            {children}
        </ChatContext.Provider>
    );
};
