import React, { useContext, useEffect } from "react";
import "../global.css";
import { GlobalContextProvider, GlobalContext } from "../context/GlobalContext";
import Login from "./index.jsx";
import TabsLayout from "./(tabs)/_layout.jsx";
import { Stack, useRouter } from "expo-router";

export default RootLayout = () => {
  return (
    <GlobalContextProvider>
      <Layout></Layout>
    </GlobalContextProvider>
  );
};

const Layout = () => {
  const { isLoggedIn } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/global-room");
    }
  }, [isLoggedIn]);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};
