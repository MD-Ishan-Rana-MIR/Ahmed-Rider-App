import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import { Alert, Image, Pressable, Text, View } from "react-native";
import tw from "../../../lib/tailwind";

interface FormDocumentPickerProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  containerStyle?: string;
}

export const FormDocumentPicker: React.FC<FormDocumentPickerProps> = ({
  name,
  control,
  errors,
  label,
  placeholder = "Upload document",
  rules,
  containerStyle = "",
}) => {
  const errorMessage = errors[name]?.message as string | undefined;

  const handlePickImage = async (onChange: (uri: string) => void) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Camera roll permissions are needed to upload documents.",
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
        <Text style={tw`text-sm text-[#757575] font-medium mb-2`}>{label}</Text>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View>
            <Pressable
              onPress={() => handlePickImage(onChange)}
              style={tw`h-[150px] w-full bg-[#F6F6F6] border border-dashed ${
                errorMessage ? "border-red-500" : "border-[#D1D5DB]"
              } rounded-xl items-center justify-center p-4 overflow-hidden`}
            >
              {value ? (
                // Selected Image Preview
                <View
                  style={tw`w-full h-full relative items-center justify-center`}
                >
                  <Image
                    source={{ uri: value }}
                    style={tw`w-full h-full rounded-lg`}
                    resizeMode="cover"
                  />
                  <Pressable
                    onPress={() => onChange("")}
                    style={tw`absolute top-2 right-2 bg-black/60 rounded-full p-1`}
                  >
                    <Feather name="x" size={16} color="white" />
                  </Pressable>
                </View>
              ) : (
                // Upload Prompt
                <View style={tw`items-center justify-center`}>
                  <Feather
                    name="upload"
                    size={28}
                    color="#9CA3AF"
                    style={tw`mb-2`}
                  />
                  <Text style={tw`text-sm text-[#888888] font-regular`}>
                    {placeholder}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        )}
      />

      {errorMessage && (
        <Text style={tw`text-xs text-red-500 mt-1 ml-1`}>{errorMessage}</Text>
      )}
    </View>
  );
};
