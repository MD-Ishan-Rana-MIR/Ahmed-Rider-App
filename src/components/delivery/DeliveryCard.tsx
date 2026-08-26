import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";
import { swapIcon } from "../../../lib/icon";

export interface DeliveryItem {
  id: string;
  distance: string;
  price: string;
  status: "Accepted" | "Pending" | "Completed";
  shopAddress: string;
  deliveryAddress: string;
}

interface DeliveryCardProps {
  item: DeliveryItem;
  onViewDetails?: (id: string) => void;
}

export const DeliveryCard: React.FC<DeliveryCardProps> = ({
  item,
  onViewDetails,
}) => {
  return (
    <View
      style={tw`bg-white rounded-[12px] border border-[#E3E3E3] p-4  my-2 shadow-sm`}
    >
      {/* Top Header: Icon, Distance, Price & Status Badge */}
      <View
        style={tw`flex-row items-center justify-between pb-6 border-b border-[#E6E6E6]`}
      >
        <View style={tw`flex-row items-center gap-3`}>
          <View
            style={tw`w-10 h-10 rounded-xl bg-[#0398551A] items-center justify-center`}
          >
            <Feather name="send" size={20} color="#34A853" />
          </View>
          <View>
            <Text style={tw`text-sm text-[#505050] font-Manrope-SemiBold.ttf `}>
              {item.distance}
            </Text>
            <Text
              style={tw`text-[10px] font-Manrope-Medium.ttf text-[#505050] `}
            >
              {item.price}
            </Text>
          </View>
        </View>

        <View style={tw`bg-[#EBF3FF] px-3 py-1.5 rounded-full`}>
          <Text style={tw`text-xs font-Manrope-Regular.ttf text-[#006EED]`}>
            {item.status}
          </Text>
        </View>
      </View>

      {/* Address Timeline Section */}
      <View style={tw`relative pl-8 pt-4 pb-2`}>
        {/* Dashed Line Visual */}
        <View
          style={[
            tw`absolute left-[11px] top-9 bottom-9 border-l-2 border-dashed border-[#FF5C00]`,
            { width: 1 },
          ]}
        />

        {/* Shop Address Row */}
        <View style={tw`relative mb-5`}>
          <View
            style={tw`absolute -left-8 top-0 w-6 h-6 rounded-full border-2 border-[#FF5C00] bg-white items-center justify-center z-10`}
          >
            <View style={tw`w-2.5 h-2.5 rounded-full bg-[#FF5C00]`} />
          </View>
          <Text
            style={tw`text-xs text-[#898989] font-Manrope-Regular.ttf mb-1`}
          >
            Shop Address
          </Text>
          <Text
            style={tw`text-[16px] text-[#1A1A1A] font-Manrope-Regular.ttf `}
          >
            {item.shopAddress}
          </Text>
        </View>

        {/* Swap Icon Badge */}
        <View style={tw`relative my-1 items-end justify-center`}>
          <View
            style={tw`w-full border-t border-gray-100 absolute left-0 right-0`}
          />
          <View
            style={tw`bg-white border border-[#B0B0B0] p-1.5 rounded-lg z-10 shadow-xs`}
          >
            {/* <Ionicons name="swap-vertical" size={16} color="#9CA3AF" /> */}
            <SvgXml xml={swapIcon} width={12} />
          </View>
        </View>

        {/* Delivery Address Row */}
        <View style={tw`relative mt-3 mb-2`}>
          <View style={tw`absolute -left-8 top-0 z-10`}>
            <Ionicons name="location-sharp" size={24} color="#FF5C00" />
          </View>
          <Text
            style={tw`text-xs text-[#898989] font-Manrope-Regular.ttf mb-1`}
          >
            Delivery Address
          </Text>
          <Text
            style={tw`text-[16px] text-[#1A1A1A] font-Manrope-Regular.ttf `}
          >
            {item.deliveryAddress}
          </Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onViewDetails && onViewDetails(item.id)}
        style={tw`bg-[#EFF1E7] rounded-full py-3.5 items-center justify-center mt-3`}
      >
        <Text style={tw`text-sm font-Manrope-Medium.ttf text-[#5B7410]  `}>
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};
