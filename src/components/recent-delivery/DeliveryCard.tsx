import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import tw from "twrnc";

export interface OrderItem {
  id: string;
  title: string;
  size: string;
  quantity: number;
  orderNumber: string;
  price: string;
  imageUri: string;
  shopAddress: string;
  deliveryAddress: string;
  distance: string;
}

interface OrderItemCardProps {
  item: OrderItem;
}

export const DeliveryCard: React.FC<OrderItemCardProps> = ({ item }) => {
  return (
    <View
      style={tw`bg-white rounded-2xl border border-gray-100 p-4 shadow-sm my-2`}
    >
      {/* 1. Product Summary Box */}
      <View
        style={tw`flex-row items-center border border-gray-100 rounded-2xl p-3 bg-white mb-4`}
      >
        {/* Thumbnail Image Container */}
        <View
          style={tw`w-16 h-16 bg-[#F3F4F6] rounded-xl justify-center items-center overflow-hidden mr-3`}
        >
          <Image
            source={{ uri: item.imageUri }}
            style={tw`w-14 h-14`}
            resizeMode="contain"
          />
        </View>

        {/* Item Details */}
        <View style={tw`flex-1 justify-between py-0.5`}>
          <View style={tw`flex-row justify-between items-start`}>
            <Text style={tw`text-base font-semibold text-gray-900 flex-1 mr-2`}>
              {item.title}
            </Text>
            <Text style={tw`text-base font-bold text-[#FF5C00]`}>
              {item.price}
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-4 my-1`}>
            <Text style={tw`text-xs text-gray-500`}>
              Size:{" "}
              <Text style={tw`text-gray-800 font-medium`}>{item.size}</Text>
            </Text>
            <Text style={tw`text-xs text-gray-500`}>
              Quantity:{" "}
              <Text style={tw`text-gray-800 font-medium`}>{item.quantity}</Text>
            </Text>
          </View>

          <Text style={tw`text-xs text-gray-400 font-medium`}>
            #{item.orderNumber}
          </Text>
        </View>
      </View>

      {/* 2. Addresses Section with Timeline/Route Visual */}
      <View style={tw`relative pl-8 pt-1`}>
        {/* Dashed Line Connection */}
        <View
          style={[
            tw`absolute left-[11px] top-6 bottom-6 border-l-2 border-dashed border-[#FF5C00]`,
            { width: 1 },
          ]}
        />

        {/* Shop Address Row */}
        <View style={tw`relative mb-5`}>
          {/* Shop Ring Icon */}
          <View
            style={tw`absolute -left-8 top-0 w-6 h-6 rounded-full border-2 border-[#FF5C00] bg-white items-center justify-center z-10`}
          >
            <View style={tw`w-2.5 h-2.5 rounded-full bg-[#FF5C00]`} />
          </View>

          <Text style={tw`text-xs text-gray-400 font-medium mb-1`}>
            Shop Address
          </Text>
          <Text style={tw`text-base font-semibold text-gray-900`}>
            {item.shopAddress}
          </Text>
        </View>

        {/* Divider with Distance Pill */}
        <View style={tw`relative my-2 items-end justify-center`}>
          <View
            style={tw`w-full border-t border-gray-100 absolute left-0 right-0`}
          />
          <View style={tw`bg-[#F2F5EB] px-3 py-1 rounded-lg z-10`}>
            <Text style={tw`text-xs font-semibold text-[#6B8E23]`}>
              {item.distance}
            </Text>
          </View>
        </View>

        {/* Delivery Address Row */}
        <View style={tw`relative mt-3`}>
          {/* Delivery Pin Icon */}
          <View style={tw`absolute -left-8 top-0 z-10`}>
            <Ionicons name="location-sharp" size={24} color="#FF5C00" />
          </View>

          <Text style={tw`text-xs text-gray-400 font-medium mb-1`}>
            Delivery Address
          </Text>
          <Text style={tw`text-base font-semibold text-gray-900`}>
            {item.deliveryAddress}
          </Text>
        </View>
      </View>
    </View>
  );
};
