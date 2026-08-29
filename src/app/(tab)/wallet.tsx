import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
// import BackButton from "../../../components/ui/BackButton";
// import PayoutCard from "../../../components/ui/e-commerce/analytic/PayoutCard";
// import {
//   OrderItemProps
// } from "../../../components/ui/e-commerce/order-card/OrderCard";
// import { SectionHeader } from "../../../components/ui/SectionHeader";
import {
  OrderItem,
  RecentDeliveryCard,
} from "@/components/recent-delivery/RecentDeliveryCard";
import BackButton from "@/components/ui/BackButton";
import PayoutCard from "@/components/ui/PayoutCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SvgXml } from "react-native-svg";
import { deliver, thisWeek, today } from "../../../lib/icon";
import tw from "../../../lib/tailwind";

// Mock 10 Items Array
const tenOrderCards: OrderItem[] = Array.from({ length: 10 }, (_, index) => ({
  id: `order-card-${index + 1}`,
  title: "Classic Black Blazer",
  size: "M",
  quantity: 2,
  orderNumber: "ORD-10421",
  price: "$12.50",
  imageUri: "../../../assets/product/product.png",
  shopAddress: "Street Side Road, Tripoli, Libya",
  deliveryAddress: "1901 Thornridge Road, Tripoli, Libya",
  distance: "3.2 km",
}));

interface StatItem {
  id: string;
  label: string;
  value: string | number;
  date: string;
  icon: string;
}

const STATS_DATA: StatItem[] = [
  { id: "1", label: "Today", value: "56", date: "Today", icon: today },
  {
    id: "2",
    label: "This week",
    value: "56",
    date: "This week",
    icon: thisWeek,
  },
  {
    id: "3",
    label: "Deliveries",
    value: "56",
    date: "Deliveries",
    icon: deliver,
  },
];

export default function Wallet() {
  const onViewAll = () => {
    router.push("/recent-delivery");
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
          {STATS_DATA.map((item) => (
            <View
              key={item.id}
              style={tw`flex-1 border border-[#F3F3F3] py-3 px-2 rounded-[12px] justify-center bg-white shadow-xs`}
            >
              <View style={tw`flex flex-row items-center justify-between`}>
                <Text
                  style={tw`text-[10px] font-medium mb-1  text-gray-500`}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
                <SvgXml xml={item?.icon} />
              </View>
              <Text style={tw`text-[#5A7314] text-lg font-bold `}>
                {item.value}
              </Text>
            </View>
          ))}
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
        <FlatList
          data={tenOrderCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecentDeliveryCard item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
