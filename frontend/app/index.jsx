import { Text, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { safeAreaStyle } from "../styles/styles";
import { GlobalContext } from "../context/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const { setUser } = useContext(GlobalContext);

  const handleInputChange = (text) => {
    setValue(text);
  };

  const handleClick = async () => {
    try {
      setUser(value);
      await AsyncStorage.setItem("user", value);
      router.replace("/global-room"); 
    } catch (error) {
      console.error("Failed to save auth status", error);
    }
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center h-full">
          <Text className="text-secondary font-bold text-4xl text-center ">
            Chat Box
          </Text>
          <View className="items-center gap-5 mt-10 mb-5">
            <InputBox
              label={"Username"}
              placeholder={"Enter your username"}
              value={value}
              handleInputChange={handleInputChange}
            />
            <Button handleClick={handleClick}>Login</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
