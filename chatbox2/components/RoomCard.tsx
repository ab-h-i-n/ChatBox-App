import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const RoomCard = ({ title, id } : { title : string , id : string }) => {
  const router = useRouter();

  const handleRoomClick = () => {
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
