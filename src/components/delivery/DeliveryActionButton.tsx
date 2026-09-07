import { useDeliveryStatusUpdateMutation } from "@/redux/deliverApi";
import { ActivityIndicator, Alert, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { errorMsg } from "../../../lib/errorMessage";
import { successMsg } from "../../../lib/successMsg";

export interface DeliveryTimeline {
  accepted: boolean;
  picked_up: boolean;
  on_the_way: boolean;
  delivered: boolean;
}

interface DeliveryActionButtonProps {
  timeline?: DeliveryTimeline;
  isLoading?: boolean;
  onUpdateStatus: (nextStatus: string) => void;
  onOpenOtpModal: () => void;
  id?: string | string[];
}

export default function DeliveryActionButton({
  id,
  timeline,
  isLoading = false,
  onUpdateStatus,
  onOpenOtpModal,
}: DeliveryActionButtonProps) {
  const getButtonState = () => {
    if (timeline?.delivered) {
      return { text: "Order Completed", nextStatus: null, disabled: true };
    }
    if (timeline?.on_the_way) {
      return {
        text: "Mark as Delivered",
        nextStatus: "delivered",
        disabled: false,
      };
    }
    if (timeline?.picked_up) {
      return {
        text: "Mark as On the Way",
        nextStatus: "on_the_way",
        disabled: false,
      };
    }
    if (timeline?.accepted) {
      return {
        text: "Mark as Picked Up",
        nextStatus: "picked_up",
        disabled: false,
      };
    }
    return { text: "Pending Acceptance", nextStatus: null, disabled: true };
  };

  console.log("id for action button", id);

  const { text, nextStatus, disabled } = getButtonState();
  const isDisabled = disabled || isLoading;

  const [deliveryStatusUpdate] = useDeliveryStatusUpdateMutation();

  const handlePress = async () => {
    if (isDisabled) return;

    // "Mark as Delivered" হলে OTP modal অন হবে
    if (nextStatus === "delivered") {
      onOpenOtpModal();
      return;
    }

    if (nextStatus) {
      // ১. কনফার্মেশন অ্যালার্ট
      Alert.alert(
        "Confirm Action",
        `Are you sure you want to mark this order as "${nextStatus.replace(/_/g, " ")}"?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: async () => {
              // ২. কনফার্ম করার পর API কল
              try {
                const payload = {
                  status: nextStatus,
                };
                console.log("deliver status", nextStatus);
                const res = await deliveryStatusUpdate({
                  id,
                  payload,
                }).unwrap();
                if (res) {
                  successMsg(res?.message || "Status updated successfully!");
                  onUpdateStatus(nextStatus);
                }
              } catch (error) {
                console.log("err", error);
                const errorMessage =
                  error && typeof error === "object" && "data" in error
                    ? ((error as { data?: { message?: string } }).data
                        ?.message ?? String(error))
                    : error instanceof Error
                      ? error.message
                      : String(error);

                errorMsg(errorMessage);
              }
            },
          },
        ],
        { cancelable: true },
      );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={isDisabled}
      onPress={handlePress}
      style={tw`w-full py-4 rounded-full items-center justify-center shadow-xs ${
        isDisabled ? "bg-gray-300" : "bg-[#526D18]"
      }`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text
          style={tw`text-base font-bold text-center ${
            isDisabled ? "text-gray-500" : "text-white"
          }`}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
