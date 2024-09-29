import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import { socket } from "@/utils/Socket";

export default function Index() {

  const [isConnected, setConnected] = useState(false);
  const [isSocketConnected, setSocketConnected] = useState(false);
  const [type, setType] = useState<string | null>(null); 

  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem('my-key', value);
    } catch (e) {
      // saving error
      console.error(e);
    }
  };

  useEffect(() => {
    storeData('hello world');
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


  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setSocketConnected(true);
    }

    function onDisconnect() {
      setSocketConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 items-center justify-center bg-red-500">
        <Text className="text-4xl font-semibold text-white">Edit app/index.tsx to edit this screen.</Text>
        {
          isSocketConnected ? (
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
