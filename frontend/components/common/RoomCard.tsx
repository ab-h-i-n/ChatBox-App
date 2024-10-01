import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

const RoomCard = ({ title, id }: { title: string, id: string }) => {
  const router = useRouter();
  const { setChat } = useContext(ChatContext);

  const handleRoomClick = () => {
    setChat({
      title,
      id
    })
    router.push(`/room/${id}`);
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
