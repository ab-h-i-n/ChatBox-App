import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { GlobalContextProvider } from "../context/GlobalContext";

{
  /* <Slot/>  use for just return children */
}

const RootLayout = () => {
  return (
    <GlobalContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GlobalContextProvider>
  );
};

export default RootLayout;
