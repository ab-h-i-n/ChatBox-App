import { View, Text, ScrollView } from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Message from "../../components/Message";
import MessageSender from "../../components/MessageSender";
import uuid from 'react-native-uuid';
import { socket } from "@/utils/Socket";
import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";


const ChatPage = () => {
  const [typing, setTyping] = useState();
  const { id }: { id: string } = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { chat, roomUsers, messages } = useContext(ChatContext);
  const scrollViewRef = useRef<ScrollView>(null);

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
    if (id && !roomUsers?.[id]?.includes(socket?.id)) {
      console.log(roomUsers);
      socket?.emit("join-room", id);
      socket?.emit("send-message", {
        msg: `${user} has joined the room`,
        roomId: id,
        user: user,
        time: Date.now(),
        id: uuid.v4(),
        socketId: 'join',
      });
    }
  }, [id, roomUsers]);

  useEffect(() => {
    socket?.on("typing-response", (msg) => {
      setTyping(msg);
    });
  }, []);

  const handleScrollIntoView = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      handleScrollIntoView();
    }
  }, [typing, messages]);

  return (
    <View className="bg-primary h-full gap-x-2">
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => handleScrollIntoView()}
      >
        {messages?.length > 0 ? (
          <>
            {messages?.map((msg) => (
              <Message message={msg} key={msg.id} />
            ))}
          </>
        ) : (
          <>
            <Text className="text-white font-medium text-center mt-5">
              No Messages!
            </Text>
          </>
        )}
        {typing && <Text className="text-white/70 ml-3">{typing}</Text>}
      </ScrollView>
      <MessageSender roomId={id} />
    </View>
  );
};

export default ChatPage;
