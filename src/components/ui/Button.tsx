import React from "react";
import {
    GestureResponderEvent,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { plusIcon } from "../../../lib/icon";
import tw from "../../../lib/tailwind";

interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
  disabled?: boolean;
  showIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
  disabled,
  showIcon = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={tw`bg-[#5B7410] py-3.5 rounded-full items-center justify-center mb-6 ${
        disabled ? "opacity-50" : "opacity-100"
      }`}
    >
      <View style={tw`flex-row items-center gap-x-2`}>
        {showIcon && <SvgXml xml={plusIcon} width={12} />}
        <Text style={tw`text-white font-semibold text-sm`}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
