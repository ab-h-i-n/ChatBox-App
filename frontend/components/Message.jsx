import { useContext } from "react";
import { Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalContext";

const Message = ({ message }) => {
  const { socket } = useContext(GlobalContext);

  return (
    <View className="my-2">
      {message?.socketId === "join"  ? (
        <>
          <Text className="text-center text-white/70 text-sm">{ message?.msg }</Text>
        </>
      ) : (
        <>
          <View
            className={`${
              message.socketId === socket?.id
                ? "bg-secondary ml-auto mr-3"
                : "bg-teritiary ml-3 mr-auto"
            } py-3 px-4 rounded-xl`}
          >
            <Text
              className={`${
                message.socketId === socket?.id ? "ml-auto" : ""
              } text-white font-bold mb-1`}
            >
              {message.socketId === socket?.id ? "You" : message.user}
            </Text>
            <Text className="text-white">{message.msg}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Message;
