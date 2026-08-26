import { DeliveryCard, DeliveryItem } from "@/components/delivery/DeliveryCard";
import BackButton from "@/components/ui/BackButton";
import { NotFoundState } from "@/components/ui/NotFound";
import { SegmentedTab } from "@/components/ui/SegmentedTab";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

const MOCK_ACTIVE_ORDERS: DeliveryItem[] = [
  {
    id: "1",
    distance: "3.1 km",
    price: "$6.25",
    status: "Accepted",
    shopAddress: "Street Side Road, Tripoli, Libya",
    deliveryAddress: "1901 Thornridge Road, Tripoli, Libya",
  },
  {
    id: "2",
    distance: "5.4 km",
    price: "$10.00",
    status: "Accepted",
    shopAddress: "Central Avenue, Tripoli, Libya",
    deliveryAddress: "852 Palm Street, Tripoli, Libya",
  },
  {
    id: "3",
    distance: "5.4 km",
    price: "$10.00",
    status: "Accepted",
    shopAddress: "Central Avenue, Tripoli, Libya",
    deliveryAddress: "852 Palm Street, Tripoli, Libya",
  },
];

const MOCK_COMPLETED_ORDERS: DeliveryItem[] = [];

export default function DeliveriesScreen() {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  const currentData =
    activeTab === "active" ? MOCK_ACTIVE_ORDERS : MOCK_COMPLETED_ORDERS;

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton title="My Deliveries" showBackButton={true} />

      <View style={tw`flex-1 px-4 pt-4`}>
        <SegmentedTab
          activeTab={activeTab}
          activeCount={MOCK_ACTIVE_ORDERS.length}
          completedCount={MOCK_COMPLETED_ORDERS.length}
          onTabChange={setActiveTab}
        />

        <FlatList
          data={currentData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DeliveryCard
              item={item}
              onViewDetails={(id) =>
                router.push({
                  pathname: "/delivery-details/[id]",
                  params: { id },
                })
              }
            />
          )}
          ListEmptyComponent={
            <NotFoundState
              title={`No ${activeTab === "active" ? "Active" : "Completed"} Orders`}
              message={`No ${activeTab} deliveries.`}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            tw`pb-6`,
            currentData.length === 0 && tw`flex-1 justify-center items-center`,
          ]}
        />
      </View>
    </View>
  );
}
