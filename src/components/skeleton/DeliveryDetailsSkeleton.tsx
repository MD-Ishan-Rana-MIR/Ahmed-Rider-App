import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";

export default function DeliveryDetailsSkeleton() {
  const insets = useSafeAreaInsets();
  const animatedValue = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  return (
    <View
      style={[
        tw`flex-1 bg-white`,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      {/* Top Header Placeholder */}
      <View
        style={tw`flex-row items-center px-4 py-3 border-b border-gray-100 mt-2`}
      >
        <Animated.View
          style={[
            tw`w-8 h-8 rounded-full bg-gray-200`,
            { opacity: animatedValue },
          ]}
        />
        <Animated.View
          style={[
            tw`h-5 w-36 bg-gray-200 rounded ml-4`,
            { opacity: animatedValue },
          ]}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`p-4 pb-8 bg-white gap-y-4`}
      >
        {/* 1. Timeline Card Skeleton */}
        <View style={tw`bg-white rounded-3xl border border-gray-100 p-4`}>
          <Animated.View
            style={[
              tw`h-5 w-32 bg-gray-200 rounded mb-4`,
              { opacity: animatedValue },
            ]}
          />
          <View style={tw`flex-row items-center justify-between`}>
            {[1, 2, 3, 4].map((_, index) => (
              <React.Fragment key={index}>
                <View style={tw`items-center flex-1`}>
                  <Animated.View
                    style={[
                      tw`w-10 h-10 rounded-full bg-gray-200 mb-2`,
                      { opacity: animatedValue },
                    ]}
                  />
                  <Animated.View
                    style={[
                      tw`h-3 w-12 bg-gray-200 rounded`,
                      { opacity: animatedValue },
                    ]}
                  />
                </View>
                {index < 3 && (
                  <Animated.View
                    style={[
                      tw`h-[2px] flex-1 mx-1 -mt-5 bg-gray-200`,
                      { opacity: animatedValue },
                    ]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* 2. Map Skeleton */}
        <View
          style={tw`h-64 rounded-3xl border border-gray-100 overflow-hidden bg-gray-100 justify-center items-center`}
        >
          <Animated.View
            style={[tw`w-full h-full bg-gray-200`, { opacity: animatedValue }]}
          />
        </View>

        {/* 3. Delivery Address Details Card Skeleton */}
        <View style={tw`bg-white rounded-3xl border border-gray-100 py-3 px-4`}>
          <Animated.View
            style={[
              tw`h-4 w-28 bg-gray-200 rounded mb-4`,
              { opacity: animatedValue },
            ]}
          />

          <View style={tw`pl-8 relative`}>
            {/* Dashed Line Skeleton */}
            <View
              style={tw`absolute left-[11px] top-4 bottom-8 w-[2px] bg-gray-200`}
            />

            {/* Shop Address Row */}
            <View style={tw`relative mb-5`}>
              <Animated.View
                style={[
                  tw`absolute -left-8 top-0 w-6 h-6 rounded-full bg-gray-200`,
                  { opacity: animatedValue },
                ]}
              />
              <Animated.View
                style={[
                  tw`h-3 w-20 bg-gray-200 rounded mb-2`,
                  { opacity: animatedValue },
                ]}
              />
              <Animated.View
                style={[
                  tw`h-4 w-48 bg-gray-200 rounded mb-3`,
                  { opacity: animatedValue },
                ]}
              />

              {/* Shop Phone Box */}
              <View
                style={tw`bg-gray-50 rounded-2xl p-3 flex-row items-center justify-between`}
              >
                <View>
                  <Animated.View
                    style={[
                      tw`h-3 w-16 bg-gray-200 rounded mb-2`,
                      { opacity: animatedValue },
                    ]}
                  />
                  <Animated.View
                    style={[
                      tw`h-4 w-32 bg-gray-200 rounded`,
                      { opacity: animatedValue },
                    ]}
                  />
                </View>
                <Animated.View
                  style={[
                    tw`w-10 h-10 rounded-full bg-gray-200`,
                    { opacity: animatedValue },
                  ]}
                />
              </View>
            </View>

            {/* Customer Address Row */}
            <View style={tw`relative`}>
              <Animated.View
                style={[
                  tw`absolute -left-8 top-0 w-6 h-6 rounded-full bg-gray-200`,
                  { opacity: animatedValue },
                ]}
              />
              <Animated.View
                style={[
                  tw`h-3 w-24 bg-gray-200 rounded mb-2`,
                  { opacity: animatedValue },
                ]}
              />
              <Animated.View
                style={[
                  tw`h-4 w-52 bg-gray-200 rounded mb-3`,
                  { opacity: animatedValue },
                ]}
              />

              {/* Customer Phone Box */}
              <View
                style={tw`bg-gray-50 rounded-2xl p-3 flex-row items-center justify-between`}
              >
                <View>
                  <Animated.View
                    style={[
                      tw`h-3 w-16 bg-gray-200 rounded mb-2`,
                      { opacity: animatedValue },
                    ]}
                  />
                  <Animated.View
                    style={[
                      tw`h-4 w-32 bg-gray-200 rounded`,
                      { opacity: animatedValue },
                    ]}
                  />
                </View>
                <Animated.View
                  style={[
                    tw`w-10 h-10 rounded-full bg-gray-200`,
                    { opacity: animatedValue },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* 4. Action Button Skeleton */}
        <Animated.View
          style={[
            tw`mt-2 h-14 bg-gray-200 rounded-full`,
            { opacity: animatedValue },
          ]}
        />
      </ScrollView>
    </View>
  );
}
