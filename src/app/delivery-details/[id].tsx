import DeliveryActionButton from "@/components/delivery/DeliveryActionButton";
import { DeliveryOtpModal } from "@/components/delivery/DeliveryOtpModal";
import StaticDeliveryStepper from "@/components/delivery/StaticDeliveryStepper";
import DeliveryDetailsSkeleton from "@/components/skeleton/DeliveryDetailsSkeleton";
import BackButton from "@/components/ui/BackButton";
import { useDeliveryDetailsQuery } from "@/redux/deliverApi";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";

type DeliveryStatus = "Accepted" | "Picked Up" | "On The Way" | "Delivered";

// const BUTTON_TEXT_MAP: Record<DeliveryStatus, string> = {
//   Accepted: "Mark as Picked Up",
//   "Picked Up": "Mark as On the Way",
//   "On The Way": "Mark as Delivered",
//   Delivered: "Order Completed",
// };

export default function DeliveryDetailsScreen() {
  const { id } = useLocalSearchParams();

  console.log(id);

  const { data, isLoading } = useDeliveryDetailsQuery(id);

  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] =
    useState<DeliveryStatus>("Accepted");

  // Coordinates
  const riderLocation = {
    latitude: data?.data?.order?.pickup?.latitude,
    longitude: data?.data?.order?.pickup?.longitude,
  };
  const shopLocation = {
    latitude: data?.data?.order?.dropoff?.latitude,
    longitude: data?.data?.order?.dropoff?.longitude,
  };

  // Advance to next status
  const handleUpdateStatus = () => {
    if (currentStatus === "On The Way") {
      // Trigger OTP Modal on last step before completion
      setIsOtpModalVisible(true);
      return;
    }
  };

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleConfirmOtp = (enteredOtp: string) => {
    // Add your backend validation here if needed
    setIsOtpModalVisible(false);
    setCurrentStatus("Delivered");
    Alert.alert("Success", "Order delivered successfully!");
    router.push("/success-message");
  };

  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);
  if (isLoading) {
    return <DeliveryDetailsSkeleton />;
  }

  return (
    <View
      style={[
        tw`flex-1 bg-white`,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      <BackButton title="Delivery Details" showBackButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`p-4 pb-8 bg-white gap-y-4`}
      >
        {/* 1. Delivery Timeline Stepper Card */}
        <View
          style={tw`bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}
        >
          <Text style={tw`text-base font-bold text-gray-900 mb-4`}>
            Delivery Timeline
          </Text>
          <StaticDeliveryStepper
            timeline={data?.data?.order?.delivery_timeline}
          />
        </View>

        {/* 2. Interactive Google Map */}
        {/* 2. Interactive Google Map */}
        <View
          style={tw`h-64 rounded-3xl overflow-hidden border border-gray-100 relative`}
        >
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={tw`w-full h-full`}
            // ম্যাপ লোড হওয়ার সাথেই দুটি কোঅর্ডিনেট ফ্রেমের মধ্যে ফিট হয়ে যাবে
            onMapReady={() => {
              if (riderLocation.latitude && shopLocation.latitude) {
                mapRef.current?.fitToCoordinates(
                  [riderLocation, shopLocation],
                  {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    animated: true,
                  },
                );
              }
            }}
          >
            {/* Dashed Route Polyline */}
            <Polyline
              coordinates={[riderLocation, shopLocation]}
              strokeColor="#FF5C00"
              strokeWidth={4}
              lineDashPattern={[6, 6]}
            />

            {/* Rider Marker */}
            <Marker coordinate={riderLocation} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={tw`items-center`}>
                <View
                  style={tw`bg-[#22252A] px-2.5 py-1 rounded-md mb-1 shadow-md`}
                >
                  <Text style={tw`text-white text-[10px] font-bold`}>
                    Rider
                  </Text>
                </View>
                <View
                  style={tw`w-9 h-9 rounded-full bg-[#FF5C00] border-2 border-white items-center justify-center shadow-lg`}
                >
                  <Ionicons name="navigate" size={18} color="#FFF" />
                </View>
              </View>
            </Marker>

            {/* Picked Up / Shop Marker */}
            <Marker coordinate={shopLocation} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={tw`items-center`}>
                <View
                  style={tw`bg-[#22252A] px-2.5 py-1 rounded-md mb-1 shadow-md`}
                >
                  <Text style={tw`text-white text-[10px] font-bold`}>
                    Picked up
                  </Text>
                </View>
                <Ionicons name="location-sharp" size={36} color="#FF5C00" />
              </View>
            </Marker>
          </MapView>
        </View>

        {/* 3. Delivery Address Details Card */}
        <View
          style={tw`bg-white rounded-3xl border border-[#F4F4F4] py-3 px-4 shadow-xs`}
        >
          <Text
            style={tw`text-sm text-[#1A1A1A] font-Manrope-SemiBold.ttf mb-2`}
          >
            Delivery Address
          </Text>

          <View style={tw`relative pl-8 pt-2`}>
            {/* Continuous Dashed Connecting Line */}
            <View
              style={[
                tw`absolute left-[11px] top-6 bottom-10 border-l-2 border-dashed border-[#FF5C00]`,
                { width: 1 },
              ]}
            />

            {/* Shop Address Row */}
            <View style={tw`relative mb-4`}>
              <View
                style={tw`absolute -left-8 top-0 w-6 h-6 rounded-full border-2 border-[#FF5C00] bg-white items-center justify-center z-10`}
              >
                <View style={tw`w-2.5 h-2.5 rounded-full bg-[#FF5C00]`} />
              </View>
              <Text
                style={tw`text-xs text-[#898989] font-Manrope-Regular.ttf mb-1`}
              >
                Shop Address
              </Text>
              <Text
                style={tw`text-[16px] text-[#1A1A1A] font-Manrope-Regular.ttf mb-3 `}
              >
                {data?.data?.order?.pickup?.address}
              </Text>

              {/* Shop Owner Phone Call Bar */}
              <View
                style={tw`bg-[#F8F9FA] rounded-2xl p-3 flex-row items-center justify-between`}
              >
                <View>
                  <Text
                    style={tw`text-xs text-[#898989] font-Manrope-Regular.ttf mb-1`}
                  >
                    Shop Owner
                  </Text>
                  <Text
                    style={tw`text-sm text-[#1A1A1A] font-Manrope-Regular.ttf `}
                  >
                    {data?.data?.order?.pickup?.phone_number}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleCall("+218912345678")}
                  style={tw`w-10 h-10 rounded-full bg-[#FF5C00] items-center justify-center shadow-xs`}
                >
                  <Ionicons name="call" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Delivery Address Row */}
            <View style={tw`relative mt-4`}>
              <View style={tw`absolute -left-8 top-0 z-10`}>
                <Ionicons name="location-sharp" size={24} color="#FF5C00" />
              </View>
              <Text style={tw`text-xs text-gray-400 font-medium mb-0.5`}>
                Delivery Address
              </Text>
              <Text
                style={tw`text-[16px] text-[#1A1A1A] font-Manrope-Regular.ttf mb-3 `}
              >
                {data?.data?.order?.dropoff?.address_text}
              </Text>

              {/* Customer Phone Call Bar */}
              <View
                style={tw`bg-[#F8F9FA] rounded-2xl p-3 flex-row items-center justify-between`}
              >
                <View>
                  <Text
                    style={tw`text-sm text-[#999999] font-Manrope-Medium.ttf mb-0.5`}
                  >
                    Customer
                  </Text>
                  <Text
                    style={tw`text-sm text-[#1A1A1A] font-Manrope-Regular.ttf `}
                  >
                    {data?.data?.order?.dropoff?.phone_number}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleCall("+218912345678")}
                  style={tw`w-10 h-10 rounded-full bg-[#FF5C00] items-center justify-center shadow-xs`}
                >
                  <Ionicons name="call" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* 4. Action Button with Dynamic Status Updates */}
        <DeliveryActionButton
          timeline={data?.data?.order?.delivery_timeline}
          onUpdateStatus={handleUpdateStatus}
          onOpenOtpModal={() => setIsOtpModalVisible(true)}
          id={id}
        />
      </ScrollView>
      <DeliveryOtpModal
        visible={isOtpModalVisible}
        onClose={() => setIsOtpModalVisible(false)}
        onConfirm={handleConfirmOtp}
      />
    </View>
  );
}
