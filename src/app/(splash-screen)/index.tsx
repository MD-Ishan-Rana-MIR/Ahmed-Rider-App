import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../../../lib/tailwind";

const CONTENT = {
  title: "Turn Every Trip Into an Opportunity",
  description:
    "Pick up orders, deliver them safely, and get rewarded for every successful delivery.",
  image: require("../../../assets/onboard/onboarding.png"),
};

export default function Index() {
  const insets = useSafeAreaInsets();

  const handleGetStarted = () => {
    router.push("/(auth)/login");
  };

  return (
    <View
      style={[
        tw`flex-1 bg-white`,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      <StatusBar style="light" />
      <View style={tw`flex-1 justify-between`}>
        {/* Single Image Section */}
        <View style={tw`relative flex-1 overflow-hidden`}>
          <Image
            source={CONTENT.image}
            style={tw`w-full h-full`}
            resizeMode="cover"
          />

          {/* Bottom Gradient Overlay */}
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.7)", "#FFFFFF"]}
            style={tw`absolute bottom-0 left-0 right-0 h-28`}
            pointerEvents="none"
          />
        </View>

        {/* Text Content */}
        <View style={tw`px-6 pt-2`}>
          <Text
            style={tw`text-[32px] font-bold text-gray-900 leading-[38px] mb-3`}
          >
            {CONTENT.title}
          </Text>
          <Text style={tw`text-base text-gray-500 leading-6`}>
            {CONTENT.description}
          </Text>
        </View>

        {/* Action Button */}
        <View style={tw`px-6 pb-8 pt-4`}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleGetStarted}
            style={tw`bg-[#5A7314] py-4 rounded-full items-center justify-center`}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
