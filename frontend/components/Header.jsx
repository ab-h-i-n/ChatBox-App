import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { icons } from "../constants/icons";
import { GlobalContext } from "../context/GlobalContext";

const Header = () => {
  const { handleLogOut } = useContext(GlobalContext);

  return (
    <View className="bg-teritiary py-6 px-5 flex-row justify-between">
      <Text className="text-secondary font-bold text-3xl">Chat Box</Text>
      <TouchableOpacity onPress={handleLogOut}>
        <Image
          source={icons.LogOutIcon}
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
