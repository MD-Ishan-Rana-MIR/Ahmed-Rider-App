import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { FormDatePicker } from "@/components/ui/FormDatePicker";
import { FormGenderSelect } from "@/components/ui/FormGenderSelect";
import { FormPhoneInput } from "@/components/ui/FormPhoneInput";
import { FormTextInput } from "@/components/ui/FormTextInput";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import tw from "../../../lib/tailwind";

interface ProfileUpdate {
  full_name: string;
  phone_number: string;
  gender: string;
  date_of_birth: string;
  address: string;
}

export default function ProfileSetUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdate>({
    defaultValues: {
      full_name: "",
      phone_number: "",
      gender: "",
      date_of_birth: "",
      address: "",
    },
  });

  const { page_name } = useLocalSearchParams<{ page_name?: string }>();

  console.log("page_name", page_name);

  const handleNavigate = () => {
    if (page_name === "profile_setup") {
      return router.push("/(auth)/vehicle-info?page_name===vechileinfo");
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* header option  */}

      <BackButton title="Profile set-up" />

      <View style={tw`mt-5 px-5`}>
        {/* Full Name  */}

        <FormTextInput
          name="full_name"
          label="Full Name"
          control={control as any}
          errors={errors}
          placeholder="Enter your name"
          rules={{ required: "First name is required" }}
        />

        <View style={tw`mt-4.5`}>
          <FormPhoneInput
            name="phone_number"
            label="Phone Number"
            control={control as any}
            errors={errors}
            placeholder="Enter your phone number"
            // rules={{
            //   required: "Phone number is required",
            //   validate: (val) => {
            //     // Strips non-digits to check actual digit count (standard 7 to 15 digits)
            //     const digitsOnly = val?.replace(/\D/g, "") || "";
            //     if (digitsOnly.length < 7 || digitsOnly.length > 15) {
            //       return "Please enter a valid phone number (7-15 digits)";
            //     }
            //     return true;
            //   },
            // }}
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
              // rules={{ required: "Gender selection is required" }}
            />
          </View>
          <View style={tw`w-[50%]`}>
            <FormDatePicker
              name="dob"
              label="Date of Birth"
              placeholder="DD/MM/YY"
              control={control as any}
              errors={errors}
              // rules={{ required: "Date of birth is required" }}
            />
          </View>
        </View>

        <View style={tw`mt-4.5`}>
          <FormTextInput
            name="full_name"
            label="Address"
            control={control as any}
            errors={errors}
            placeholder="Enter your name"
            // rules={{ required: "Address is required" }}
          />
        </View>

        <View style={tw`mt-7`}>
          <Button text="Continue" onPress={handleNavigate} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
