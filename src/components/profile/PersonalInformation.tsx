import {
  useRiderProfileQuery,
  useRiderProfileUpdateMutation,
} from "@/redux/authApi";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { errorMsg } from "../../../lib/errorMessage";
import { successMsg } from "../../../lib/successMsg";
import tw from "../../../lib/tailwind";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";

interface ProfileUpdateForm {
  name: string;
  phone_number: string;
  gender: string;
  dob: string;
  address: string;
  profile_picture?: string;
}

const GENDER_OPTIONS = ["Male", "Female", "Other"];

export default function PersonalInformation() {
  const { data: profileResponse, isLoading: profileLoading } =
    useRiderProfileQuery({});
  const [riderProfileUpdate, { isLoading: isUpdating }] =
    useRiderProfileUpdateMutation();

  const profile = profileResponse?.data || "";

  const [profileImage, setProfileImage] = useState<string>();

  // Modal & Picker Local States
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileUpdateForm>({
    defaultValues: {
      name: "",
      phone_number: "",
      gender: "",
      dob: "",
      address: "",
      profile_picture: "",
    },
  });

  // Sync API Data to Form State & Image State
  useEffect(() => {
    if (profile) {
      reset({
        name: profile?.name || "",
        phone_number: profile?.rider_profile?.phone_number || "",
        gender: profile?.rider_profile?.gender || "",
        dob: profile?.rider_profile?.dob || "",
        address: profile?.rider_profile?.address || "",
        profile_picture: "",
      });

      const avatar = profile?.profile_photo_url;

      if (avatar) {
        setProfileImage(avatar);
      }
    }
  }, [profile, reset]);


  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      errorMsg("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      const selectedUri = result.assets[0].uri;
      setProfileImage(selectedUri);
      setValue("profile_picture", selectedUri, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: ProfileUpdateForm) => {
    const formData = new FormData();

    formData.append("name", data?.name || "");
    formData.append("phone_number", data?.phone_number || "");
    formData.append("gender", data?.gender || "");
    formData.append("dob", data?.dob || "");
    formData.append("address", data?.address || "");

    if (data.profile_picture) {
      const licenseResponse = await fetch(data.profile_picture);
      const licenseBlob = await licenseResponse.blob();

      formData.append("profile_picture", licenseBlob, "profiler.jpeg");
    }

    try {
      const res = await riderProfileUpdate(formData).unwrap();
      successMsg(res?.message || "Profile updated successfully!");
    } catch (error) {
      errorMsg(
        error && typeof error === "object" && "data" in error
          ? ((error as { data?: { message?: string } }).data?.message ??
              String(error))
          : error instanceof Error
            ? error.message
            : String(error),
      );
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`flex-1 bg-white`,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      {/* Header */}
      <View style={tw``}>
        <BackButton showBackButton={true} title="Personal Information" />
      </View>

      {/* Top Navigation Bar */}
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
              <View
                style={tw`w-24 h-24 rounded-full p-1 border-2 border-[#F25C05] items-center justify-center overflow-hidden`}
              >
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={tw`w-full h-full rounded-full`}
                  />
                ) : (
                  <View
                    style={tw`w-full h-full bg-gray-200 rounded-full items-center justify-center`}
                  >
                    <Ionicons name="person" size={40} color="#9CA3AF" />
                  </View>
                )}
              </View>

              <View
                style={tw`absolute bottom-0 right-0 bg-black w-6 h-6 rounded-full items-center justify-center border-2 border-white`}
              >
                <Ionicons name="add" size={14} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={handlePickImage}>
              <Text style={tw`text-xs font-semibold text-[#ACACAC] mt-2.5`}>
                Change Your Profile Picture
              </Text>
            </TouchableOpacity>
          </View>

          {/* Direct Input Fields */}
          <View style={tw`gap-y-4.5`}>
            {/* Full Name */}
            <View>
              <Text style={tw`text-sm text-[#757575] font-medium mb-1.5`}>
                Full Name
              </Text>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Full name is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={tw`flex-row items-center border ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } rounded-full px-4 py-3 bg-white`}
                  >
                    <TextInput
                      value={value || ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your name"
                      placeholderTextColor="#ACACAC"
                      style={tw`flex-1 text-sm text-gray-900 p-0`}
                    />
                  </View>
                )}
              />
              {errors.name && (
                <Text style={tw`text-xs text-red-500 mt-1 ml-2`}>
                  {errors.name.message}
                </Text>
              )}
            </View>

            {/* Phone Number */}
            <View>
              <Text style={tw`text-sm text-[#757575] font-medium mb-1.5`}>
                Phone Number
              </Text>
              <Controller
                control={control}
                name="phone_number"
                rules={{
                  required: "Phone number is required",
                  validate: (val) => {
                    const digitsOnly = val?.replace(/\D/g, "") || "";
                    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
                      return "Please enter a valid phone number (7-15 digits)";
                    }
                    return true;
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={tw`flex-row items-center border ${
                      errors.phone_number ? "border-red-500" : "border-gray-200"
                    } rounded-full px-4 py-3 bg-white`}
                  >
                    <TextInput
                      value={value || ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#ACACAC"
                      keyboardType="phone-pad"
                      style={tw`flex-1 text-sm text-gray-900 p-0`}
                    />
                  </View>
                )}
              />
              {errors.phone_number && (
                <Text style={tw`text-xs text-red-500 mt-1 ml-2`}>
                  {errors.phone_number.message}
                </Text>
              )}
            </View>

            {/* Gender Dropdown Input */}
            <View>
              <Text style={tw`text-sm text-[#757575] font-medium mb-1.5`}>
                Gender
              </Text>
              <Controller
                control={control}
                name="gender"
                rules={{ required: "Gender selection is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setGenderModalVisible(true)}
                      style={tw`flex-row items-center justify-between border ${
                        errors.gender ? "border-red-500" : "border-gray-200"
                      } rounded-full px-4 py-3 bg-white`}
                    >
                      <Text
                        style={tw`text-sm ${
                          value ? "text-gray-900" : "text-[#ACACAC]"
                        }`}
                      >
                        {value || "Select Gender"}
                      </Text>
                      <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
                    </TouchableOpacity>

                    {/* Gender Selection Modal */}
                    <Modal
                      visible={genderModalVisible}
                      transparent
                      animationType="fade"
                      onRequestClose={() => setGenderModalVisible(false)}
                    >
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setGenderModalVisible(false)}
                        style={tw`flex-1 bg-black/50 justify-center px-6`}
                      >
                        <View style={tw`bg-white rounded-2xl p-4 gap-y-2`}>
                          <Text
                            style={tw`text-base font-bold text-gray-900 mb-2`}
                          >
                            Select Gender
                          </Text>
                          {GENDER_OPTIONS.map((item) => (
                            <TouchableOpacity
                              key={item}
                              onPress={() => {
                                onChange(item);
                                setGenderModalVisible(false);
                              }}
                              style={tw`py-3 px-2 rounded-lg flex-row justify-between items-center`}
                            >
                              <Text
                                style={tw`text-sm text-gray-800 font-medium`}
                              >
                                {item}
                              </Text>
                              {value === item && (
                                <Ionicons
                                  name="checkmark"
                                  size={18}
                                  color="#F25C05"
                                />
                              )}
                            </TouchableOpacity>
                          ))}
                        </View>
                      </TouchableOpacity>
                    </Modal>
                  </>
                )}
              />
              {errors.gender && (
                <Text style={tw`text-xs text-red-500 mt-1 ml-2`}>
                  {errors.gender.message}
                </Text>
              )}
            </View>

            {/* Date of Birth Picker Input */}
            <View>
              <Text style={tw`text-sm text-[#757575] font-medium mb-1.5`}>
                Date of Birth
              </Text>
              <Controller
                control={control}
                name="dob"
                rules={{ required: "Date of birth is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setShowDatePicker(true)}
                      style={tw`flex-row items-center justify-between border ${
                        errors.dob ? "border-red-500" : "border-gray-200"
                      } rounded-full px-4 py-3 bg-white`}
                    >
                      <Text
                        style={tw`text-sm ${
                          value ? "text-gray-900" : "text-[#ACACAC]"
                        }`}
                      >
                        {value || "DD/MM/YY"}
                      </Text>
                      <Ionicons
                        name="calendar-outline"
                        size={18}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>

                    {showDatePicker && (
                      <DateTimePicker
                        value={value ? new Date(value) : new Date()}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={(_, selectedDate) => {
                          setShowDatePicker(false);
                          if (selectedDate) {
                            const formatted = selectedDate
                              .toISOString()
                              .split("T")[0];
                            onChange(formatted);
                          }
                        }}
                      />
                    )}
                  </>
                )}
              />
              {errors.dob && (
                <Text style={tw`text-xs text-red-500 mt-1 ml-2`}>
                  {errors.dob.message}
                </Text>
              )}
            </View>

            {/* Address */}
            <View>
              <Text style={tw`text-sm text-[#757575] font-medium mb-1.5`}>
                Address
              </Text>
              <Controller
                control={control}
                name="address"
                rules={{ required: "Address is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={tw`flex-row items-center border ${
                      errors.address ? "border-red-500" : "border-gray-200"
                    } rounded-full px-4 py-3 bg-white`}
                  >
                    <TextInput
                      value={value || ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your address"
                      placeholderTextColor="#ACACAC"
                      style={tw`flex-1 text-sm text-gray-900 p-0`}
                    />
                  </View>
                )}
              />
              {errors.address && (
                <Text style={tw`text-xs text-red-500 mt-1 ml-2`}>
                  {errors.address.message}
                </Text>
              )}
            </View>
          </View>

          {/* Action Button */}
          <View style={tw`mt-6`}>
            <Button
              text="Update"
              onPress={handleSubmit(onSubmit)}
              isLoading={isUpdating || profileLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
}
