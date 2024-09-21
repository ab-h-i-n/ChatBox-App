import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabIcon = ({ color , focused , name }) => {
  return (
    <View>
      <Text clasName="text-black">{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          
        }}
      >
        <Tabs.Screen
          name="global-room"
          options={{
            title: "Global Room",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              <TabIcon color={color} focused={focused} name="Global"/>;
            },
          }}
        />
        <Tabs.Screen
          name="my-rooms"
          options={{
            title: "My Rooms",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              <TabIcon color={color} focused={focused} name="My Rooms"/>;
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
