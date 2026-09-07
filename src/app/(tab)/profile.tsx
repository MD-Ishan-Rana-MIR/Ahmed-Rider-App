import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

import { ProfilePageSkeleton } from "@/components/skeleton/ProfilePageSkeleton";
import BackButton from "@/components/ui/BackButton";
import { useRiderLogoutMutation, useRiderProfileQuery } from "@/redux/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorMsg } from "../../../lib/errorMessage";
import {
  about,
  logout,
  notification,
  personalInfo,
  privacy,
  settings,
  term,
} from "../../../lib/icon";
import { successMsg } from "../../../lib/successMsg";
import tw from "../../../lib/tailwind";

interface MenuItemProps {
  iconName: string;
  title: string;
  onPress?: () => void;
  isLogout?: boolean;
  isLast?: boolean;
}

const MenuItem = ({
  iconName,
  title,
  onPress,
  isLogout = false,
  isLast = false,
}: MenuItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[
      tw`flex-row items-center justify-between py-3 px-4`,
      !isLast && tw`border-b border-gray-100`,
    ]}
  >
    <View style={tw`flex-row items-center gap-x-3`}>
      {/* Circle Icon Wrapper */}
      <View
        style={tw`w-10 h-10 rounded-full items-center justify-center border-[2px] border-[#F3F3F3]  ${
          isLogout ? "" : "bg-[#FFFFFF]  "
        }`}
      >
        <SvgXml
          xml={iconName}
          width={18}
          color={isLogout ? "#EF4444" : "#374151"}
        />
      </View>

      {/* Menu Title */}
      <Text
        style={tw` text-[16px] font-Manrope-Medium.ttf ${
          isLogout ? "text-[#EF4444] font-semibold" : "text-[#222222]"
        }`}
      >
        {title}
      </Text>
    </View>

    {/* Chevron Indicator */}
    {!isLogout && <Ionicons name="chevron-forward" size={18} color="#000000" />}
  </TouchableOpacity>
);

export default function Profile() {
  const menuItems = [
    {
      iconName: personalInfo,
      title: "Personal Information",
      link: "personal-info",
    },
    { iconName: settings, title: "Account Settings", link: "setting" },
    {
      iconName: notification,
      title: "Notifications",
      link: "notification",
    },
    { iconName: about, title: "About Us", link: "about" },
    { iconName: privacy, title: "Privacy Policy", link: "privacy" },
    { iconName: term, title: "Terms of service", link: "term" },
    { iconName: logout, title: "Log Out", isLogout: true },
  ];

  const [riderLogout, { isLoading }] = useRiderLogoutMutation();

  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to log out of your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await riderLogout({}).unwrap();

              // 1. Clear stored Auth Tokens
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("forget-password-token");

              // 3. Show Success Toast
              successMsg(res?.message || "Logged out successfully");

              // 4. Redirect to Sign-In screen
              router.replace("/(auth)/login");
            } catch (error) {
              errorMsg(
                error && typeof error === "object" && "data" in error
                  ? ((error as { data?: { message?: string } }).data?.message ??
                      String(error))
                  : error instanceof Error
                    ? error.message
                    : String(error),
              );
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const { data, isLoading: profileLoading } = useRiderProfileQuery({});

  if (profileLoading) {
    return <ProfilePageSkeleton />;
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton title="Profile" showBackButton={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-white px-5 mt-5 pb-8`}
      >
        {/* Main Profile Card Container */}
        <View
          style={tw`bg-[#FCFCFC] rounded-2xl border border-[#EDEDED] shadow-sm overflow-hidden `}
        >
          {/* User Header Section */}
          <View
            style={tw`flex-row items-center gap-x-3  border-b px-4 pt-4 pb-6 border-gray-100 `}
          >
            {data?.data?.profile_photo_url ? (
              <>
                <Image
                  source={{
                    uri: data?.data?.profile_photo_url,
                  }}
                  style={tw`w-12 h-12 rounded-full bg-gray-200`}
                />
              </>
            ) : (
              <>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
                  }}
                  style={tw`w-12 h-12 rounded-full bg-gray-200`}
                />
              </>
            )}

            <View style={tw`flex-1 `}>
              <Text
                style={tw`text-[16px] font-Manrope-Bold.ttf text-[#222222]`}
              >
                {data?.data?.name}
              </Text>
              <Text
                style={tw`text-xs font-Manrope-Regular.ttf text-[#858585] mt-1`}
              >
                {data?.data?.email}
              </Text>
            </View>
          </View>

          {/* Dynamic Menu Item List */}
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              iconName={item.iconName}
              title={item.title}
              isLogout={item.isLogout}
              isLast={index === menuItems.length - 1}
              onPress={() => {
                if (item.isLogout) {
                  handleLogout();
                } else if (item.link) {
                  // Navigate for regular menu items
                  router.push(`/link/${item.link}` as any);
                }
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
