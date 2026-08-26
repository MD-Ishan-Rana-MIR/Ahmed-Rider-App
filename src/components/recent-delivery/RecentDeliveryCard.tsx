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

export const RecentDeliveryCard: React.FC<OrderItemCardProps> = ({ item }) => {
  return (
    <View
      style={tw`bg-white rounded-2xl border border-[#EBEBEB] py-4 px-3 shadow-sm my-2`}
    >
      {/* 1. Product Summary Box */}
      <View
        style={tw`flex-row items-center border border-[#EBEBEB] rounded-2xl p-3 bg-[] mb-3`}
      >
        {/* Thumbnail Image Container */}
        <View
          style={tw`w-19.5 h-19.5 p-0.5 bg-[#F3F3F3] rounded-xl justify-center items-center overflow-hidden mr-3`}
        >
          <Image
            source={require("../../../assets/product/product.png")}
            style={tw` w-full p-2`}
            resizeMode="contain"
          />
        </View>

        {/* Item Details */}
        <View style={tw`flex-1 justify-between py-0.5`}>
          <View style={tw`flex-row justify-between items-start`}>
            <Text
              style={tw` text-blackText font-medium text-sm font-Manrope-Medium.ttf  flex-1 mr-2`}
            >
              {item.title}
            </Text>
            <Text style={tw`text-sm font-Manrope-SemiBold.ttf text-[#F86B17]`}>
              {item.price}
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-4 my-1.5`}>
            <Text
              style={tw`text-[10px] text-[#505050] font-Manrope-Regular.ttf `}
            >
              Size:{" "}
              <Text
                style={tw`text-[10px] text-[#505050] font-Manrope-Regular.ttf `}
              >
                {item.size}
              </Text>
            </Text>
            <Text
              style={tw`text-[10px] text-[#505050] font-Manrope-Regular.ttf `}
            >
              Quantity:{" "}
              <Text
                style={tw`text-[10px] text-[#505050] font-Manrope-Regular.ttf `}
              >
                {item.quantity}
              </Text>
            </Text>
          </View>

          <Text
            style={tw`text-[10px] text-[#505050] font-Manrope-Regular.ttf mt-2`}
          >
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
    </View>
  );
};
