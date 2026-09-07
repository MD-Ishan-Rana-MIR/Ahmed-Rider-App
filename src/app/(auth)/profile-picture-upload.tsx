import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { useRiderProfileImageAndNumberMutation } from "@/redux/authApi";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { errorMsg } from "../../../lib/errorMessage";
import { successMsg } from "../../../lib/successMsg";
import tw from "../../../lib/tailwind";

interface ProfilePictureFormValues {
  profile_picture: string;
}

interface ProfilePictureUploadProps {
  onAddPicture?: (uri: string) => void;
}

export const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onAddPicture,
}) => {
  const { cardNumber } = useLocalSearchParams();
  const mpesaPayoutNumber = Array.isArray(cardNumber)
    ? cardNumber[0]
    : cardNumber;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfilePictureFormValues>({
    defaultValues: {
      profile_picture: "",
    },
  });

  const [riderProfileImageAndNumber, { isLoading }] =
    useRiderProfileImageAndNumberMutation();

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Camera roll permissions are needed to select a profile picture.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      const selectedUri = result.assets[0].uri;
      setValue("profile_picture", selectedUri, { shouldValidate: true });
      if (onAddPicture) {
        onAddPicture(selectedUri);
      }
    }
  };

  const onSubmit = async (data: ProfilePictureFormValues) => {
    const formData = new FormData();

    const licenseResponse = await fetch(data.profile_picture);
    const licenseBlob = await licenseResponse.blob();
    formData.append("profile_picture", licenseBlob, "profile.jpeg");
    formData.append("mpesa_payout_number", mpesaPayoutNumber);

    try {
      const res = await riderProfileImageAndNumber(formData).unwrap();
      if (res) {
        router.push("/(tab)");
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

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Top Header */}
      <BackButton title="Profile picture" />

      {/* Main Container */}
      <View style={tw`flex-1 px-5 py-6 justify-between`}>
        {/* Centered Avatar Area */}
        <View style={tw`flex-1 justify-center items-center`}>
          <Controller
            control={control}
            name="profile_picture"
            rules={{ required: "Profile picture is required" }}
            render={({ field: { value } }) => (
              <>
                <Pressable onPress={handlePickImage} style={tw`relative`}>
                  {/* Orange Outer Ring & Avatar Container */}
                  <View
                    style={tw`w-40 h-40 rounded-full border-2 border-[#FF6B00] items-center justify-center bg-[#D0D7DE] overflow-hidden`}
                  >
                    {value ? (
                      <Image
                        source={{ uri: value }}
                        style={tw`w-full h-full`}
                        resizeMode="cover"
                      />
                    ) : (
                      <FontAwesome
                        name="user"
                        size={110}
                        color="#FFFFFF"
                        style={tw`mt-6`}
                      />
                    )}
                  </View>

                  {/* Edit Pencil Badge */}
                  <View
                    style={tw`absolute bottom-1 right-1 w-9 h-9 bg-[#FF6B00] rounded-full items-center justify-center border-2 border-white`}
                  >
                    <Octicons name="pencil" size={16} color="white" />
                  </View>
                </Pressable>

                {errors.profile_picture && (
                  <Text style={tw`text-xs text-red-500 mt-3`}>
                    {errors.profile_picture.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        {/* Bottom Action Button */}
        <View style={tw`w-full mb-4`}>
          <Button
            text="Add Picture"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfilePictureUpload;
