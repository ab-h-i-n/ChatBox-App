import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { icons } from "../constants/icons";
import { GlobalContext } from "../context/GlobalContext";
import uuid from 'react-native-uuid';

const MessageSender = ({ id }) => {
  const [msg, setMsg] = useState();
  const { socket , user } = useContext(GlobalContext);

  const handleMsgSend = () => {
    socket.emit("send-message" , {
        msg : msg,
        roomId : id,
        user : user,
        time : Date.now(),
        id : uuid.v4(),
        socketId : socket.id
    })
    setMsg("");
  }

  const handleTyping = (text) => {
    setMsg(text);
    socket.emit("typing" , text ? user + " is typing..." : "" );
  }

  return (
    <View className="flex-row justify-between gap-3 mx-3 fixed bottom-3 left-0">
      <TextInput
        className="bg-teritiary flex-1 py-3 px-5 rounded-full border-[1px] border-white/20 text-white"
        value={msg}
        placeholder={"Message"}
        onChangeText={handleTyping}
        placeholderTextColor={"#b7b8ba"}
      />
      <TouchableOpacity onPress={handleMsgSend} className="bg-secondary rounded-full w-[50px] h-[50px] justify-center items-center">
        <Image
          source={icons.SendIcon}
          alt="send"
          className="w-8 h-8"
          tintColor={"white"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MessageSender;
