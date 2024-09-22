import { View, Text, ScrollView } from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../context/GlobalContext";
import Message from "../../components/Message";
import MessageSender from "../../components/MessageSender";
import uuid from 'react-native-uuid';


const ChatPage = () => {
  const [typing, setTyping] = useState();
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { chat, socket, roomUsers, messages, user } = useContext(GlobalContext);
  const scrollViewRef = useRef();

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
        msg : `${user} has joined the room`,
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
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      handleScrollIntoView();
    }
  }, [typing, messages]);

  return (
    <View className="bg-primary h-full">
      <ScrollView
        className="mb-5 h-full"
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
