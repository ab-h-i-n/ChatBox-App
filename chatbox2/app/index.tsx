import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import { GlobalContext, GlobalContextType } from "@/context/GlobalContext";

export default function Index() {

  const [isConnected, setConnected] = useState(false);
  const [type, setType] = useState<string | null>(null); 

  const context = useContext(GlobalContext) as GlobalContextType;


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setType(state.type);
      setConnected(state.isInternetReachable || false);
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });

    return () => {
      unsubscribe(); 
    };
  }, []);


  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 items-center justify-center bg-red-500">
        <Text className="text-4xl font-semibold text-white">Edit app/index.tsx to edit this screen.</Text>
        {
          context.isSocketConnected ? (
            <Text className="text-4xl font-semibold text-green-500">Connected to socket</Text>
          ) : (
            <Text className="text-4xl font-semibold text-yellow-500">Not connected to socket</Text>
          )
        }
        <Text className="text-2xl font-medium text-white mt-4">
          Connection Type: {type ?? 'Unknown'}
        </Text>
        <Text className="text-2xl font-medium text-white mt-2">
          Status: {isConnected ? 'Online' : 'Offline'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
