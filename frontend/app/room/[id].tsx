import { View, Text, ScrollView, Button, TouchableOpacity, Image } from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Message from "../../components/common/Message";
import MessageSender from "../../components/common/MessageSender";
import uuid from 'react-native-uuid';
import { socket } from "@/utils/Socket";
import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
import * as Clipboard from 'expo-clipboard';
import { Icons } from "@/constants/Icons";


const ChatPage = () => {
  const [typing, setTyping] = useState();
  const { id }: { id: string } = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { chat, roomUsers, messages } = useContext(ChatContext);
  const [thisMessages, setThisMessages] = useState<any[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${chat.title}`,
      headerStyle: {
        backgroundColor: "#334756",
      },
      headerTintColor: "#fff",
      headerRight: () => {
        if (id == '1') return null

        return (
          <TouchableOpacity onPress={handleCopy}>
            <Image
              source={Icons.ShareIcon}
              style={{
                width: 35,
                height: 35
              }}
              tintColor={'#ff4c29'}
            />
          </TouchableOpacity>
        )
      },
    });
  }, [navigation, chat]);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(id);
  }

  useEffect(() => {
    if (id && !roomUsers?.[id]?.includes(socket?.id)) {
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

  useEffect(() => {
    const thisRoomMessages = messages.filter((msgs) => msgs.roomId == id);
    setThisMessages(thisRoomMessages);
  }, [messages])

  return (
    <View className="bg-primary h-full gap-x-2">
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => handleScrollIntoView()}
      >
        {thisMessages?.length > 0 ? (
          <>
            {thisMessages?.map((msg) => (
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
