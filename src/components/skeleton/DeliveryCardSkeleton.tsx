import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import tw from "twrnc";

export const DeliveryCardSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        tw`bg-white rounded-[12px] border border-[#E3E3E3] p-4 my-2 shadow-sm w-full`,
        { opacity },
      ]}
    >
      {/* Top Header Skeleton */}
      <View
        style={tw`flex-row items-center justify-between pb-6 border-b border-[#E6E6E6]`}
      >
        <View style={tw`flex-row items-center gap-3`}>
          {/* Icon Placeholder */}
          <View style={tw`w-10 h-10 rounded-xl bg-gray-200`} />

          {/* Distance & Price Placeholders */}
          <View style={tw`gap-1.5`}>
            <View style={tw`w-16 h-4 bg-gray-200 rounded-md`} />
            <View style={tw`w-12 h-3 bg-gray-200 rounded-md`} />
          </View>
        </View>

        {/* Status Badge Placeholder */}
        <View style={tw`w-20 h-7 bg-gray-200 rounded-full`} />
      </View>

      {/* Address Timeline Section Skeleton */}
      <View style={tw`relative pl-8 pt-4 pb-2`}>
        {/* Dashed Line Visual */}
        <View
          style={[
            tw`absolute left-[11px] top-9 bottom-9 border-l-2 border-dashed border-gray-200`,
            { width: 1 },
          ]}
        />

        {/* Shop Address Row */}
        <View style={tw`relative mb-5`}>
          {/* Timeline Dot Indicator */}
          <View
            style={tw`absolute -left-8 top-0 w-6 h-6 rounded-full bg-gray-200 items-center justify-center z-10`}
          >
            <View style={tw`w-2.5 h-2.5 rounded-full bg-gray-300`} />
          </View>
          <View style={tw`w-24 h-3 bg-gray-200 rounded-md mb-2`} />
          <View style={tw`w-3/4 h-4 bg-gray-200 rounded-md`} />
        </View>

        {/* Swap Icon Badge Placeholder */}
        <View style={tw`relative my-1 items-end justify-center`}>
          <View
            style={tw`w-full border-t border-gray-100 absolute left-0 right-0`}
          />
          <View
            style={tw`bg-white border border-gray-200 p-1.5 rounded-lg z-10`}
          >
            <View style={tw`w-3 h-3 bg-gray-200 rounded`} />
          </View>
        </View>

        {/* Delivery Address Row */}
        <View style={tw`relative mt-3 mb-2`}>
          {/* Location Pin Icon Indicator */}
          <View
            style={tw`absolute -left-8 top-0 z-10 w-6 h-6 rounded-full bg-gray-200`}
          />
          <View style={tw`w-28 h-3 bg-gray-200 rounded-md mb-2`} />
          <View style={tw`w-5/6 h-4 bg-gray-200 rounded-md`} />
        </View>
      </View>

      {/* Action Button Skeleton */}
      <View style={tw`bg-gray-200 rounded-full h-12 w-full mt-3`} />
    </Animated.View>
  );
};

// Component to render multiple skeleton cards in a loop
export const DeliveryCardSkeletonList = ({ count = 3 }: { count?: number }) => {
  return (
    <View style={tw`w-full`}>
      {Array.from({ length: count }).map((_, index) => (
        <DeliveryCardSkeleton key={index} />
      ))}
    </View>
  );
};
