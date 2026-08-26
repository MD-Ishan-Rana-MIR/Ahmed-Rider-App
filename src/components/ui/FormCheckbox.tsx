import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import tw from "../../../lib/tailwind";

interface FormCheckboxProps {
  name: string;
  control: Control<any>;
  label: string;
  rules?: RegisterOptions;
  activeColor?: string;
  containerStyle?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  control,
  label,
  rules,
  activeColor = "#5A7314",
  containerStyle = "",
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value = false } }) => (
        <Pressable
          onPress={() => onChange(!value)}
          style={tw`flex-row items-center ${containerStyle}`}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: value }}
        >
          <View
            style={[
              tw`w-4 h-4 rounded border items-center justify-center mr-2`,
              value
                ? { backgroundColor: activeColor, borderColor: activeColor }
                : tw`border-gray-300 bg-white`,
            ]}
          >
            {value && <Ionicons name="checkmark" size={14} color="white" />}
          </View>

          <Text style={tw`text-[10px] font-Manrope-Regular.ttf text-[#ACACAC]`}>
            {label}
          </Text>
        </Pressable>
      )}
    />
  );
};
