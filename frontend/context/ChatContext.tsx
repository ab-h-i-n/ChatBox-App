import { API_URL } from "@/env";
import { log } from "@/utils/log";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RoomProps = {
    title: string;
    id: string;
};

type ChatContextTypes = {
    globalRooms: RoomProps[];
    messages: any[];
    chat: any;
    roomUsers: Record<string, any>;
    setMessages: React.Dispatch<React.SetStateAction<any[]>>;
    setChat: React.Dispatch<React.SetStateAction<any>>;
    setRoomUsers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

export const ChatContext = createContext<ChatContextTypes>({
    globalRooms : [],
    messages: [],
    chat: null,
    roomUsers: {},
    setMessages: () => { },
    setChat: () => { },
    setRoomUsers: () => { },
});

export const ChatContextProvider = ({ children }: any) => {
    const [globalRooms, setGlobalRooms] = useState<RoomProps[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [chat, setChat] = useState(null);
    const [roomUsers, setRoomUsers] = useState<Record<string, any>>({});

    const fetchRooms = async () => {
        try {
            const response = await fetch(`${API_URL}/rooms`);
            const gRooms = await response.json();
            setGlobalRooms(gRooms);
            log("Global Rooms: ");
            log(gRooms);
        } catch (error) {
            console.error("Failed to fetch rooms", error);
        }
    };

    const getSavedMessages = async () => {
        const msgs = await AsyncStorage.getItem("messages");
        if (msgs) {
            setMessages(JSON.parse(msgs));
        }
    };

    const saveMessages = async () => {
        await AsyncStorage.setItem("messages", JSON.stringify(messages));
    };

    useEffect(() => {
        fetchRooms();
        getSavedMessages();
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            saveMessages();
        }
    }, [messages]);

    return (
        <ChatContext.Provider
            value={{
                globalRooms,
                messages,
                setMessages,
                chat,
                setChat,
                roomUsers,
                setRoomUsers,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
