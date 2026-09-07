import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import tw from "../../../lib/tailwind";

const SkeletonItem = ({ isLast = false }: { isLast?: boolean }) => (
  <View
    style={[
      tw`flex-row items-center justify-between py-3 px-4`,
      !isLast && tw`border-b border-gray-100`,
    ]}
  >
    <View style={tw`flex-row items-center gap-x-3`}>
      {/* Icon Circle Skeleton */}
      <View style={tw`w-10 h-10 rounded-full bg-gray-200`} />
      {/* Title Bar Skeleton */}
      <View style={tw`w-36 h-4 bg-gray-200 rounded-md`} />
    </View>
    {/* Chevron Skeleton */}
    <View style={tw`w-4 h-4 bg-gray-200 rounded-full`} />
  </View>
);

export const ProfilePageSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
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
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View style={[{ opacity }, tw`w-full`]}>
      <View
        style={tw`bg-[#FCFCFC] rounded-2xl border border-[#EDEDED] shadow-sm overflow-hidden`}
      >
        {/* Header Skeleton */}
        <View
          style={tw`flex-row items-center gap-x-3 border-b px-4 pt-4 pb-6 border-gray-100`}
        >
          {/* Avatar */}
          <View style={tw`w-12 h-12 rounded-full bg-gray-200`} />
          <View style={tw`flex-1 gap-y-2`}>
            {/* Name Line */}
            <View style={tw`w-32 h-4 bg-gray-200 rounded-md`} />
            {/* Email Line */}
            <View style={tw`w-44 h-3 bg-gray-200 rounded-md`} />
          </View>
        </View>

        {/* Menu Items Skeletons */}
        {Array.from({ length: 7 }).map((_, index) => (
          <SkeletonItem key={index} isLast={index === 6} />
        ))}
      </View>
    </Animated.View>
  );
};
