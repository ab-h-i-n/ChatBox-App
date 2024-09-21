import { Text, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

export default function App() {
  const [value, setValue] = useState(null);
  const router = useRouter();

  const handleInputChange = (text) => {
    setValue(text);
  };

  const handleClick = () => {
    router.push('/global-room');
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#082032", height: "100%" }}>
      <ScrollView >
        <Text className="text-secondary font-bold text-4xl text-center mt-[70%]">
          Chat Box
        </Text>
        <View className="items-center gap-5 mt-10 mb-5">
          <InputBox
            label={"Username"}
            placeholder={"Enter your username"}
            value={value}
            handleInputChange={handleInputChange}
          />
          <Button handleClick={handleClick} >Login</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
