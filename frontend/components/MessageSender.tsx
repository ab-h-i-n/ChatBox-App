import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import uuid from 'react-native-uuid';
import { Icons } from "@/constants/Icons";
import { AuthContext } from "@/context/AuthContext";
import { socket } from "@/utils/Socket";
import { log } from "@/utils/log";

const MessageSender = ({ roomId }: { roomId: string }) => {
  const [msg, setMsg] = useState("");
  const { user } = useContext(AuthContext);

  const handleMsgSend = () => {

    const messageData = {
      msg: msg,
      roomId: roomId,
      user: user,
      time: Date.now(),
      id: uuid.v4(),
      socketId: socket.id
    }

    socket?.emit("send-message", messageData);
    log("Message sending : " + JSON.stringify(messageData))
    setMsg("");
  }

  const handleTyping = (text: string) => {
    setMsg(text);
  }

  useEffect(() => {
    socket?.emit("typing", msg ? user + " is typing..." : "");
  }, [msg])

  return (
    <View className="flex-row justify-between gap-x-3 mx-3 mb-3  w-[calc(100%-24px)]">
      <TextInput
        className="bg-teritiary flex-1 py-3 px-5 rounded-full text-white "
        value={msg}
        placeholder={"Message"}
        onChangeText={handleTyping}
        placeholderTextColor={"#b7b8ba"}
      />
      <TouchableOpacity onPress={handleMsgSend} className="bg-secondary rounded-full w-[50px] h-[50px] justify-center items-center">
        <Image
          source={Icons.SendIcon}
          alt="send"
          style={{
            width: 32,
            height: 32
          }}
          tintColor={"white"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MessageSender;
