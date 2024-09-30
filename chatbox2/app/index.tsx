import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LogInPage() {
  const [userName, setUserName] = useState('');
  const { handleLogin } = useContext(AuthContext);

  const handleLoginUser = () => {
    if (handleLogin) {
      handleLogin(userName);
    }
  }

  const handleUserInput = (text : any) => {
    setUserName(text);
  }


  return (
    <SafeAreaView className="bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center h-full">
          <Text className="text-secondary font-bold text-4xl text-center ">
            Chat Box
          </Text>
          <View className="items-center justify-center mt-10">
            <InputBox
              label={"Username"}
              placeholder={"Enter your username"}
              value={userName}
              onChange={handleUserInput}
            />
            <Button containerClass="mt-3" onClick={handleLoginUser}>Login</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
