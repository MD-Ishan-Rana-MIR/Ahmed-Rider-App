import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { PaymentFormValues } from "@/components/ui/PaymentCardInfo";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import tw from "../../../lib/tailwind";

export default function AddPayout() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    defaultValues: {
      mpesa_payout_number: "",
    },
  });

  const onSubmit = (data: PaymentFormValues) => {
    router.push(
      `/(auth)/profile-picture-upload?cardNumber=${data?.mpesa_payout_number}`,
    );
  };

  return (
    <View style={tw`bg-white flex-1`}>
      <BackButton title="Add Payout Wallet" />
      <View style={tw` p-5  `}>
        <View>
          <Text
            style={tw`text-sm font-Manrope-SemiBold.ttf  text-[#3D3D3D] mb-2`}
          >
            Mpesa Payout Number
          </Text>
          <Controller
            control={control}
            name="mpesa_payout_number"
            rules={{
              required: "Card number is required",
              minLength: { value: 14, message: "Enter a valid card number" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={tw`flex-row items-center border ${
                  errors.mpesa_payout_number
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-2xl px-4 py-3 bg-white`}
              >
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="44444852256"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={19}
                  style={tw`flex-1 text-sm text-gray-800 p-0`}
                />
              </View>
            )}
          />
          {errors.mpesa_payout_number && (
            <Text style={tw`text-xs text-red-500 mt-1 ml-1`}>
              {errors.mpesa_payout_number.message as string}
            </Text>
          )}
        </View>

        <View style={tw`mt-10`}>
          <Button text="Continue" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
}
