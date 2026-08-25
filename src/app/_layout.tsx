import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(splash-screen)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tab)" />
      </Stack>
    </>
  );
}
