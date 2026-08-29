import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export interface DeliveryRequestData {
  id: string;
  title: string;
  size: string;
  quantity: number;
  orderId: string;
  price: string;
  imageUri: string;
  distance: string;
  earning: string;
  shopAddress: string;
  deliveryAddress: string;
}

interface DeliveryRequestCardProps {
  request: DeliveryRequestData;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export const DeliveryRequestCard: React.FC<DeliveryRequestCardProps> = ({
  request,
  onAccept,
  onDecline,
}) => {
  return (
    <View
      style={tw`bg-white rounded-t-3xl p-5 shadow-2xl border-t border-gray-100 pb-8`}
    >
      {/* Top Drag Handle */}
      <View style={tw`w-10 h-1 bg-gray-300 rounded-full self-center mb-3`} />

      {/* Product Info Card */}
      <View
        style={tw`bg-white border border-gray-100 rounded-2xl p-3 flex-row items-center justify-between mb-3 shadow-xs`}
      >
        <View style={tw`flex-row items-center gap-3 flex-1`}>
          <Image
            source={{ uri: request.imageUri }}
            style={tw`w-16 h-16 rounded-xl bg-gray-100`}
            resizeMode="cover"
          />
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-bold text-gray-900 mb-0.5`}>
              {request.title}
            </Text>
            <Text style={tw`text-xs text-gray-400 font-medium mb-1`}>
              Size: {request.size} Quantity: {request.quantity}
            </Text>
            <Text style={tw`text-[11px] text-gray-400 font-medium`}>
              {request.orderId}
            </Text>
          </View>
        </View>
        <Text style={tw`text-base font-bold text-[#FF5C00] ml-2`}>
          {request.price}
        </Text>
      </View>

      {/* Distance & Earning Row */}
      <View style={tw`flex-row gap-3 mb-4`}>
        <View
          style={tw`flex-1 bg-white border border-gray-100 rounded-2xl p-3 flex-row items-center gap-2.5`}
        >
          <View
            style={tw`w-9 h-9 rounded-xl bg-[#FFF2EA] items-center justify-center`}
          >
            <MaterialIcons name="compare-arrows" size={20} color="#FF5C00" />
          </View>
          <View>
            <Text style={tw`text-[11px] text-gray-400 font-medium`}>
              Distance
            </Text>
            <Text style={tw`text-sm font-bold text-gray-900`}>
              {request.distance}
            </Text>
          </View>
        </View>

        <View
          style={tw`flex-1 bg-white border border-gray-100 rounded-2xl p-3 flex-row items-center gap-2.5`}
        >
          <View
            style={tw`w-9 h-9 rounded-xl bg-[#FFF2EA] items-center justify-center`}
          >
            <Feather name="dollar-sign" size={18} color="#FF5C00" />
          </View>
          <View>
            <Text style={tw`text-[11px] text-gray-400 font-medium`}>
              Earning
            </Text>
            <Text style={tw`text-sm font-bold text-gray-900`}>
              {request.earning}
            </Text>
          </View>
        </View>
      </View>

      {/* Address Timeline */}
      <View style={tw`relative pl-7 pt-1 mb-5`}>
        <View
          style={[
            tw`absolute left-[9px] top-4 bottom-5 border-l-2 border-dashed border-[#FF5C00]`,
            { width: 1 },
          ]}
        />

        <View style={tw`relative mb-4`}>
          <View
            style={tw`absolute -left-7 top-0 w-5 h-5 rounded-full border-2 border-[#FF5C00] bg-white items-center justify-center z-10`}
          >
            <View style={tw`w-2 h-2 rounded-full bg-[#FF5C00]`} />
          </View>
          <Text style={tw`text-xs text-gray-400 font-medium mb-0.5`}>
            Shop Address
          </Text>
          <Text style={tw`text-sm font-semibold text-gray-900`}>
            {request.shopAddress}
          </Text>
        </View>

        <View style={tw`relative my-1 items-end justify-center pr-1`}>
          <View
            style={tw`w-full border-t border-gray-100 absolute left-0 right-0`}
          />
          <View style={tw`bg-white border border-gray-200 p-1 rounded-md z-10`}>
            <Ionicons name="swap-vertical" size={14} color="#9CA3AF" />
          </View>
        </View>

        <View style={tw`relative mt-3`}>
          <View style={tw`absolute -left-7 top-0 z-10`}>
            <Ionicons name="location-sharp" size={20} color="#FF5C00" />
          </View>
          <Text style={tw`text-xs text-gray-400 font-medium mb-0.5`}>
            Delivery Address
          </Text>
          <Text style={tw`text-sm font-semibold text-gray-900`}>
            {request.deliveryAddress}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={tw`flex-row gap-3`}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onDecline(request.id)}
          style={tw`flex-1 bg-[#F5F5F3] py-3.5 rounded-full items-center justify-center`}
        >
          <Text style={tw`text-gray-900 font-bold text-base`}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onAccept(request.id)}
          style={tw`flex-1 bg-[#526D18] py-3.5 rounded-full items-center justify-center shadow-xs`}
        >
          <Text style={tw`text-white font-bold text-base`}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
