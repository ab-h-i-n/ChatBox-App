import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { icons } from "../constants/icons";
import { GlobalContext } from "../context/GlobalContext";

const MessageSender = ({ id }) => {
  const [msg, setMsg] = useState();
  const { socket , user } = useContext(GlobalContext);

  const handleMsgSend = () => {
    socket.emit("send-message" , {
        msg : msg,
        roomId : id,
        user : user
    })
  }

  return (
    <View className="flex-row justify-between gap-3 mx-3 fixed bottom-3 left-0">
      <TextInput
        className="bg-teritiary flex-1 py-3 px-5 rounded-full border-[1px] border-white/20 text-white"
        value={msg}
        placeholder={"Message"}
        onChangeText={(text) => setMsg(text)}
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
