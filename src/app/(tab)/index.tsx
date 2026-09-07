<<<<<<< HEAD
import { useRiderProfileQuery } from "@/redux/authApi";
=======
>>>>>>> 258797aece8b55655cc79cc9b4bd96e62e2e4fbf
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";
import {
  notificationIcon,
  oflineIcon,
  onlineIcon,
  swapIcon,
} from "../../../lib/icon";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface DeliveryRequest {
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

const MOCK_ORDERS: DeliveryRequest[] = [
  {
    id: "ord_1",
    title: "Classic Black Blazer",
    size: "M",
    quantity: 2,
    orderId: "#ORD-10421",
    price: "$656",
    imageUri:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80",
    distance: "3.2 km",
    earning: "$12.50",
    shopAddress: "Street Side Road, Tripoli, Libya",
    deliveryAddress: "1901 Thornridge Road, Tripoli, Libya",
  },
  {
    id: "ord_2",
    title: "Casual Leather Jacket",
    size: "L",
    quantity: 1,
    orderId: "#ORD-10422",
    price: "$320",
    imageUri:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80",
    distance: "1.5 km",
    earning: "$8.00",
    shopAddress: "Central Market, Tripoli, Libya",
    deliveryAddress: "882 Omar Al-Mokhtar St, Tripoli, Libya",
  },
  {
    id: "ord_3",
    title: "Slim Fit Cotton Hoodie",
    size: "XL",
    quantity: 3,
    orderId: "#ORD-10423",
    price: "$145",
    imageUri:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80",
    distance: "5.0 km",
    earning: "$16.20",
    shopAddress: "City Center Mall, Tripoli, Libya",
    deliveryAddress: "404 Garden Avenue, Tripoli, Libya",
  },
];

export default function RiderHomeScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [requests, setRequests] = useState<DeliveryRequest[]>(MOCK_ORDERS);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccept = (id: string) => {
<<<<<<< HEAD
=======
    console.log("Order Accepted:", id);
>>>>>>> 258797aece8b55655cc79cc9b4bd96e62e2e4fbf
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDecline = (id: string) => {
<<<<<<< HEAD
=======
    console.log("Order Declined:", id);
>>>>>>> 258797aece8b55655cc79cc9b4bd96e62e2e4fbf
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const count = 4;
<<<<<<< HEAD

  const { data, isLoading: profileLoading } = useRiderProfileQuery({});
=======
>>>>>>> 258797aece8b55655cc79cc9b4bd96e62e2e4fbf

  return (
    <View style={tw`flex-1 `}>
      <View style={tw`bg-[#5B7410] px-5 pb-4 pt-6 rounded-b-[12px]  `}>
        <View style={tw`flex-row items-center justify-between mt-3`}>
          <View>
            <Text
              style={tw`text-[#FFFFFF] font-Manrope-SemiBold.ttf text-[16px] mt-2  `}
            >
<<<<<<< HEAD
              {data?.data?.name}
            </Text>
            {/* <Text
              style={tw`mt-1 font-Manrope-Regular.ttf text-[10px] text-white `}
            >
              Tuesday, December 26
            </Text> */}
            <Text
              style={tw`mt-1 font-Manrope-Regular.ttf text-[10px] text-white `}
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
=======
              Hi, Abdur Rahman
            </Text>
            <Text
              style={tw`mt-1 font-Manrope-Regular.ttf text-[10px] text-white `}
            >
              Tuesday, December 26
>>>>>>> 258797aece8b55655cc79cc9b4bd96e62e2e4fbf
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/notification")}
            activeOpacity={0.7}
            style={tw`relative w-8 h-8 bg-[#F4F4F4] rounded-full items-center justify-center`}
          >
            <SvgXml xml={notificationIcon} width={18} height={18} />

            {/* Notification Badge */}
            {count > 0 && (
              <View
                style={tw`absolute -top-1 -right-1 bg-red-500 min-w-[18px] h-[18px] rounded-full items-center justify-center px-1 border-2 border-white`}
              >
                <Text style={tw`text-white text-[9px] font-bold text-center`}>
                  {count > 99 ? "99+" : count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-1 bg-white relative `}>
        {/* 1. Full-Screen Google Map Background */}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: 32.8872,
            longitude: 13.1913,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        />

        {/* 2. Top Floating Online / Offline Switcher Bar */}
        <View style={tw`absolute top-5 left-4 right-4 z-20  `}>
          <View
            style={tw`bg-white rounded-full p-2.5 px-4 flex-row items-center justify-between shadow-lg border border-gray-100`}
          >
            <View style={tw`flex-row items-center gap-3 flex-1`}>
              {/* Sun / Online Icon Container */}
              <View
                style={tw`w-11 h-11 rounded-full bg-[#E6F4FE] items-center justify-center`}
              >
                {isOnline ? (
                  <>
                    <SvgXml xml={onlineIcon} />
                  </>
                ) : (
                  <>
                    <SvgXml xml={oflineIcon} />
                  </>
                )}
              </View>
              <View style={tw`flex-1`}>
                <Text
                  style={tw`font-Manrope-Medium.ttf text-lg text-[#1A1A1A]`}
                >
                  {isOnline ? "Online" : "Offline"}
                </Text>
                <Text
                  style={tw`text-xs text-[#898989] font-Manrope-Regular.ttf`}
                  numberOfLines={1}
                >
                  {isOnline
                    ? "Looking for deliveries nearby..."
                    : "Go online to receive orders"}
                </Text>
              </View>
            </View>

            {/* Toggle Switch */}
            <Switch
              trackColor={{ false: "#E5E7EB", true: "#FF5C00" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E7EB"
              onValueChange={setIsOnline}
              value={isOnline}
            />
          </View>
        </View>

        {/* 3. Bottom Delivery Request Sheet for Multiple Orders */}
        {isOnline && requests.length > 0 && (
          <View
            style={tw`absolute  bottom-20 left-0 right-0 z-30 bg-white    `}
          >
            {/* Top Stack visual layer for multiple cards */}
            {requests.length > 1 && <></>}

            {/* Main Card Header (Count & Pagination Dots) */}
            <View
              style={tw` rounded-t-3xl pt-3 px-5 flex-row items-center justify-between border-t border-gray-100`}
            >
              <Text
                style={tw`font-Manrope-Medium.ttf text-[16px] text-[#484848]`}
              >
                Delivery Requests ({requests.length})
              </Text>

              {requests.length > 1 && (
                <View style={tw`flex-row gap-1.5 items-center`}>
                  {requests.map((_, index) => (
                    <View
                      key={index}
                      style={tw`h-2 rounded-full ${
                        index === activeIndex
                          ? "w-5 bg-[#FF5C00]"
                          : "w-2 bg-gray-200"
                      }`}
                    />
                  ))}
                </View>
              )}
            </View>

            {/* Horizontal Swiper for Multiple Orders */}
            <FlatList
              data={requests}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              onMomentumScrollEnd={(e) => {
                const newIndex = Math.round(
                  e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
                );
                setActiveIndex(newIndex);
              }}
              renderItem={({ item }) => (
                <View style={{ width: SCREEN_WIDTH }}>
                  <View style={tw`bg-white p-5 shadow-2xl  pb-8`}>
                    {/* Top Drag Handle */}
                    <View
                      style={tw`w-10 h-1 bg-gray-300 rounded-full self-center mb-3`}
                    />

                    {/* Product Info Card */}
                    <View
                      style={tw`bg-white border border-[#EBEBEB] rounded-2xl p-3 flex-row items-center justify-between mb-3 shadow-xs`}
                    >
                      <View style={tw`flex-row items-center gap-3 flex-1`}>
                        <Image
                          source={{ uri: item.imageUri }}
                          style={tw`w-16 h-16 rounded-xl bg-[#F3F3F3]`}
                          resizeMode="cover"
                        />
                        <View style={tw`flex-1 `}>
                          <View
                            style={tw`flex-row items-center justify-between`}
                          >
                            <Text
                              style={tw`text-sm text-blackText font-Manrope-Medium.ttf mb-1`}
                            >
                              {item.title}
                            </Text>
                            <Text
                              style={tw`text-sm font-Manrope-SemiBold.ttf  text-[#FF5C00] `}
                            >
                              {item.price}
                            </Text>
                          </View>
                          <View
                            style={tw` flex-row items-center gap-x-8 mb-2 `}
                          >
                            <Text
                              style={tw`text-[10px] [#505050] font-Manrope-Regular.ttf   `}
                            >
                              Size: {item.size}
                            </Text>

                            <Text
                              style={tw`text-[10px] [#505050] font-Manrope-Regular.ttf   `}
                            >
                              Quantity: {item.quantity}
                            </Text>
                          </View>
                          <Text
                            style={tw`text-[10px] [#505050] font-Manrope-Regular.ttf   `}
                          >
                            {item.orderId}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Distance & Earning Row */}
                    <View style={tw`flex-row gap-3 mb-4`}>
                      <View
                        style={tw`flex-1 bg-white border border-[#EBEBEB] rounded-2xl p-3 flex-row items-center gap-2.5`}
                      >
                        <View
                          style={tw`w-9 h-9 rounded-xl bg-[#FFF2EA] items-center justify-center`}
                        >
                          <MaterialIcons
                            name="compare-arrows"
                            size={20}
                            color="#FF5C00"
                          />
                        </View>
                        <View>
                          <Text
                            style={tw`text-[10px] text-[#898989] font-Manrope-Regular.ttf  `}
                          >
                            Distance
                          </Text>
                          <Text
                            style={tw` text-sm font-Manrope-SemiBold.ttf text-[#1A1A1A] `}
                          >
                            {item.distance}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={tw`flex-1 bg-white border border-[#EBEBEB] rounded-2xl p-3 flex-row items-center gap-2.5`}
                      >
                        <View
                          style={tw`w-9 h-9 rounded-xl bg-[#FFF2EA] items-center justify-center`}
                        >
                          <Feather
                            name="dollar-sign"
                            size={18}
                            color="#FF5C00"
                          />
                        </View>
                        <View>
                          <Text
                            style={tw`text-[10px] text-[#898989] font-Manrope-Regular.ttf  `}
                          >
                            Earning
                          </Text>
                          <Text
                            style={tw` text-sm font-Manrope-SemiBold.ttf text-[#1A1A1A] `}
                          >
                            {item.earning}
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
                        <Text
                          style={tw`text-[#898989] text-xs font-Manrope-Regular.ttf mb-1 `}
                        >
                          Shop Address
                        </Text>
                        <Text
                          style={tw` text-[#1A1A1A] font-Manrope-Regular.ttf text-[16px] `}
                        >
                          {item.shopAddress}
                        </Text>
                      </View>

                      <View
                        style={tw`relative my-1 items-end justify-center pr-1`}
                      >
                        <View
                          style={tw`w-full border-t border-gray-100 absolute left-0 right-0`}
                        />
                        <View
                          style={tw`bg-white border border-gray-200 p-1 rounded-md z-10`}
                        >
                          <SvgXml xml={swapIcon} />
                        </View>
                      </View>

                      <View style={tw`relative mt-3`}>
                        <View style={tw`absolute -left-7 top-0 z-10`}>
                          <Ionicons
                            name="location-sharp"
                            size={20}
                            color="#FF5C00"
                          />
                        </View>
                        <Text
                          style={tw`text-[#898989] text-xs font-Manrope-Regular.ttf mb-1 `}
                        >
                          Delivery Address
                        </Text>
                        <Text
                          style={tw` text-[#1A1A1A] font-Manrope-Regular.ttf text-[16px] `}
                        >
                          {item.deliveryAddress}
                        </Text>
                      </View>
                    </View>

                    {/* Action Buttons: Decline & Accept */}
                    <View style={tw`flex-row gap-3`}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleDecline(item.id)}
                        style={tw`flex-1 bg-[#F5F5F3] py-3 rounded-full items-center justify-center`}
                      >
                        <Text
                          style={tw`text-[#1A1A1A] font-Manrope-Medium.ttf text-sm `}
                        >
                          Decline
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => handleAccept(item.id)}
                        style={tw`flex-1 bg-[#526D18] py-3 rounded-full items-center justify-center shadow-xs`}
                      >
                        <Text
                          style={tw`text-[#fff] font-Manrope-Medium.ttf text-sm `}
                        >
                          Accept
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}
