import React, { useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import tw from "twrnc";
import {
    DeliveryRequestCard,
    DeliveryRequestData,
} from "./DeliveryRequestCard";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface MultipleRequestSheetProps {
  requests: DeliveryRequestData[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export const MultipleRequestSheet: React.FC<MultipleRequestSheetProps> = ({
  requests,
  onAccept,
  onDecline,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (requests.length === 0) return null;

  return (
    <View style={tw`absolute top-10 left-0 right-0 z-30`}>
      {/* Header bar indicating request count */}
      <View
        style={tw`bg-white rounded-t-3xl pt-3 px-5 border-t border-gray-100 flex-row items-center justify-between`}
      >
        <Text style={tw`text-base font-bold text-gray-900`}>
          Delivery Requests ({requests.length})
        </Text>

        {/* Swipe Pagination Dots */}
        {requests.length > 1 && (
          <View style={tw`flex-row gap-1.5`}>
            {requests.map((_, index) => (
              <View
                key={index}
                style={tw`h-2 rounded-full ${
                  index === activeIndex ? "w-6 bg-[#FF5C00]" : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </View>
        )}
      </View>

      {/* Horizontal List for Multiple Orders */}
      <FlatList
        data={requests}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
          );
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH }}>
            <DeliveryRequestCard
              request={item}
              onAccept={onAccept}
              onDecline={onDecline}
            />
          </View>
        )}
      />
    </View>
  );
};
