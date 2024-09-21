import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants/icons";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { safeAreaStyle } from "../../styles/styles";

const TabIcon = ({ focused, name, icon, color }) => {
  return (
    <View className="items-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`w-8 h-8 `}
      />
      <Text style={{ color: color }} className={`font-bold`}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
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
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                focused={focused}
                name="Global"
                icon={icons.GlobalRoomIcon}
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
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                focused={focused}
                name="My Rooms"
                icon={icons.MyRoomIcon}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
