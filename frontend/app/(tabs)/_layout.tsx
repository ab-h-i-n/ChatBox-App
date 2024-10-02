import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Header from "../../components/common/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icons } from "@/constants/Icons";
import CreateRoomModal from "@/components/myrooms/CreateRoomModal";

type TabIconProps = {
  name: string;
  icon: any;
  color: string;
}

const TabIcon = ({ name, icon, color }: TabIconProps) => {
  return (
    <View className="items-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{
          width: 32,
          height: 32
        }}
      />
      <Text style={{ color: color }} className={`font-bold text-nowrap`}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <SafeAreaView style={{ height: "100%", backgroundColor: "#334756" }}>
        <Header />
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#ff4c29",
            tabBarInactiveTintColor: "#082032",
            tabBarStyle: {
              backgroundColor: "#334756",
              height: 80,
            },
          }}
        >
          <Tabs.Screen
            name="global-room"
            options={{
              title: "Global Room",
              headerShown: false,
              tabBarIcon: ({ color }: { color: string }) => (
                <TabIcon
                  name="Global"
                  icon={Icons.GlobalRoomIcon}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="my-rooms"
            options={{
              title: "My Rooms",
              headerShown: false,
              tabBarIcon: ({ color }: { color: string }) => (
                <TabIcon
                  name="My Rooms"
                  icon={Icons.MyRoomIcon}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
      <CreateRoomModal />
    </>

  );
};

export default TabsLayout;
