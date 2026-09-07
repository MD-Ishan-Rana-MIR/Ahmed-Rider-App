import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import tw from "twrnc";

interface FormPhoneInputProps extends Omit<
  TextInputProps,
  "onChangeText" | "value"
> {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  label?: string;
  rules?: RegisterOptions;
  containerStyle?: string;
}

export const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
  name,
  control,
  errors,
  label = "Phone Number",
  rules,
  containerStyle = "",
  placeholder = "+1 (555) 000-0000",
  placeholderTextColor = "#9CA3AF",
  ...textInputProps
}) => {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <View style={tw`${containerStyle}`}>
      {label && <Text style={tw`text-sm text-[#757575]  mb-1.5`}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={tw`flex-row items-center border ${
              errorMessage ? "border-red-500" : "border-gray-200"
            } rounded-full px-4 py-3 bg-white`}
          >
            <TextInput
              value={value}
              onChangeText={(text) => {
                // Strips out any character that isn't a digit, space, plus, dash, or parenthesis
                const cleanedText = text.replace(/[^0-9+\s()-]/g, "");
                onChange(cleanedText);
              }}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              style={tw`flex-1 text-sm text-gray-800 p-0`}
              {...textInputProps}
            />
          </View>
        )}
      />

      {errorMessage && (
        <Text style={tw`text-xs text-red-500 mt-1 ml-2`}>{errorMessage}</Text>
      )}
    </View>
  );
};
