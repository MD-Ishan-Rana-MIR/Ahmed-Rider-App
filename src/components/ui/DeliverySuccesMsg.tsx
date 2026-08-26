import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

interface DeliverySuccessProps {
  customerName?: string;
  orderId?: string;
  deliveredAt?: string;
  onBackToHome?: () => void;
}

export const DeliverySuccessScreen: React.FC<DeliverySuccessProps> = ({
  customerName = "Shahid Hasan",
  orderId = "#2511K526",
  deliveredAt = "Jun 4, 2026",
  onBackToHome,
}) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow justify-between px-5 pt-10 pb-8 bg-white`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`items-center`}>
          {/* Top Decorative Illustration */}
          <View style={tw`relative items-center justify-center my-6`}>
            {/* Confetti & Decorative Bits */}
            <Text
              style={tw`absolute -top-3 left-2 text-[#FF5C00] font-bold text-xs`}
            >
              ×
            </Text>
            <Text
              style={tw`absolute top-1 -right-2 text-[#FF5C00] font-bold text-xs`}
            >
              ×
            </Text>
            <Text style={tw`absolute bottom-0 -left-4 text-[#FF5C00] text-sm`}>
              ~
            </Text>
            <Text style={tw`absolute bottom-2 -right-4 text-[#FF5C00] text-sm`}>
              ~
            </Text>
            <View
              style={tw`absolute -bottom-2 left-6 w-2 h-2 rounded-full bg-[#FF5C00]`}
            />

            {/* Main Badge Container */}
            <View
              style={tw`w-32 h-32 rounded-full bg-[#FF5C00] items-center justify-center shadow-lg border-4 border-[#FF8A00]`}
            >
              {/* Inner Scalloped Badge Circle */}
              <View
                style={tw`w-20 h-20 rounded-full bg-white/20 items-center justify-center`}
              >
                <View
                  style={tw`w-14 h-14 rounded-full bg-white items-center justify-center shadow-xs`}
                >
                  <Ionicons name="checkmark" size={32} color="#FF5C00" />
                </View>
              </View>
            </View>
          </View>

          {/* Title & Description */}
          <Text style={tw`text-2xl font-bold text-gray-900 mb-1 text-center`}>
            Delivery Successful
          </Text>
          <Text style={tw`text-sm text-gray-400 text-center mb-6`}>
            The order has been delivered successfully
          </Text>

          {/* Details Card */}
          <View
            style={tw`w-full bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-y-4`}
          >
            {/* Status Row */}
            <View
              style={tw`flex-row justify-between items-center pb-3 border-b border-gray-100`}
            >
              <Text style={tw`text-sm font-medium text-gray-500`}>Status</Text>
              <View
                style={tw`bg-[#E6F8EF] px-3 py-1 rounded-full border border-[#B8F2D5]`}
              >
                <Text style={tw`text-xs font-semibold text-[#10B981]`}>
                  Delivered
                </Text>
              </View>
            </View>

            {/* Customer Row */}
            <View
              style={tw`flex-row items-center pb-3 border-b border-gray-100`}
            >
              <View
                style={tw`w-10 h-10 rounded-xl bg-[#FFF0F0] items-center justify-center mr-3`}
              >
                <Feather name="user" size={20} color="#FF5C00" />
              </View>
              <View>
                <Text style={tw`text-xs text-gray-400 font-medium mb-0.5`}>
                  Customer
                </Text>
                <Text style={tw`text-sm font-semibold text-gray-900`}>
                  {customerName}
                </Text>
              </View>
            </View>

            {/* Order ID Row */}
            <View
              style={tw`flex-row items-center pb-3 border-b border-gray-100`}
            >
              <View
                style={tw`w-10 h-10 rounded-xl bg-[#E6F8EF] items-center justify-center mr-3`}
              >
                <Octicons name="hash" size={20} color="#10B981" />
              </View>
              <View>
                <Text style={tw`text-xs text-gray-400 font-medium mb-0.5`}>
                  Order ID
                </Text>
                <Text style={tw`text-sm font-semibold text-gray-900`}>
                  {orderId}
                </Text>
              </View>
            </View>

            {/* Delivered At Row */}
            <View style={tw`flex-row items-center`}>
              <View
                style={tw`w-10 h-10 rounded-xl bg-[#EBF3FF] items-center justify-center mr-3`}
              >
                <Feather name="calendar" size={18} color="#2F80ED" />
              </View>
              <View>
                <Text style={tw`text-xs text-gray-400 font-medium mb-0.5`}>
                  Delivered At
                </Text>
                <Text style={tw`text-sm font-semibold text-gray-900`}>
                  {deliveredAt}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Back to Home Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onBackToHome}
          style={tw`bg-[#526D18] py-4 rounded-full items-center justify-center mt-6 shadow-xs`}
        >
          <Text style={tw`text-white font-bold text-base`}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DeliverySuccessScreen;
