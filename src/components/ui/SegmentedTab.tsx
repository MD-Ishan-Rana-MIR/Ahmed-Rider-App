import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

interface SegmentedTabProps {
  activeTab: "active" | "completed";
  activeCount: number;
  completedCount: number;
  onTabChange: (tab: "active" | "completed") => void;
}

export const SegmentedTab: React.FC<SegmentedTabProps> = ({
  activeTab,
  activeCount,
  completedCount,
  onTabChange,
}) => {
  return (
    <View style={tw`flex-row bg-[#F2F4F7] rounded-full p-1.5 mb-4`}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onTabChange("active")}
        style={tw`flex-1 py-2.5 rounded-full items-center justify-center ${
          activeTab === "active" ? "bg-white shadow-xs" : ""
        }`}
      >
        <Text
          style={tw`text-sm font-semibold ${
            activeTab === "active" ? "text-gray-900" : "text-gray-500"
          }`}
        >
          Active ({activeCount})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onTabChange("completed")}
        style={tw`flex-1 py-2.5 rounded-full items-center justify-center ${
          activeTab === "completed" ? "bg-white shadow-xs" : ""
        }`}
      >
        <Text
          style={tw`text-sm font-semibold ${
            activeTab === "completed" ? "text-gray-900" : "text-gray-500"
          }`}
        >
          Completed ({completedCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
};
