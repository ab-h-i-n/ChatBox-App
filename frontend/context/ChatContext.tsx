import { API_URL } from "@/env";
import { log } from "@/utils/log";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import { socket } from "@/utils/Socket";

type RoomProps = {
    title: string;
    id: string;
    members?: string[];
};

type ChatContextTypes = {
    globalRooms: RoomProps[];
    messages: any[];
    chat: any;
    roomUsers: Record<string, any>;
    myRooms: RoomProps[];
    setMessages: React.Dispatch<React.SetStateAction<any[]>>;
    setChat: React.Dispatch<React.SetStateAction<any>>;
    setRoomUsers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    fetchMyRooms: () => void;
};

export const ChatContext = createContext<ChatContextTypes>({
    globalRooms: [],
    messages: [],
    chat: null,
    roomUsers: {},
    myRooms: [],
    setMessages: () => { },
    setChat: () => { },
    setRoomUsers: () => { },
    fetchMyRooms: () => { }
});

export const ChatContextProvider = ({ children }: any) => {
    const [globalRooms, setGlobalRooms] = useState<RoomProps[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [chat, setChat] = useState(null);
    const [roomUsers, setRoomUsers] = useState<Record<string, any>>({});
    const [myRooms, setMyRooms] = useState<RoomProps[]>([]);
    const { user } = useContext(AuthContext);

    const fetchMyRooms = async () => {
        try {
            const response = await fetch(`${API_URL}/rooms/user/${user}`);
            const res = await response.json();
            log("Fetched rooms : " + JSON.stringify(res));
            setMyRooms(res);
        } catch (error) {
            console.error(error);
        }
    }

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
        if (user) {
            fetchMyRooms();
        }
    }, [user]);

    useEffect(() => {
        if (messages.length > 0) {
            saveMessages();
        }
    }, [messages]);

    useEffect(() => {
        socket.on("users_response", (data) => setRoomUsers(data));

        socket.on("receive-message", (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, [])

    return (
        <ChatContext.Provider
            value={{
                myRooms,
                globalRooms,
                messages,
                setMessages,
                chat,
                setChat,
                roomUsers,
                setRoomUsers,
                fetchMyRooms
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
