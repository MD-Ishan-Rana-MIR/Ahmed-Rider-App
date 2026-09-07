import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { FormDatePicker } from "@/components/ui/FormDatePicker";
import { FormGenderSelect } from "@/components/ui/FormGenderSelect";
import { FormPhoneInput } from "@/components/ui/FormPhoneInput";
import { FormTextInput } from "@/components/ui/FormTextInput";
import { useProfileBasickSetUpMutation } from "@/redux/authApi";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { errorMsg } from "../../../lib/errorMessage";
import { successMsg } from "../../../lib/successMsg";
import tw from "../../../lib/tailwind";

interface ProfileUpdate {
  phone_number: string;
  gender: string;
  dob: string;
  address: string;
  country: string;
  city: string;
}

export default function ProfileSetUp() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdate>({
    defaultValues: {
      phone_number: "",
      dob: "",
      gender: "",
      address: "",
      country: "",
      city: "",
    },
  });

  const { page_name } = useLocalSearchParams<{ page_name?: string }>();

  const [profileBasickSetUp, { isLoading }] = useProfileBasickSetUpMutation();

  const onSubmit = async (data: ProfileUpdate) => {
    try {
      const res = await profileBasickSetUp(data).unwrap();
      if (res) {
        router.push("/(auth)/vehicle-info?page_name===vechileinfo");
        successMsg(res?.message);

        return;
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

    // if (page_name === "profile_setup") {
    //   return router.push("/(auth)/vehicle-info?page_name===vechileinfo");
    // }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* header option  */}

      <BackButton title="Profile set-up" />

      <View style={tw`px-5`}>
        <View style={tw`mt-4.5`}>
          <FormPhoneInput
            name="phone_number"
            label="Phone Number"
            control={control as any}
            errors={errors}
            placeholder="Enter your phone number"
            rules={{
              required: "Phone number is required",
              validate: (val) => {
                // Strips non-digits to check actual digit count (standard 7 to 15 digits)
                const digitsOnly = val?.replace(/\D/g, "") || "";
                if (digitsOnly.length < 7 || digitsOnly.length > 15) {
                  return "Please enter a valid phone number (7-15 digits)";
                }
                return true;
              },
            }}
          />
        </View>

        <View style={tw`mt-4.5 flex flex-row gap-x-3.5 `}>
          <View style={tw`w-[50%]`}>
            <FormGenderSelect
              name="gender"
              label="Gender"
              control={control as any}
              errors={errors}
              placeholder="Select Gender"
              rules={{ required: "Gender selection is required" }}
            />
          </View>
          <View style={tw`w-[50%]`}>
            <FormDatePicker
              name="dob"
              label="Date of Birth"
              placeholder="YY-MM-DD"
              control={control as any}
              errors={errors}
              rules={{ required: "Date of birth is required" }}
            />
          </View>
        </View>

        <View style={tw`mt-4.5`}>
          <FormTextInput
            name="address"
            label="Address"
            control={control as any}
            errors={errors}
            placeholder="Enter your address"
            rules={{ required: "Address is required" }}
          />
        </View>

        <View style={tw`mt-7`}>
          <Button
            text="Continue"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
}
