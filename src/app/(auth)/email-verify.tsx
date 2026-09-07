// import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { FormInput } from "@/components/ui/EmailField";
import { useEmailVerifyMutation } from "@/redux/authApi";
import { errorMsg } from "../../../lib/errorMessage";
import { successMsg } from "../../../lib/successMsg";
import tw from "../../../lib/tailwind";

interface EmailVerifyFormInputs {
  email: string;
}

export default function EmailVerify() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmailVerifyFormInputs>({
    defaultValues: {
      email: "",
    },
  });

  const [emailVerify, { isLoading }] = useEmailVerifyMutation();

  const { page_name } = useLocalSearchParams<{ page_name?: string }>();

  const onSubmit = async (_data: EmailVerifyFormInputs) => {
    try {
      const res = await emailVerify(_data).unwrap();
      if (res) {
        router.push(
          `/(auth)/otp-verify?email=${_data?.email}&page_name=f-email-verify`,
        );
        reset();
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
  };

  // const handleNavigate = () => {
  // router.push(`/(auth)/otp-verify?email=${_data?.email}&page_name=f-email-verify`);
  // };

  return (
    <View style={tw`bg-bgOlive flex-1`}>
      {/* Header Decorative & Back Section */}
      <View style={tw`relative overflow-hidden mb-1`}>
        <View style={tw`z-10 pr-20`}>
          <View>
            <BackButton />
          </View>

          {/* Title & Subtitle */}
          <View style={tw`px-5`}>
            <Text style={tw`text-white text-2xl font-semibold mb-1.5`}>
              Forgot Password
            </Text>
            <Text style={tw`text-white/80 text-sm mt-3`}>
              Please enter your email address which was used to create your
              account.
            </Text>
          </View>
        </View>
      </View>

      {/* Form Bottom Sheet Container */}
      <View
        style={tw`bg-white flex-1 px-5 mt-10 rounded-tl-[37px] rounded-tr-[37px]`}
      >
        <View style={tw`gap-6 mt-8`}>
          {/* Email Address Input */}
          <FormInput
            name="email"
            label="Email Address"
            control={control as any}
            errors={errors}
            placeholder="Enter Your Email"
            keyboardType="email-address"
            autoCapitalize="none"
            rules={{
              required: "Email is required",
              validate: (value) =>
                /\S+@\S+\.\S+/.test(value) || "Enter a valid email address",
            }}
          />
        </View>

        {/* Submit Action */}
        <View style={tw`gap-4 mt-7`}>
          <Button
            onPress={handleSubmit(onSubmit)}
            text="Continue"
            disabled={isSubmitting}
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
