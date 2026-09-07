import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import tw from "twrnc";
import { DeliveriApiResponse } from "../../../lib/type/deliveryType";

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
  order_number: string;
}

interface OrderItemCardProps {
  item: OrderItem;
}

interface RecentDeliveryCardProps {
  item: DeliveriApiResponse;
}

export const RecentDeliveryCard: React.FC<RecentDeliveryCardProps> = ({
  item,
}) => {
  return (
    <View
      style={tw`bg-white rounded-2xl border border-[#EBEBEB] py-4 px-3 shadow-sm my-2`}
    >
      {/* 1. Product Summary Box */}
      {item?.items &&
        item?.items.map((d, i) => {
          return (
            <View
              key={i}
              style={tw`flex-row items-center border border-[#EBEBEB] rounded-2xl p-3 bg-[] mb-3`}
            >
              {/* Thumbnail Image Container */}
              <View
                style={tw`w-19.5 h-19.5 p-0.5 bg-[#F3F3F3] rounded-xl justify-center items-center overflow-hidden mr-3`}
              >
                <Image
                  source={
                    d?.image
                      ? { uri: d.image }
                      : require("../../../assets/product/product.png")
                  }
                  style={tw`w-full h-40 p-2`}
                  resizeMode="contain"
                />
              </View>

              {/* Item Details */}
              <View style={tw`flex-1 justify-between py-0.5`}>
                <View style={tw`flex-row justify-between items-start`}>
                  <Text
                    style={tw` text-blackText font-medium text-sm font-Manrope-Medium.ttf  flex-1 mr-2`}
                  >
                    {d?.name}
                  </Text>
                  <Text
                    style={tw`text-sm font-Manrope-SemiBold.ttf text-[#F86B17]`}
                  >
                    {
                      formatCurrency({
                        amount: Number(d?.unit_price ?? 0),
                        code: d?.currency ?? "",
                      })[0]
                    }
                  </Text>
                </View>

                <View style={tw`flex-row items-center gap-4 my-1.5`}>
                  {/* <Text
                    style={tw`text-[10px] text-[#505050] font-Manrope-Regular.ttf `}
                  >
                    Size:
                    <Text
                      style={tw`text-[10px] text-[#505050] font-Manrope-Regular.ttf `}
                    >
                      {item.size}
                    </Text>
                  </Text> */}
                  <Text
                    style={tw`text-[10px] text-[#505050] font-Manrope-Regular.ttf `}
                  >
                    Quantity:
                    <Text
                      style={tw`text-[10px] text-[#505050] font-Manrope-Regular.ttf `}
                    >
                      {d?.quantity}
                    </Text>
                  </Text>
                </View>

                <Text
                  style={tw`text-[10px] text-[#505050] font-Manrope-Regular.ttf mt-2`}
                >
                  {item?.order_number}
                </Text>
              </View>
            </View>
          );
        })}

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
            {item.pickup?.address}
          </Text>
        </View>

        {/* Divider with Distance Pill */}
        <View style={tw`relative my-2 items-end justify-center`}>
          <View
            style={tw`w-full border-t border-gray-100 absolute left-0 right-0`}
          />
          <View style={tw`bg-[#F2F5EB] px-3 py-1 rounded-lg z-10`}>
            <Text style={tw`text-xs font-semibold text-[#6B8E23]`}>
              {item.distance_km} km
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
            {item?.dropoff?.address_text}
          </Text>
        </View>
      </View>
    </View>
  );
};
