import { Text, View } from "react-native";

const Message = ({ message }) => {
  return (
    <View>
      <Text className="text-white">{message.msg}</Text>
    </View>
  );
};

export default Message;
