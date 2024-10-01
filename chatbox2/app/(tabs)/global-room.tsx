import { Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard";
import { ChatContext } from "@/context/ChatContext";

const GlobalRoom = () => {

  const { globalRooms } = useContext(ChatContext);

  return (
    <ScrollView className="bg-primary">
      {globalRooms ? (
        <>
          {globalRooms?.map((room) => (
            <RoomCard key={room.id} id={room.id} title={room.title} />
          ))}
        </>
      ) : (
        <>
          <Text className="text-white font-semibold text-center mt-5">Loading...</Text>
        </>
      )}
    </ScrollView>
  );
};

export default GlobalRoom;
