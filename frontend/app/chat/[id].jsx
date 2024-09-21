import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../context/GlobalContext";

const ChatPage = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { chat, socket, user } = useContext(GlobalContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${chat.title}`,
      headerStyle: {
        backgroundColor: "#334756",
      },
      headerTintColor: "#fff",
    });
  }, [navigation, id]);

  useEffect(() => {
    if (id) {
      socket?.emit("join-room", id);
      console.log('emmited join- req');
      
    }
  }, [id]);

  return (
    <ScrollView className="bg-primary h-full">
      <Text>ChatPage</Text>
    </ScrollView>
  );
};

export default ChatPage;
