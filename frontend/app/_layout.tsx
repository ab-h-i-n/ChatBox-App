import { AuthContext } from "@/context/AuthContext";
import { GlobalContextProvider } from "@/context/GlobalContext";
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect } from "react";

const RootLayout = () => {
  return (
    <GlobalContextProvider>
      <Layout />
    </GlobalContextProvider>
  );
};

export default RootLayout;



const Layout = () => {
  const { isLoggedIn } = useContext(AuthContext);
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
