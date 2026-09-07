import {
  OrderItem,
  RecentDeliveryCard,
} from "@/components/recent-delivery/RecentDeliveryCard";
import { DeliveryCardSkeletonList } from "@/components/skeleton/DeliveryCardSkeleton";
import BackButton from "@/components/ui/BackButton";
<<<<<<< HEAD
import { NotFoundState } from "@/components/ui/NotFound";
import { useGetAllDeliverQuery } from "@/redux/deliverApi";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
=======
import { FlatList, View } from "react-native";
>>>>>>> 258797aece8b55655cc79cc9b4bd96e62e2e4fbf
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../../lib/tailwind";

const tenOrderCards: OrderItem[] = Array.from({ length: 10 }, (_, index) => ({
  id: `order-card-${index + 1}`,
  title: "Classic Black Blazer",
  size: "M",
  quantity: 2,
  orderNumber: "ORD-10421",
  price: "$12.50",
  imageUri:
    "https://img.freepik.com/free-photo/men-s-outerwear-jacket-clothing_53876-101918.jpg",
  shopAddress: "Street Side Road, Tripoli, Libya",
  deliveryAddress: "1901 Thornridge Road, Tripoli, Libya",
  distance: "3.2 km",
}));

const RecentDeliver = () => {
  const insets = useSafeAreaInsets();
<<<<<<< HEAD

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
=======
>>>>>>> 258797aece8b55655cc79cc9b4bd96e62e2e4fbf
  return (
    <View
      style={[
        tw`flex-1 bg-white`,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      <BackButton title="Recent Delivery" />
      <View style={tw`flex-1  px-4 pt-5`}>
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
};

export default RecentDeliver;
