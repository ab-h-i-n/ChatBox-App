import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../context/GlobalContext";
import Message from "../../components/Message";
import MessageSender from "../../components/MessageSender";

const ChatPage = () => {
  const [typing, setTyping] = useState();
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { chat, socket, roomUsers, messages } = useContext(GlobalContext);

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
    if (id && !roomUsers?.[id].includes(socket?.id)) {
      console.log(roomUsers);
      socket?.emit("join-room", id);
    }
  }, [id, roomUsers]);

  useEffect(() => {
    socket?.on("typing-response", (msg) => {
      setTyping(msg);
    });
  }, []);

  return (
    <View className="bg-primary h-full">
      <ScrollView className=" mb-5 h-full">
        {messages?.length > 0 ? (
          <>
            {messages?.map((msg) => (
              <Message message={msg} key={msg.id} />
            ))}
          </>
        ) : (
          <>
            <Text className="text-white font-medium text-center mt-3">
              No Messages!
            </Text>
          </>
        )}
        {typing && <Text className="text-white/70 ml-3">{typing}</Text>}
      </ScrollView>
      <MessageSender id={id} />
    </View>
  );
};

export default ChatPage;
