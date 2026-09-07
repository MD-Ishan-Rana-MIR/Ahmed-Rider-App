import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { FormPasswordInput } from "@/components/ui/FormPasswordInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";

import { useForgetPasswordMutation } from "@/redux/authApi";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { errorMsg } from "../../../lib/errorMessage";
import { successMsg } from "../../../lib/successMsg";
import tw from "../../../lib/tailwind";

interface ResetPasswordInputs {
  password: string;
  password_confirmation: string;
}

export default function ResetPassword() {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInputs>({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const { email } = useLocalSearchParams<{
    email?: string;
  }>();

  const onSubmit = async (data: ResetPasswordInputs) => {
    const token = await AsyncStorage.getItem("forget-password-token");

    const payload = {
      email: email,
      password: data?.password,
      password_confirmation: data?.password_confirmation,
      password_reset_token: token,
    };

    try {
      const res = await forgetPassword(payload).unwrap();
      if (res) {
        if (token) {
          successMsg(res?.message);
          AsyncStorage.removeItem("forget-password-token");
          reset();
          router.push("/(auth)/login");
        } else {
          router.push("/(auth)/email-verify");
        }
      }
    } catch (error) {
      return errorMsg(
        error && typeof error === "object" && "data" in error
          ? ((error as { data?: { message?: string } }).data?.message ??
              String(error))
          : error instanceof Error
            ? error.message
            : String(error),
      );
    }
  };

  return (
    <View style={tw`bg-bgOlive flex-1`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        {/* Header Section */}
        <View style={tw` relative overflow-hidden  mb-1   `}>
          {/* Absolute Decorative Background Image (Top Right) */}
          {/* <Image
            source={require("../../../assets/images/world.png")}
            style={tw`absolute   -right-10 w-[274px] h-[274px] opacity-90`}
            resizeMode="contain"
          /> */}

          {/* Header Content */}
          <View style={tw`z-10 pr-20`}>
            {/* Back Button */}
            <View style={tw``}>
              <BackButton />
            </View>

            {/* Title & Subtitle */}
            <View style={tw`px-5`}>
              <Text style={tw`text-white text-2xl font-semibold mb-1.5`}>
                Set new password
              </Text>
              <Text style={tw`text-white/80 text-sm mt-3`}>
                Please create a new password for your account
              </Text>
            </View>
          </View>
        </View>

        {/* Form Container */}
        <View
          style={tw`bg-white flex-1 px-5 pt-8 mt-10 rounded-tl-[37px] rounded-tr-[37px]`}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={tw`flex-grow justify-between pb-6`}
          >
            <View>
              {/* Password */}
              <View style={tw`mb-4.5`}>
                <FormPasswordInput
                  name="password"
                  label="Password"
                  control={control as any}
                  errors={errors}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                />
              </View>

              {/* Confirm Password */}
              <View style={tw`mb-2`}>
                <FormPasswordInput
                  name="password_confirmation"
                  label="Confirm Password"
                  placeholder="Re-enter password"
                  control={control as any}
                  errors={errors}
                  rules={{
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === watch("password") || "Passwords do not match",
                  }}
                />
              </View>
            </View>

            {/* Submit Button */}
            <View style={tw`mt-6`}>
              <Button
                text="Continue"
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
