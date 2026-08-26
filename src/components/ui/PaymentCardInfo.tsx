import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import Button from "./Button";

export interface PaymentFormValues {
  cardHolderName: string;
  cardNumber: string;
  validUntil: string;
  cvv: string;
  saveCard: boolean;
}

interface PaymentCardFormProps {
  control: Control<any>;
  errors: FieldErrors;
}

export const PaymentCardForm: React.FC<PaymentCardFormProps> = ({
  control,
  errors,
}) => {
  // Format Card Number into groups of 4 (e.g., 4444 - 4852 - 256)
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(" - ").slice(0, 19) : "";
  };

  // Format Expiry Date to MM/YY
  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleNavigate = () => {
    // router.push("/(auth)/profile-picture-upload");
  };

  return (
    <View style={tw`gap-4`}>
      {/* 1. Card Holder Name */}
      <View>
        <Text
          style={tw`text-sm font-Manrope-SemiBold.ttf  text-[#3D3D3D] mb-2`}
        >
          Card Holder Name
        </Text>
        <Controller
          control={control}
          name="cardHolderName"
          rules={{ required: "Card holder name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={tw`flex-row items-center border ${
                errors.cardHolderName ? "border-red-500" : "border-gray-200"
              } rounded-2xl px-4 py-3 bg-white`}
            >
              <Ionicons
                name="card-outline"
                size={20}
                color="#9CA3AF"
                style={tw`mr-3`}
              />
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Your name"
                placeholderTextColor="#9CA3AF"
                style={tw`flex-1 text-sm text-gray-800 p-0`}
              />
            </View>
          )}
        />
        {errors.cardHolderName && (
          <Text style={tw`text-xs text-red-500 mt-1 ml-1`}>
            {errors.cardHolderName.message as string}
          </Text>
        )}
      </View>

      {/* 2. Card Number */}
      <View>
        <Text
          style={tw`text-sm font-Manrope-SemiBold.ttf  text-[#3D3D3D] mb-2`}
        >
          Card Number
        </Text>
        <Controller
          control={control}
          name="cardNumber"
          rules={{
            required: "Card number is required",
            minLength: { value: 14, message: "Enter a valid card number" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={tw`flex-row items-center border ${
                errors.cardNumber ? "border-red-500" : "border-gray-200"
              } rounded-2xl px-4 py-3 bg-white`}
            >
              <FontAwesome
                name="cc-mastercard"
                size={22}
                color="#EB001B"
                style={tw`mr-3`}
              />
              <TextInput
                value={value}
                onChangeText={(text) => onChange(formatCardNumber(text))}
                onBlur={onBlur}
                placeholder="4444 - 4852 - 256"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                maxLength={19}
                style={tw`flex-1 text-sm text-gray-800 p-0`}
              />
            </View>
          )}
        />
        {errors.cardNumber && (
          <Text style={tw`text-xs text-red-500 mt-1 ml-1`}>
            {errors.cardNumber.message as string}
          </Text>
        )}
      </View>

      {/* 3. Valid Until & CVV Row */}
      <View style={tw`flex-row gap-3`}>
        {/* Valid Until */}
        <View style={tw`flex-1`}>
          <Text
            style={tw`text-sm font-Manrope-SemiBold.ttf  text-[#3D3D3D] mb-2`}
          >
            Valid Until
          </Text>
          <Controller
            control={control}
            name="validUntil"
            rules={{ required: "Required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={tw`border ${
                  errors.validUntil ? "border-red-500" : "border-gray-200"
                } rounded-2xl px-4 py-3 bg-white`}
              >
                <TextInput
                  value={value}
                  onChangeText={(text) => onChange(formatExpiry(text))}
                  onBlur={onBlur}
                  placeholder="Month/Year"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={5}
                  style={tw`text-sm text-gray-800 p-0`}
                />
              </View>
            )}
          />
          {errors.validUntil && (
            <Text style={tw`text-xs text-red-500 mt-1 ml-1`}>
              {errors.validUntil.message as string}
            </Text>
          )}
        </View>

        {/* CVV */}
        <View style={tw`flex-1`}>
          <Text
            style={tw`text-sm font-Manrope-SemiBold.ttf  text-[#3D3D3D] mb-2`}
          >
            CVV
          </Text>
          <Controller
            control={control}
            name="cvv"
            rules={{
              required: "Required",
              minLength: { value: 3, message: "Min 3 digits" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={tw`border ${
                  errors.cvv ? "border-red-500" : "border-gray-200"
                } rounded-2xl px-4 py-3 bg-white`}
              >
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="***"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  secureTextEntry
                  maxLength={4}
                  style={tw`text-sm text-gray-800 p-0`}
                />
              </View>
            )}
          />
          {errors.cvv && (
            <Text style={tw`text-xs text-red-500 mt-1 ml-1`}>
              {errors.cvv.message as string}
            </Text>
          )}
        </View>
      </View>

      {/* 4. Save Card Checkbox */}
      <Controller
        control={control}
        name="saveCard"
        render={({ field: { onChange, value = false } }) => (
          <Pressable
            onPress={() => onChange(!value)}
            style={tw`flex-row items-center mt-1`}
          >
            <View
              style={tw`w-4 h-4 rounded border ${
                value
                  ? "bg-[#5A7314] border-[#5A7314]"
                  : "border-gray-300 bg-white"
              } items-center justify-center mr-2.5`}
            >
              {value && <Ionicons name="checkmark" size={12} color="white" />}
            </View>
            <Text style={tw`text-sm font-Manrope-Medium.ttf text-[#858585]`}>
              Save card data for future payments
            </Text>
          </Pressable>
        )}
      />

      <View style={tw`mt-6`}>
        <Button text="Save & Continue" onPress={handleNavigate} />
      </View>
    </View>
  );
};
