import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { FormDocumentPicker } from "@/components/ui/FormDocumentPicker";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import tw from "../../../lib/tailwind";

interface DatePickerType {
  driver_license: string;
  national_id: string;
}

export default function VechileInfo() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DatePickerType>({
    defaultValues: {},
  });
  const { page_name } = useLocalSearchParams<{ page_name?: string }>();

  const handleNavigate = () => {
    if (page_name === "==vechileinfo") {
      return router.push("/(auth)/add-payout?page_name===add-payout");
    }
  };

  console.log("page_name", page_name);
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton title="Vehicle Information" />
      <View style={tw`px-5 mt-5`}>
        <FormDocumentPicker
          name="driversLicense"
          label="Driver's License"
          placeholder="Upload your license"
          control={control as any}
          errors={errors}
          // rules={{ required: "Driver's license is required" }}
        />

        <View style={tw`mt-4`}>
          <FormDocumentPicker
            name="nationalId"
            label="National ID"
            placeholder="Upload your national ID"
            control={control as any}
            errors={errors}
            // rules={{ required: "National ID is required" }}
          />
        </View>

        <View style={tw` mt-7.5 `}>
          <Button text="Continue" onPress={handleNavigate} />
        </View>
      </View>
    </View>
  );
}
