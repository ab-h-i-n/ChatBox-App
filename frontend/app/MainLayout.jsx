import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Stack } from "expo-router";
import { GlobalContext } from "../context/GlobalContext";

const MainLayout = () => {
  const { isLoggedIn } = useContext(GlobalContext);

  return (
    <Stack>
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="index" options={{ headerShown: false }} />
      )}
    </Stack>
  );
};

export default MainLayout;
