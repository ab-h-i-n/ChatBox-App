import { useContext } from "react";
import { Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalContext";

const Message = ({ message }) => {
  
  const { user } = useContext(GlobalContext);

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
              message?.user === user
                ? "bg-secondary ml-auto mr-3"
                : "bg-teritiary ml-3 mr-auto"
            } py-3 px-4 rounded-xl`}
          >
            <Text
              className={`${
                message?.user === user ? "ml-auto" : ""
              } text-white font-bold mb-1`}
            >
              {message?.user === user ? "You" : message?.user}
            </Text>
            <Text className="text-white">{message?.msg}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Message;
