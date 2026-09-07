import { useRiderProfileQuery } from "@/redux/authApi";
import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import tw from "../../lib/tailwind";

// Prevent the native splash screen from hiding until fonts and auth state are ready
SplashScreen.preventAutoHideAsync();

const Index = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Manrope-Bold": require("../../assets/font/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../assets/font/Manrope-ExtraBold.ttf"),
    "Manrope-SemiBold": require("../../assets/font/Manrope-SemiBold.ttf"),
    "Manrope-Medium": require("../../assets/font/Manrope-Medium.ttf"),
    "Manrope-Light": require("../../assets/font/Manrope-Light.ttf"),
    "Manrope-Regular": require("../../assets/font/Manrope-Regular.ttf"),
    "Manrope-ExtraLight": require("../../assets/font/Manrope-ExtraLight.ttf"),
  });

  const { data, isLoading, isFetching, isError } = useRiderProfileQuery({});

  useEffect(() => {
    const handleNavigation = async () => {
      // 1. Wait until fonts are done loading (or errored) and API request is finished
      if (!fontsLoaded && !fontError) return;
      if (isLoading || isFetching) return;

      // 2. Hide native splash screen once initial state check is complete
      await SplashScreen.hideAsync();

      // 3. Authenticated Route: Profile exists and no error
      if (data && !isError) {
        router.replace("/(tab)");
      } else {
        // 4. Unauthenticated or Errored Route: Onboarding/Splash flow
        router.replace("/(splash-screen)");
      }
    };

    handleNavigation();
  }, [fontsLoaded, fontError, isLoading, isFetching, data, isError]);

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />

      {/* Centered Content */}
      <View style={tw`flex-1 items-center justify-center px-4`}>
        {/* Loading State & Centered Text */}
        {isLoading || isFetching || !fontsLoaded ? (
          <View style={tw`items-center gap-y-3`}>
            <ActivityIndicator
              size="large"
              color={tw.color("btnColor") || "#5B7410"}
            />
            <Text
              style={tw`text-gray-600 font-semibold text-base tracking-wide`}
            >
              Loading Rider App...
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Index;
