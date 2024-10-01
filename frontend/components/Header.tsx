import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Icons } from "@/constants/Icons";

const Header = () => {

  const { handleLogout } = useContext(AuthContext);

  return (
    <View className="bg-teritiary py-6 px-5 flex-row justify-between">
      <Text className="text-secondary font-bold text-3xl">Chat Box</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Image
          source={Icons.LogOutIcon}
          alt="logout"
          style={{
            width: 34,
            height: 34,
          }}
          tintColor={"#ff4c29"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
