import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const RoomCard = ({ title, id }) => {
  const router = useRouter();
  const { setChat } = useContext(GlobalContext);

  const handleRoomClick = () => {
    setChat({
      title,
      id,
    });
    router.push(`/chat/${id}`);
  };

  return (
    <TouchableOpacity
      onPress={handleRoomClick}
      className="border-b-[1px] border-white/10 py-8 px-5"
    >
      <Text className="text-white font-semibold text-xl">{title}</Text>
    </TouchableOpacity>
  );
};

export default RoomCard;
