import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { safeAreaStyle } from "../../styles/styles";
import { GlobalContext } from "../../context/GlobalContext";
import RoomCard from "../../components/RoomCard";

const fetchRooms = async () => {
  try {
    return (await fetch(`${process.env.EXPO_PUBLIC_API_URL}/rooms`)).json();
  } catch (error) {
    console.error(`Failed to fetch rooms`, error);
  }
};

const GlobalRoom = () => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!rooms) {
        const roomsData = await fetchRooms();
        console.log(roomsData);
        setRooms(roomsData);
      }
    };

    fetchRoom();
  }, []);

  return (
    <ScrollView className="bg-primary">
      {rooms &&
        rooms?.map((room) => (
          <RoomCard key={room.id} id={room.id} title={room.title} />
        ))}
    </ScrollView>
  );
};

export default GlobalRoom;
