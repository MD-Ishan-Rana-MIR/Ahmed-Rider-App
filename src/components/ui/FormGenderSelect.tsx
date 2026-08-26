import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Control,
    Controller,
    FieldErrors,
    RegisterOptions,
} from "react-hook-form";
import {
    FlatList,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import tw from "twrnc";

export interface GenderOption {
  label: string;
  value: string;
}

const DEFAULT_GENDER_OPTIONS: GenderOption[] = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

interface FormGenderDropdownProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  label?: string;
  placeholder?: string;
  options?: GenderOption[];
  rules?: RegisterOptions;
  containerStyle?: string;
}

export const FormGenderSelect: React.FC<FormGenderDropdownProps> = ({
  name,
  control,
  errors,
  label,
  placeholder = "Select Gender",
  options = DEFAULT_GENDER_OPTIONS,
  rules,
  containerStyle = "",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <View style={tw`${containerStyle}`}>
      {label && (
        <Text style={tw`text-sm text-gray-700 font-medium mb-1.5`}>
          {label}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          const selectedOption = options.find((opt) => opt.value === value);

          return (
            <>
              {/* Dropdown Field matching the image layout */}
              <Pressable
                onPress={() => setModalVisible(true)}
                style={tw`flex-row items-center justify-between border ${
                  errorMessage ? "border-red-500" : "border-[#EDF1F3]"
                } rounded-full px-5 py-3 bg-white shadow-sm`}
              >
                <Text
                  style={tw`text-base ${
                    selectedOption ? "text-gray-800" : "text-[#ACACAC]"
                  }`}
                >
                  {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#ACACAC" />
              </Pressable>

              {/* Selection Bottom Modal */}
              <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableOpacity
                  style={tw`flex-1 bg-black/40 justify-end`}
                  activeOpacity={1}
                  onPress={() => setModalVisible(false)}
                >
                  <View style={tw`bg-white rounded-t-3xl p-5 max-h-[50%]`}>
                    <View
                      style={tw`w-12 h-1 bg-gray-300 rounded-full self-center mb-4`}
                    />
                    <Text
                      style={tw`text-base font-semibold text-gray-800 mb-3 text-center`}
                    >
                      {label || "Select Option"}
                    </Text>

                    <FlatList
                      data={options}
                      keyExtractor={(item) => item.value}
                      renderItem={({ item }) => {
                        const isSelected = item.value === value;
                        return (
                          <TouchableOpacity
                            style={tw`flex-row items-center justify-between py-3.5 px-4 border-b border-gray-100`}
                            onPress={() => {
                              onChange(item.value);
                              setModalVisible(false);
                            }}
                          >
                            <Text
                              style={tw`text-base ${
                                isSelected
                                  ? "font-bold text-black"
                                  : "text-gray-700"
                              }`}
                            >
                              {item.label}
                            </Text>
                            {isSelected && (
                              <Ionicons
                                name="checkmark"
                                size={20}
                                color="#5A7314"
                              />
                            )}
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
          );
        }}
      />

      {errorMessage && (
        <Text style={tw`text-xs text-red-500 mt-1 ml-2`}>{errorMessage}</Text>
      )}
    </View>
  );
};
