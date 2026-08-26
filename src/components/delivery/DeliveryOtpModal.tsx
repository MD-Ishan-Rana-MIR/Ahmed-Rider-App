import React, { useState } from "react";
import {
    Keyboard,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import tw from "twrnc";

interface DeliveryOtpModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (otp: string) => void;
}

export const DeliveryOtpModal: React.FC<DeliveryOtpModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }
    setError("");
    onConfirm(otp);
    setOtp("");
  };

  const handleCancel = () => {
    setOtp("");
    setError("");
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={handleCancel}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* Centering Backdrop Overlay */}
        <View style={tw`flex-1 bg-black/40 justify-center items-center px-5`}>
          <TouchableWithoutFeedback>
            {/* Modal Card Content */}
            <View
              style={tw`w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border border-gray-100 items-center`}
            >
              {/* Title */}
              <Text
                style={tw`text-lg font-bold text-gray-900 mb-1 text-center`}
              >
                Delivery OTP Verification
              </Text>

              {/* Subtitle */}
              <Text style={tw`text-sm text-gray-500 mb-5 text-center`}>
                Enter the OTP provided by the customer
              </Text>

              {/* Input Field */}
              <View style={tw`w-full mb-6`}>
                <TextInput
                  value={otp}
                  onChangeText={(text) => {
                    setOtp(text);
                    if (error) setError("");
                  }}
                  placeholder="Enter OTP"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={6}
                  style={tw`w-full bg-white border border-gray-200 rounded-full py-3.5 px-6 text-center text-base font-semibold text-gray-900`}
                />
                {error ? (
                  <Text style={tw`text-red-500 text-xs text-center mt-2`}>
                    {error}
                  </Text>
                ) : null}
              </View>

              {/* Action Buttons */}
              <View style={tw`flex-row gap-3 w-full`}>
                {/* Cancel Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleCancel}
                  style={tw`flex-1 bg-[#F2F5EB] py-3.5 rounded-full items-center justify-center`}
                >
                  <Text style={tw`text-[#526D18] font-bold text-base`}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                {/* Confirm Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleConfirm}
                  style={tw`flex-1 bg-[#526D18] py-3.5 rounded-full items-center justify-center shadow-xs`}
                >
                  <Text style={tw`text-white font-bold text-base`}>
                    Confirm Delivery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
