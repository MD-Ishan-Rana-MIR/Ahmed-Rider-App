import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "../../../lib/tailwind";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface SlideItem {
  id: string;
  title: string;
  description: string;
  type: "grid" | "single";
  images: {
    col1?: (string | ImageSourcePropType)[];
    col2?: (string | ImageSourcePropType)[];
    col3?: (string | ImageSourcePropType)[];
  };
}

const SLIDES: SlideItem[] = [
  {
    id: "1",
    title: "Everything You Need, All In One App",
    description:
      "Shop products, order food, book hotels and buses, and track deliveries all from one place.",
    type: "grid",
    images: {
      col1: [
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      ],
      col2: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500",
        "https://images.unsplash.com/photo-1608248597260-22684948f296?w=500",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
      ],
      col3: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
        "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
      ],
    },
  },
  {
    id: "2",
    title: "Discover Beautiful Stays for Every Journey",
    description:
      "Explore beautiful stays, compare your options, and book the perfect room with ease.",
    type: "single",
    images: {
      col1: [require("../../../assets/app-logo/android.png")],
    },
  },
  {
    id: "3",
    title: "Your Next Journey Starts With One Tap",
    description:
      "Find the right bus, choose your preferred seat, and book your ticket in just a few taps.",
    type: "single",
    images: {
      col1: [require("../../../assets/app-logo/android.png")],
    },
  },
];

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      router.push("/(auth)/login");
    }
  };

  // Helper function to resolve image source (Remote URL string vs Local require source)
  const getImageSource = (img: string | ImageSourcePropType) => {
    return typeof img === "string" ? { uri: img } : img;
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />
      <View style={tw`flex-1`}>
        {/* Horizontal Slider */}
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
              <View style={tw`flex-1 justify-between`}>
                {/* Image Gallery / Showcase Section */}
                <View style={tw`relative flex-1 overflow-hidden`}>
                  {item.type === "grid" ? (
                    /* Slide 1: 3-Column Grid */
                    <View style={tw`flex-row gap-2.5 justify-center`}>
                      {/* Column 1 */}
                      <View style={tw`flex-1 gap-2.5`}>
                        {item.images.col1?.map((img, idx) => (
                          <Image
                            key={idx}
                            source={getImageSource(img)}
                            style={tw`w-full ${idx === 0 ? "h-28" : "h-44"} `}
                            resizeMode="cover"
                          />
                        ))}
                      </View>

                      {/* Column 2 */}
                      <View style={tw`flex-1 gap-2.5`}>
                        {item.images.col2?.map((img: string, idx: number) => (
                          <Image
                            key={idx}
                            source={getImageSource(img)}
                            style={tw`w-full ${idx === 0 ? "h-36" : "h-48"} `}
                            resizeMode="cover"
                          />
                        ))}
                      </View>

                      {/* Column 3 */}
                      <View style={tw`flex-1 gap-2.5`}>
                        {item.images.col3?.map((img: string, idx: number) => (
                          <Image
                            key={idx}
                            source={getImageSource(img)}
                            style={tw`w-full ${idx === 0 ? "h-28" : "h-44"} `}
                            resizeMode="cover"
                          />
                        ))}
                      </View>
                    </View>
                  ) : (
                    /* Slide 2 & 3: Single Hero Local Image */
                    <View style={tw`flex-1 justify-center items-center `}>
                      {item.images.col1?.[0] && (
                        <Image
                          source={getImageSource(item.images.col1[0])}
                          style={tw`w-full h-full `}
                          resizeMode="cover"
                        />
                      )}
                    </View>
                  )}

                  {/* Bottom Gradient Overlay */}
                  <LinearGradient
                    colors={["transparent", "rgba(255,255,255,0.7)", "#FFFFFF"]}
                    style={tw`absolute bottom-0 left-0 right-0 h-28`}
                    pointerEvents="none"
                  />
                </View>

                {/* Text Content */}
                <View style={tw`px-6 pt-2`}>
                  <Text
                    style={tw`text-[32px] font-bold text-gray-900 leading-[38px] mb-3`}
                  >
                    {item.title}
                  </Text>
                  <Text style={tw`text-base text-gray-500 leading-6`}>
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />

        {/* Bottom Navigation & Controls */}
        <View style={tw`px-6 pb-8 pt-4`}>
          {/* Dynamic Pagination Indicators */}
          <View style={tw`flex-row items-center gap-2 mb-6`}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={tw`${
                  activeIndex === index
                    ? "w-8 bg-[#5A7314]"
                    : "w-2.5 bg-gray-300"
                } h-2.5 rounded-full`}
              />
            ))}
          </View>

          {/* Action Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleNext}
            style={tw`bg-[#5A7314] py-4 rounded-full items-center justify-center`}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              {activeIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
