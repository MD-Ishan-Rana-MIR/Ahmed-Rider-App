import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import { Alert, Pressable, Text, View } from "react-native";
import tw from "twrnc";

interface FormDocumentUploadProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  containerStyle?: string;
}

export const DriverLicense: React.FC<FormDocumentUploadProps> = ({
  name,
  control,
  errors,
  label,
  placeholder = "Upload document",
  rules,
  containerStyle = "",
}) => {
  const errorMessage = errors[name]?.message as string | undefined;

  const handlePickDocument = async (onChange: (uri: string) => void) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Gallery permission is needed to upload documents.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View style={tw`${containerStyle}`}>
      {label && (
        <Text style={tw`text-base text-[#6B7280] font-normal mb-1.5`}>
          {label}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Pressable
            onPress={() => handlePickDocument(onChange)}
            style={tw`flex-row items-center justify-between border ${
              errorMessage ? "border-red-500" : "border-[#E5E7EB]"
            } rounded-full px-5 py-3     bg-white shadow-sm`}
          >
            {/* Left Side: Green Checkmark Badge + Input Label */}
            <View style={tw`flex-row items-center flex-1 mr-3`}>
              <View
                style={tw`w-4 h-4 rounded-full ${
                  value ? "bg-[#22C55E]" : "bg-[#22C55E]"
                } items-center justify-center mr-3`}
              >
                <Ionicons name="checkmark" size={10} color="white" />
              </View>

              <Text
                numberOfLines={1}
                style={tw` font-Manrope-Regular.ttf text-xs  text-[#757575] font-normal flex-1`}
              >
                {value ? "Document Attached" : placeholder}
              </Text>
            </View>

            {/* Right Side: Cloud Upload Icon */}
            <View style={tw`items-center justify-center`}>
              <FontAwesome5 name="cloud-upload-alt" size={16} color="#6B7280" />
            </View>
          </Pressable>
        )}
      />

      {errorMessage && (
        <Text style={tw`text-xs text-red-500 mt-1 ml-4`}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default DriverLicense;
