import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import tw from "../../lib/tailwind";

// Prevent the native splash screen from hiding until we are ready
SplashScreen.preventAutoHideAsync();

const Index = () => {
  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    "Manrope-Bold": require("../../assets/font/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../assets/font/Manrope-ExtraBold.ttf"),
    "Manrope-SemiBold": require("../../assets/font/Manrope-SemiBold.ttf"),
    "Manrope-Medium": require("../../assets/font/Manrope-Medium.ttf"),
    "Manrope-Light": require("../../assets/font/Manrope-Light.ttf"),
    "Manrope-Regular": require("../../assets/font/Manrope-Regular.ttf"),
    "Manrope-ExtraLight": require("../../assets/font/Manrope-ExtraLight.ttf"),
  });

  // Static Mock States
  const isLoading = false;
  const isFetching = false;
  const isError = false;
  const userRole: "TENANT" | "LANDLORD" | null = null;
  const data = null;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleNavigation = async () => {
      // Ensure fonts are loaded/errored and data is ready before navigating
      if ((fontsLoaded || fontError) && !isLoading && !isFetching) {
        timeout = setTimeout(async () => {
          await SplashScreen.hideAsync();

          router.replace("/(splash-screen)");

          // if (data && userRole === "TENANT") {
          //   router.replace("/(tenant-tab)");
          // } else if (data && userRole === "LANDLORD") {
          //   router.replace("/(property-owner-tab)");
          // } else {
          //   // Unauthenticated or error route
          // }
        }, 1500);
      }
    };

    handleNavigation();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [fontsLoaded, fontError, isLoading, isFetching, userRole, data, isError]);

  // Keep screen blank while fonts load natively
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={tw`flex-1`}>
      <StatusBar barStyle="dark-content" />

      <View style={tw`flex-1 px-4 justify-between py-10`}>
        {/* Top Loading Indicator */}
        <View style={tw`items-center`}>
          {(isLoading || isFetching) && (
            <ActivityIndicator size="large" color={tw.color("btnColor")} />
          )}
        </View>

        {/* Center Logo */}
        <View style={tw`items-center justify-center flex-1`}>
          {/* <Image
            source={require("../assets/images/app.logo.png")}
            style={tw`w-48 h-48`}
            resizeMode="contain"
          /> */}
        </View>

        {/* Bottom Spacer to keep logo centered */}
        <View style={tw`h-20`} />
      </View>
    </View>
  );
};

export default Index;
