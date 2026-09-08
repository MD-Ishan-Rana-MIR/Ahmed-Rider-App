import { useRiderProfileQuery } from "@/redux/authApi";
import { router } from "expo-router";
import React, { Key, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
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
import { DeliverCard } from "../../components/dashboard/DeliverCard";
import { NotFoundState } from "../../components/ui/NotFound";
import {
  useDeliveryStatusUpdateMutation,
  useGetAllDeliverQuery,
} from "../../redux/deliverApi";
import { successMsg } from "../../../lib/successMsg";
import { errorMsg } from "../../../lib/errorMessage";
import { useGetNotificationsQuery } from "../../redux/riderNotificationApi";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function RiderHomeScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState<number>(1);

  const count = 4;

  const { data } = useRiderProfileQuery({});

  const {
    data: commingOrder,
    isFetching,
    refetch,
  } = useGetAllDeliverQuery({
    filter: "ready_for_pickup",
    page,
    per_page: 10,
  });

  const ordersData = commingOrder?.data?.orders;
  const currentPage = ordersData?.current_page ?? 1;
  const lastPage = ordersData?.last_page ?? 1;
  const totalCount = ordersData?.total ?? 0;
  const ordersList = ordersData?.data ?? [];

  const [deliveryStatusUpdate, { isLoading: statusUpdateLoading }] =
    useDeliveryStatusUpdateMutation();

  const handleAccept = (id: string) => {
    Alert.alert(
      "Confirm Action",
      `Are you sure you want to mark this order as "${"Accepted".replace(/_/g, " ")}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const payload = {
                status: "accepted",
              };
              const res = await deliveryStatusUpdate({
                id,
                payload,
              }).unwrap();
              if (res) {
                successMsg(res?.message || "Status updated successfully!");
              }
            } catch (error) {
              console.log("err", error);
              const errorMessage =
                error && typeof error === "object" && "data" in error
                  ? ((error as { data?: { message?: string } }).data?.message ??
                    String(error))
                  : error instanceof Error
                    ? error.message
                    : String(error);

              errorMsg(errorMessage);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleDecline = (id: string) => {
    console.log("Order Declined:", id);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(newIndex);
  };

  const handleLoadMore = () => {
    if (!isFetching && currentPage < lastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = async () => {
    if (page === 1) {
      await refetch();
    } else {
      setPage(1);
    }
  };

  const currentDateFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const { data: notification } = useGetNotificationsQuery({
    page,
    per_page: 1000000005,
  });

  const unreadCount = notification?.unread_count ?? 0;

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* 1. Header Bar */}
      <View style={tw`bg-[#5B7410] px-5 pb-4 pt-12 rounded-b-[12px] z-20`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View>
            <Text style={tw`text-white font-semibold text-[16px]`}>
              {data?.data?.name ?? "Rider"}
            </Text>
            <Text style={tw`mt-1 text-[10px] text-white opacity-90`}>
              {currentDateFormatted}
            </Text>
          </View>

          <>
            {unreadCount > 0 ? (
              <>
                <TouchableOpacity
                  onPress={() => router.push("/notification")}
                  activeOpacity={0.7}
                  style={tw`relative w-8 h-8 bg-[#F4F4F4] rounded-full items-center justify-center`}
                >
                  <SvgXml xml={notificationIcon} width={18} height={18} />
                  {count > 0 && (
                    <View
                      style={tw`absolute -top-1 -right-1 bg-red-500 min-w-[18px] h-[18px] rounded-full items-center justify-center px-1 border-2 border-white`}
                    >
                      <Text
                        style={tw`text-white text-[9px] font-bold text-center`}
                      >
                        {unreadCount}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => router.push("/notification")}
                  activeOpacity={0.7}
                  style={tw`relative w-8 h-8 bg-[#F4F4F4] rounded-full items-center justify-center`}
                >
                  <SvgXml xml={notificationIcon} width={18} height={18} />
                </TouchableOpacity>
              </>
            )}
          </>
        </View>
      </View>

      {/* Main Full-Screen Scrollable Container */}
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-grow  `}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && page === 1}
            onRefresh={handleRefresh}
          />
        }
      >
        {/* 2. Map & Toggle Bar Section */}
        <View style={tw`h-full`}>
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

          {/* Floating Toggle Bar */}
          <View style={tw`absolute top-5 left-4 right-4 z-20`}>
            <View
              style={tw`bg-white rounded-full p-2.5 px-4 flex-row items-center justify-between shadow-lg border border-gray-100`}
            >
              <View style={tw`flex-row items-center gap-3 flex-1`}>
                <View
                  style={tw`w-11 h-11 rounded-full bg-[#E6F4FE] items-center justify-center`}
                >
                  <SvgXml xml={isOnline ? onlineIcon : oflineIcon} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`font-medium text-lg text-[#1A1A1A]`}>
                    {isOnline ? "Online" : "Offline"}
                  </Text>
                  <Text style={tw`text-xs text-[#898989]`} numberOfLines={1}>
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
                onValueChange={setIsOnline}
                value={isOnline}
              />
            </View>
          </View>
        </View>

        {/* 3. Delivery Requests Card Section */}
        {isOnline && totalCount > 0 && (
          <View
            style={tw`bg-white rounded-t-3xl border-t border-gray-100 pt-3 pb-4 -mt-4 absolute top-28  `}
          >
            <View style={tw`px-5 flex-row items-center justify-between pb-3`}>
              <Text style={tw`font-medium text-[16px] text-[#484848]`}>
                Delivery Requests ({totalCount})
              </Text>

              {totalCount > 1 && (
                <View style={tw`flex-row gap-1.5 items-center`}>
                  {ordersList.map((_: any, index: Key | null | undefined) => (
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

            <FlatList
              data={ordersList}
              horizontal
              pagingEnabled
              scrollEnabled
              nestedScrollEnabled={true}
              snapToAlignment="center"
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) =>
                item?.id?.toString() ?? index.toString()
              }
              onMomentumScrollEnd={handleScroll}
              getItemLayout={(_, index) => ({
                length: SCREEN_WIDTH,
                offset: SCREEN_WIDTH * index,
                index,
              })}
              renderItem={({ item }) => (
                <View style={{ width: SCREEN_WIDTH, alignItems: "center" }}>
                  <DeliverCard
                    item={item}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                    swapIcon={swapIcon}
                    statusUpdateLoading={statusUpdateLoading}
                  />
                </View>
              )}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={<NotFoundState />}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
