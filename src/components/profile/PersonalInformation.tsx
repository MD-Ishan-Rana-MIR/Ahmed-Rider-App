import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../../../lib/tailwind";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";
import DriverLicense from "../ui/DriverLicense";
import { FormDatePicker } from "../ui/FormDatePicker";
import { FormGenderSelect } from "../ui/FormGenderSelect";
import { FormPhoneInput } from "../ui/FormPhoneInput";
import { FormTextInput } from "../ui/FormTextInput";

interface RegistrationFormInputs {
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

export default function PersonalInformation() {
  // Avatar Image State
  const [profileImage, setProfileImage] = useState<string>(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
  );

  // Date Picker States

  // 1. Image Picker Handler
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({
    defaultValues: {
      role: "E commerce product seller",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`flex-1 bg-white`,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      {/* Top Navigation Bar */}
      <BackButton title="Personal Information" showBackButton={true} />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={80}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`bg-white px-5 pt-5 pb-10`}
        >
          {/* Avatar Section */}
          <View style={tw`items-center mb-8`}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handlePickImage}
              style={tw`relative`}
            >
              {/* Double Border Circle Wrapper */}
              <View
                style={tw`w-24 h-24 rounded-full p-1 border-2 border-[#F25C05] items-center justify-center overflow-hidden`}
              >
                <Image
                  source={{ uri: profileImage }}
                  style={tw`w-full h-full rounded-full`}
                />
              </View>

              {/* Plus Icon Overlay */}
              <View
                style={tw`absolute bottom-0 right-0 bg-black w-6 h-6 rounded-full items-center justify-center border-2 border-white`}
              >
                <Ionicons name="add" size={14} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            {/* Label under Avatar */}
            <TouchableOpacity activeOpacity={0.7} onPress={handlePickImage}>
              <Text style={tw`text-xs font-semibold text-gray-800 mt-2.5`}>
                Change Your Profile Picture
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Name */}

          {/* Form Inputs Container */}
          <View style={tw` gap-y-4.5 `}>
            {/* Full Name Input */}

            <FormTextInput
              name="full_name"
              label="Full Name"
              control={control as any}
              errors={errors}
              placeholder="Enter your name"
              rules={{ required: "First name is required" }}
            />

            {/* Phone Number Input */}
            <View style={tw``}>
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

            {/* Gender Selector Dropdown */}
            <View>
              <FormGenderSelect
                name="gender"
                label="Gender"
                control={control as any}
                errors={errors}
                placeholder="Select Gender"
                // rules={{ required: "Gender selection is required" }}
              />
            </View>

            {/* Date of Birth Native Picker */}
            <View>
              <FormDatePicker
                name="dob"
                label="Date of Birth"
                placeholder="DD/MM/YY"
                control={control as any}
                errors={errors}
                // rules={{ required: "Date of birth is required" }}
              />
            </View>

            {/* Address Input */}
            <View>
              <FormTextInput
                name="address"
                label="Address"
                control={control as any}
                errors={errors}
                placeholder="Enter your address"
                // rules={{ required: "Address is required" }}
              />
            </View>
            <DriverLicense
              name="driversLicense"
              label="Driver's License"
              placeholder="Driving license"
              control={control as any}
              errors={errors}
              rules={{ required: "Driver's license is required" }}
            />

            <DriverLicense
              name="nationalId"
              label="National ID"
              placeholder="National ID/Passport"
              control={control as any}
              errors={errors}
              rules={{ required: "National ID is required" }}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={tw`px-5`}>
        <Button text="Save" />
      </View>
    </View>
  );
}
