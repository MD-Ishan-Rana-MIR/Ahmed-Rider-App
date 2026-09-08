import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import tw from "twrnc";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { DeliveriApiResponse } from "../../../lib/type/deliveryType";
import { formatCurrency } from "react-native-format-currency";
import Button from "../ui/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Default fallback icon in case swapIcon string is missing
const defaultSwapIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#898989" stroke-width="2"><path d="M7 10l5-5 5 5M17 14l-5 5-5-5"/></svg>`;

interface DeliveryCardProps {
  item: DeliveriApiResponse;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  swapIcon?: string;
  statusUpdateLoading? : boolean
}

/**
 * Individual Request Card Component
 */
export const DeliverCard: React.FC<DeliveryCardProps> = ({
  item,
  onAccept,
  onDecline,
  swapIcon = defaultSwapIcon,
  statusUpdateLoading
}) => {
  return (
    <View style={{ width: SCREEN_WIDTH }}>
      <View style={tw`bg-white p-5 shadow-xl pb-8  `}>
        {/* Top Drag Handle */}
        <View style={tw`w-10 h-1 bg-gray-300 rounded-full self-center mb-3`} />

        {/* Product Info Card */}
        <View>
        {item?.items &&
          item?.items.map((d, i) => (
            <View
              key={i}
              style={tw`flex-row items-center border border-[#EBEBEB] rounded-2xl p-3 bg-white mb-3`}
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
                  style={tw`w-full h-full`}
                  resizeMode="contain"
                />
              </View>

              {/* Item Details */}
              <View style={tw`flex-1 justify-between py-0.5`}>
                <View style={tw`flex-row justify-between items-start`}>
                  <Text
                    style={tw`text-blackText font-medium text-sm font-Manrope-Medium flex-1 mr-2`}
                  >
                    {d?.name}
                  </Text>
                  <Text
                    style={tw`text-sm font-Manrope-SemiBold text-[#F86B17]`}
                  >
                    {
                      formatCurrency({
                        amount: Number(d?.unit_price ?? 0),
                        code: d?.currency ?? "USD",
                      })[0]
                    }
                  </Text>
                </View>

                <View style={tw`flex-row items-center gap-4 my-1.5`}>
                  <Text
                    style={tw`text-[10px] text-[#505050] font-Manrope-Regular`}
                  >
                    Quantity:{" "}
                    <Text
                      style={tw`text-[10px] text-[#505050] font-Manrope-Regular`}
                    >
                      {d?.quantity}
                    </Text>
                  </Text>
                </View>

                <Text
                  style={tw`text-[10px] text-[#505050] font-Manrope-Regular mt-1`}
                >
                  {item?.order_number}
                </Text>
              </View>
            </View>
          ))}
      </View>

        {/* Distance & Earning Row */}
        <View style={tw`flex-row gap-3 mb-4`}>
          {/* Distance */}
          <View
            style={tw`flex-1 bg-white border border-[#EBEBEB] rounded-2xl p-3 flex-row items-center gap-2.5`}
          >
            <View
              style={tw`w-9 h-9 rounded-xl bg-[#FFF2EA] items-center justify-center`}
            >
              <MaterialIcons name="compare-arrows" size={20} color="#FF5C00" />
            </View>
            <View>
              <Text style={tw`text-[10px] text-[#898989]`}>Distance</Text>
              <Text style={tw`text-sm font-semibold text-[#1A1A1A]`}>
                {item?.distance_km}km
              </Text>
            </View>
          </View>

          {/* Earning */}
          <View
            style={tw`flex-1 bg-white border border-[#EBEBEB] rounded-2xl p-3 flex-row items-center gap-2.5`}
          >
            <View
              style={tw`w-9 h-9 rounded-xl bg-[#FFF2EA] items-center justify-center`}
            >
              <Feather name="dollar-sign" size={18} color="#FF5C00" />
            </View>
            <View>
              <Text style={tw`text-[10px] text-[#898989]`}>Earning</Text>
              <Text style={tw`text-sm font-semibold text-[#1A1A1A]`}>
                {
                      formatCurrency({
                        amount: Number(5 ?? 0),
                        code: item?.currency ?? "USD",
                      })[0]
                    }
              </Text>
            </View>
          </View>
        </View>

        {/* Address Timeline */}
        <View style={tw`relative pl-7 pt-1 mb-5`}>
          {/* Dashed Connecting Line */}
          <View
            style={[
              tw`absolute left-[9px] top-4 bottom-5 border-l-2 border-dashed border-[#FF5C00]`,
              { width: 1 },
            ]}
          />

          {/* Shop Address */}
          <View style={tw`relative mb-4`}>
            <View
              style={tw`absolute -left-7 top-0 w-5 h-5 rounded-full border-2 border-[#FF5C00] bg-white items-center justify-center z-10`}
            >
              <View style={tw`w-2 h-2 rounded-full bg-[#FF5C00]`} />
            </View>
            <Text style={tw`text-[#898989] text-xs mb-1`}>Shop Address</Text>
            <Text style={tw`text-[#1A1A1A] text-[16px]`}>
              {item?.pickup?.address}
            </Text>
          </View>

          {/* Route Swap Icon Divider */}
          <View style={tw`relative my-1 items-end justify-center pr-1`}>
            <View
              style={tw`w-full border-t border-gray-100 absolute left-0 right-0`}
            />
            <View
              style={tw`bg-white border border-gray-200 p-1 rounded-md z-10`}
            >
              <SvgXml xml={swapIcon} />
            </View>
          </View>

          {/* Delivery Address */}
          <View style={tw`relative mt-3`}>
            <View style={tw`absolute -left-7 top-0 z-10`}>
              <Ionicons name="location-sharp" size={20} color="#FF5C00" />
            </View>
            <Text style={tw`text-[#898989] text-xs mb-1`}>
              Delivery Address
            </Text>
            <Text style={tw`text-[#1A1A1A] text-[16px]`}>
              {item.dropoff?.address_text}
            </Text>
          </View>
        </View>

        {/* Action Buttons: Decline & Accept */}
        <View style={tw`flex-row justify-between gap-3 mb-4 `}>
          <View></View>
          

          <View style = {tw`w-full`} ><Button text="Accept" onPress={() => onAccept(String(item.id))} /></View>

          {/* <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onAccept(item.id)}
            style={tw`flex-1 bg-[#526D18] py-3 rounded-full items-center justify-center`}
          >
            <Text style={tw`text-white font-medium text-sm`}>Accept</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};
