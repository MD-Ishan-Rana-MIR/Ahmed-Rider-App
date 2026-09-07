import { RecentDeliveryCard } from "@/components/recent-delivery/RecentDeliveryCard";
import { DeliveryCardSkeletonList } from "@/components/skeleton/DeliveryCardSkeleton";
import BackButton from "@/components/ui/BackButton";
import { NotFoundState } from "@/components/ui/NotFound";
import PayoutCard from "@/components/ui/PayoutCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useRiderProfileQuery } from "@/redux/authApi";
import { useGetAllDeliverQuery } from "@/redux/deliverApi";
import { useGetWallectDashboardQuery } from "@/redux/walletApi";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { SvgXml } from "react-native-svg";
import { deliver, thisWeek, today } from "../../../lib/icon";
import tw from "../../../lib/tailwind";

export default function Wallet() {
  const onViewAll = () => {
    router.push("/recent-delivery");
  };

  const { data } = useGetWallectDashboardQuery({});

  const { data: profileData } = useRiderProfileQuery({});

  const [page, setPage] = useState<number>(1);

  // Fetch current tab orders with pagination
  const {
    data: resendDelivery,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllDeliverQuery({
    filter: "delivered",
    page,
    per_page: 10,
  });

  const ordersData = resendDelivery?.data?.orders;

  const currentPage = ordersData?.current_page ?? 1;
  const lastPage = ordersData?.last_page ?? 1;

  // Pagination handler for infinite scroll
  const handleLoadMore = () => {
    if (!isFetching && currentPage < lastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Pull-to-refresh handler
  const handleRefresh = async () => {
    if (page === 1) {
      await refetch();
    } else {
      setPage(1);
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header Back Button */}
      <View style={tw``}>
        <BackButton title="Wallet" showBackButton={false} />
      </View>

      <View style={tw`px-5 mt-4`}>
        {/* Payout Banner */}
        <PayoutCard />

        {/* Quick Stats Grid */}
        <View style={tw`mt-5 flex-row justify-between gap-x-2.5`}>
          {/* Stat Item 1 */}
          <View
            style={tw`flex-1 border border-[#F3F3F3] py-3 px-2 rounded-[12px] justify-center bg-white shadow-xs`}
          >
            <View style={tw`flex flex-row items-center justify-between`}>
              <Text
                style={tw`text-[10px] font-medium mb-1 text-gray-500`}
                numberOfLines={1}
              >
                Today
              </Text>
              <SvgXml xml={today} />
            </View>
            <Text style={tw`text-[#5A7314] text-lg font-bold`}>
              {
                formatCurrency({
                  amount: Number(data?.data?.today_earning ?? 0),
                  code: profileData?.data?.rider_profile?.currency ?? "USD",
                })[0]
              }
            </Text>
          </View>

          {/* Stat Item 2 */}
          <View
            style={tw`flex-1 border border-[#F3F3F3] py-3 px-2 rounded-[12px] justify-center bg-white shadow-xs`}
          >
            <View style={tw`flex flex-row items-center justify-between`}>
              <Text
                style={tw`text-[10px] font-medium mb-1 text-gray-500`}
                numberOfLines={1}
              >
                This week
              </Text>
              <SvgXml xml={thisWeek} />
            </View>
            <Text style={tw`text-[#5A7314] text-lg font-bold`}>
              {
                formatCurrency({
                  amount: Number(data?.data?.this_week_earnings ?? 0),
                  code: profileData?.data?.rider_profile?.currency,
                })[0]
              }
            </Text>
          </View>

          {/* Stat Item 3 */}
          <View
            style={tw`flex-1 border border-[#F3F3F3] py-3 px-2 rounded-[12px] justify-center bg-white shadow-xs`}
          >
            <View style={tw`flex flex-row items-center justify-between`}>
              <Text
                style={tw`text-[10px] font-medium mb-1 text-gray-500`}
                numberOfLines={1}
              >
                Deliveries
              </Text>
              <SvgXml xml={deliver} />
            </View>
            <Text style={tw`text-[#5A7314] text-lg font-bold`}>
              {
                formatCurrency({
                  amount: Number(data?.data?.deliveries ?? 0),
                  code: profileData?.data?.rider_profile?.currency,
                })[0]
              }
            </Text>
          </View>
        </View>
      </View>

      {/* Section Header */}
      <View style={tw`mt-5 mb-2`}>
        <SectionHeader
          title="Recent Delivery"
          onViewAll={onViewAll}
          isShowView={true}
        />
      </View>

      <View style={tw`flex-1  px-5 pt-2`}>
        {isLoading && page === 1 ? (
          <DeliveryCardSkeletonList count={4} />
        ) : (
          <FlatList
            data={ordersData?.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RecentDeliveryCard item={item} />}
            ListEmptyComponent={<NotFoundState />}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={isFetching && page === 1}
                onRefresh={handleRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
