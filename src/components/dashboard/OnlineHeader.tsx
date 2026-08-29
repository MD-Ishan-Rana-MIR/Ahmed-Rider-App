import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Switch, Text, View } from "react-native";
import tw from "twrnc";

interface OnlineHeaderProps {
  isOnline: boolean;
  onToggle: (value: boolean) => void;
}

export const OnlineHeader: React.FC<OnlineHeaderProps> = ({
  isOnline,
  onToggle,
}) => {
  return (
    <View style={tw`absolute top-12 left-4 right-4 z-20`}>
      <View
        style={tw`bg-white rounded-full p-2.5 px-4 flex-row items-center justify-between shadow-lg border border-gray-100`}
      >
        <View style={tw`flex-row items-center gap-3 flex-1`}>
          <View
            style={tw`w-11 h-11 rounded-full bg-[#E6F4FE] items-center justify-center`}
          >
            <Ionicons name="sunny" size={24} color="#FFA500" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-base font-bold text-gray-900`}>
              {isOnline ? "Online" : "Offline"}
            </Text>
            <Text
              style={tw`text-xs text-gray-400 font-medium`}
              numberOfLines={1}
            >
              {isOnline
                ? "Looking for deliveries nearby..."
                : "Go online to receive orders"}
            </Text>
          </View>
        </View>

        <Switch
          trackColor={{ false: "#E5E7EB", true: "#FF5C00" }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E5E7EB"
          onValueChange={onToggle}
          value={isOnline}
        />
      </View>
    </View>
  );
};
