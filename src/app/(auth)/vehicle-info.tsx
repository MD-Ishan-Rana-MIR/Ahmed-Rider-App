import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { FormDocumentPicker } from "@/components/ui/FormDocumentPicker";
import { useRiderDocumentUploadMutation } from "@/redux/authApi";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { errorMsg } from "../../../lib/errorMessage";
import { successMsg } from "../../../lib/successMsg";
import tw from "../../../lib/tailwind";

interface VehicleInfoFormInputs {
  license_image: string;
  national_id_image: string;
}

export default function VechileInfo() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleInfoFormInputs>({
    defaultValues: {
      license_image: "",
      national_id_image: "",
    },
  });

  const [riderDocumentUpload, { isLoading }] = useRiderDocumentUploadMutation();

  const { page_name } = useLocalSearchParams<{ page_name?: string }>();

  const handleNavigate = async (data: VehicleInfoFormInputs) => {
    try {
      const formData = new FormData();

      const licenseResponse = await fetch(data.license_image);
      const licenseBlob = await licenseResponse.blob();

      formData.append("license_image", licenseBlob, "license_image.jpeg");

      const nidResponse = await fetch(data.national_id_image);
      const nidBlob = await nidResponse.blob();

      formData.append("national_id_image", nidBlob, "national_id_image.jpeg");

      const res = await riderDocumentUpload(formData).unwrap();
      if (res) {
        successMsg(res?.message);
        return router.push("/(auth)/add-payout");
      }
    } catch (error: any) {
      errorMsg(error?.message || "Something went wrong while uploading");
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton title="Vehicle Information" />
      <View style={tw`px-5 mt-5`}>
        <FormDocumentPicker
          name="license_image"
          label="Driver's License"
          placeholder="Upload your license"
          control={control as any}
          errors={errors}
          rules={{ required: "Driver's license is required" }}
        />

        <View style={tw`mt-4`}>
          <FormDocumentPicker
            name="national_id_image"
            label="National ID"
            placeholder="Upload your national ID"
            control={control as any}
            errors={errors}
            rules={{ required: "National ID is required" }}
          />
        </View>

        <View style={tw`mt-7.5`}>
          <Button
            text="Continue"
            isLoading={isLoading}
            onPress={handleSubmit(handleNavigate)}
          />
        </View>
      </View>
    </View>
  );
}
