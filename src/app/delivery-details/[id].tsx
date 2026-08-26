import { DeliveryOtpModal } from "@/components/delivery/DeliveryOtpModal";
import BackButton from "@/components/ui/BackButton";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "twrnc";

type DeliveryStatus = "Accepted" | "Picked Up" | "On The Way" | "Delivered";

const STATUSES: DeliveryStatus[] = [
  "Accepted",
  "Picked Up",
  "On The Way",
  "Delivered",
];

const BUTTON_TEXT_MAP: Record<DeliveryStatus, string> = {
  Accepted: "Mark as Picked Up",
  "Picked Up": "Mark as On the Way",
  "On The Way": "Mark as Delivered",
  Delivered: "Order Completed",
};

export default function DeliveryDetailsScreen() {
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] =
    useState<DeliveryStatus>("Accepted");

  // Coordinates
  const riderLocation = { latitude: 26.326, longitude: 43.962 };
  const shopLocation = { latitude: 26.338, longitude: 43.978 };
  const deliveryLocation = { latitude: 26.315, longitude: 43.99 };

  // Advance to next status
  const handleUpdateStatus = () => {
    if (currentStatus === "On The Way") {
      // Trigger OTP Modal on last step before completion
      setIsOtpModalVisible(true);
      return;
    }

    const currentIndex = STATUSES.indexOf(currentStatus);
    if (currentIndex < STATUSES.length - 1) {
      setCurrentStatus(STATUSES[currentIndex + 1]);
    }
  };

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleConfirmOtp = (enteredOtp: string) => {
    console.log("Submitted OTP:", enteredOtp);
    // Add your backend validation here if needed
    setIsOtpModalVisible(false);
    setCurrentStatus("Delivered");
    Alert.alert("Success", "Order delivered successfully!");
    router.push("/success-message");
  };

  const currentStepIndex = STATUSES.indexOf(currentStatus);

  return (
    <View style={tw`flex-1 bg-white`}>
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

          <View style={tw`flex-row items-center justify-between`}>
            {STATUSES.map((status, index) => {
              const isCompleted = index <= currentStepIndex;
              const isLast = index === STATUSES.length - 1;

              return (
                <React.Fragment key={status}>
                  {/* Step Item */}
                  <View style={tw`items-center flex-1`}>
                    <View
                      style={tw`w-10 h-10 rounded-full items-center justify-center mb-1.5 ${
                        isCompleted
                          ? "bg-[#34A853]"
                          : "bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {index === 0 && (
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color={isCompleted ? "#FFF" : "#9CA3AF"}
                        />
                      )}
                      {index === 1 && (
                        <Feather
                          name="box"
                          size={18}
                          color={isCompleted ? "#FFF" : "#9CA3AF"}
                        />
                      )}
                      {index === 2 && (
                        <Feather
                          name="send"
                          size={18}
                          color={isCompleted ? "#FFF" : "#9CA3AF"}
                        />
                      )}
                      {index === 3 && (
                        <Ionicons
                          name="checkmark-done"
                          size={20}
                          color={isCompleted ? "#FFF" : "#9CA3AF"}
                        />
                      )}
                    </View>
                    <Text
                      style={tw`text-[11px] font-medium text-center ${
                        isCompleted
                          ? "text-gray-900 font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      {status}
                    </Text>
                  </View>

                  {/* Connecting Line */}
                  {!isLast && (
                    <View
                      style={tw`h-[2px] flex-1 mx-1 -mt-5 ${
                        index < currentStepIndex
                          ? "bg-[#34A853]"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </View>
        </View>

        {/* 2. Interactive Google Map */}
        <View
          style={tw`h-64 rounded-3xl overflow-hidden border border-gray-100 relative`}
        >
          <MapView
            provider={PROVIDER_GOOGLE}
            style={tw`w-full h-full`}
            initialRegion={{
              latitude: 26.332,
              longitude: 43.97,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
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
                Street Side Road, Tripoli, Libya
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
                    +218 91 234 5678
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
                1901 Thornridge Road, Tripoli, Libya
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
                    +218 91 234 5678
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
        <TouchableOpacity
          activeOpacity={0.85}
          disabled={currentStatus === "Delivered"}
          onPress={handleUpdateStatus}
          style={tw`mt-2 py-4 rounded-full items-center justify-center shadow-sm ${
            currentStatus === "Delivered" ? "bg-gray-400" : "bg-[#526D18]"
          }`}
        >
          <Text style={tw`text-white font-bold text-base`}>
            {BUTTON_TEXT_MAP[currentStatus]}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <DeliveryOtpModal
        visible={isOtpModalVisible}
        onClose={() => setIsOtpModalVisible(false)}
        onConfirm={handleConfirmOtp}
      />
    </View>
  );
}
