import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import tw from "twrnc";

import { DeliveryCard } from "@/components/delivery/DeliveryCard";
import { DeliveryCardSkeletonList } from "@/components/skeleton/DeliveryCardSkeleton";
import BackButton from "@/components/ui/BackButton";
import { NotFoundState } from "@/components/ui/NotFound";
import { SegmentedTab } from "@/components/ui/SegmentedTab";
import { useGetAllDeliverQuery } from "@/redux/deliverApi";

export default function DeliveriesScreen() {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [page, setPage] = useState<number>(1);

  // Fetch current tab orders with pagination
  const { data, isLoading, isFetching, refetch } = useGetAllDeliverQuery({
    filter: activeTab === "active" ? "on_the_way" : "delivered",
    page,
    per_page: 10,
  });

  const ordersData = data?.data?.orders;

  const currentPage = ordersData?.current_page ?? 1;
  const lastPage = ordersData?.last_page ?? 1;
  const totalCount = ordersData?.total ?? 0;

  // Handle switching tabs (resets pagination page to 1)
  const handleTabChange = (tab: "active" | "completed") => {
    setActiveTab(tab);
    setPage(1);
  };

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
    <View style={tw`flex-1 w-full bg-white`}>
      <BackButton title="My Deliveries" showBackButton={true} />

      <View style={tw`flex-1 px-4 pt-4`}>
        <SegmentedTab
          activeTab={activeTab}
          activeCount={activeTab === "active" ? totalCount : 0}
          completedCount={activeTab === "completed" ? totalCount : 0}
          onTabChange={handleTabChange}
        />

        {isLoading && page === 1 ? (
          <DeliveryCardSkeletonList count={4} />
        ) : (
          <FlatList
            data={data?.data?.orders?.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DeliveryCard item={item} />}
            ListEmptyComponent={
              <NotFoundState
                title={`No ${activeTab === "active" ? "Active" : "Completed"} Orders`}
                message={`No ${activeTab === "active" ? "on_the_way" : "delivered"} deliveries.`}
              />
            }
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
