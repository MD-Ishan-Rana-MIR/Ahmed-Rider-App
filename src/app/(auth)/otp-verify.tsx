import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";

import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import {
  useForgetOtpVerifyMutation,
  useOtpVerifyMutation,
  useResendOtpMutation,
} from "@/redux/authApi";
import { errorMsg } from "../../../lib/errorMessage";
import { successMsg } from "../../../lib/successMsg";
import tw from "../../../lib/tailwind";
import { RiderOtpVerifyPayload } from "../../../lib/type";

interface OtpFormInputs {
  otp: string;
}

export default function OtpVerify() {
  const [timer, setTimer] = useState(60);
  const [otpArray, setOtpArray] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormInputs>({
    defaultValues: {
      otp: "",
    },
  });

  const [otpVerify, { isLoading }] = useOtpVerifyMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const { email, page_name } = useLocalSearchParams<{
    email?: string;
    page_name?: string;
  }>();

  // Countdown timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const [forgetOtpVerify, { isLoading: fLoading }] =
    useForgetOtpVerifyMutation();

  // Handle OTP digit changes
  const handleChangeText = (text: string, index: number) => {
    const newOtpArray = [...otpArray];
    const digit = text.slice(-1); // Take only the last entered character
    newOtpArray[index] = digit;

    setOtpArray(newOtpArray);

    const fullOtp = newOtpArray.join("");
    setValue("otp", fullOtp);

    if (fullOtp.length === 6) {
      clearErrors("otp");
    }

    // Auto-advance focus
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Resend code handler

  const data = {
    email,
  };

  const handleResendCode = async () => {
    if (timer === 0) {
      setTimer(60);
      setOtpArray(Array(6).fill(""));
      setValue("otp", "");
      inputRefs.current[0]?.focus();
      try {
        const res = await resendOtp(data).unwrap();
        return successMsg(res?.message);
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
    }
  };

  const onSubmit = async (data: OtpFormInputs) => {
    if (!email) {
      errorMsg("Email is required to verify the OTP");
      return;
    }

    const payload: RiderOtpVerifyPayload = {
      otp: data?.otp,
      email: email,
    };
    if (data.otp.length < 6) {
      setError("otp", {
        type: "manual",
        message: "Please enter all 6 digits",
      });
      return;
    }

    if (page_name === "registration") {
      try {
        const res = await otpVerify(payload).unwrap();
        if (res) {
          reset();
          router.push("/(auth)/login");
          return successMsg(res?.message);
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
    } else if (page_name === "f-email-verify") {
      try {
        const res = await forgetOtpVerify(payload).unwrap();
        if (res) {
          if (res?.data?.password_reset_token) {
            router.push(
              `/(auth)/reset-password?page_name=otpverify&email=${email}`,
            );
            reset();
            AsyncStorage.setItem(
              "forget-password-token",
              res?.data?.password_reset_token,
            );

            return successMsg(res?.message);
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
    }
  };

  // const handleNavigate = () => {
  //   if (page_name === "registration") {
  //     return router.push("/(auth)/profile-setup?page_name=profile_setup");
  //   } else if (page_name === "f-email-verify") {
  //     return router.push("/(auth)/reset-password?page_name=otpverify");
  //   }
  // };

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
                OTP Confirmation
              </Text>
              <Text style={tw`text-white/80 text-sm mt-3`}>
                To confirm your account, enter the 6-digit code we sent to
                yourmail@gmail.com
              </Text>
            </View>
          </View>
        </View>

        {/* Form Container */}
        <View
          style={tw`bg-white flex-1 px-5 pt-8 rounded-tl-[37px] mt-10 rounded-tr-[37px]`}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={tw` pb-6`}
          >
            <View>
              {/* 6-Digit Input Row */}
              <Controller
                control={control}
                name="otp"
                rules={{
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "Please enter all 6 digits",
                  },
                }}
                render={() => (
                  <View style={tw`flex-row justify-between items-center my-6`}>
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <TextInput
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          style={tw`w-13 h-13 border ${
                            errors.otp
                              ? "border-red-500"
                              : otpArray[index]
                                ? "border-[#5B7410]"
                                : "border-[#EDF1F3]"
                          } rounded-full shadow shadow-white text-center text-xl  font-bold text-gray-900 bg-[#F9FAFB]`}
                          keyboardType="number-pad"
                          maxLength={1}
                          value={otpArray[index]}
                          onChangeText={(text) => handleChangeText(text, index)}
                          onKeyPress={(e) => handleKeyPress(e, index)}
                          selectTextOnFocus
                        />
                      ))}
                  </View>
                )}
              />

              {/* Error Message */}
              {errors.otp && (
                <Text style={tw`text-xs text-red-500 text-center mb-4`}>
                  {errors.otp.message}
                </Text>
              )}

              {/* Resend Code Section */}
              <View style={tw`flex-row justify-between items-center mt-2`}>
                <View>
                  <Text style={tw`text-sm text-gray-500`}>
                    Resend {timer > 0 ? `(${timer}s)` : ""}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleResendCode}
                  disabled={timer > 0 || isResending}
                  activeOpacity={0.7}
                >
                  {isResending ? (
                    <ActivityIndicator size="small" color="#5B7410" />
                  ) : (
                    <Text
                      style={tw`text-sm font-semibold ${
                        timer > 0 ? "text-gray-400" : "text-[#5B7410]"
                      }`}
                    >
                      Send code again
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <View style={tw`mt-8`}>
              <Button
                onPress={handleSubmit(onSubmit)}
                text="Continue"
                disabled={isSubmitting}
                isLoading={isLoading || fLoading}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
