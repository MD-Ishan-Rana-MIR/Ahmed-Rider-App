import {
  OrderItem,
  RecentDeliveryCard
} from "@/components/recent-delivery/RecentDeliveryCard";
import BackButton from "@/components/ui/BackButton";
import { FlatList, View } from "react-native";
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
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton title="Recent Delivery" />
      <View style={tw`flex-1  px-4 pt-5`}>
        <FlatList
          data={tenOrderCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecentDeliveryCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-6`}
        />
      </View>
    </View>
  );
};

export default RecentDeliver;
