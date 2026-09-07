import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

interface DeliveryTimelineData {
  accepted: boolean;
  picked_up: boolean;
  on_the_way: boolean;
  delivered: boolean;
}

interface StepperProps {
  timeline?: DeliveryTimelineData;
}

export default function StaticDeliveryStepper({ timeline }: StepperProps) {
  console.log(timeline);
  // Map API keys directly to UI step configuration
  const steps = [
    {
      key: "accepted",
      label: "Accepted",
      isCompleted: Boolean(timeline?.accepted),
      icon: (color: string) => (
        <Ionicons name="checkmark" size={20} color={color} />
      ),
    },
    {
      key: "picked_up",
      label: "Picked Up",
      isCompleted: Boolean(timeline?.picked_up),
      icon: (color: string) => <Feather name="box" size={18} color={color} />,
    },
    {
      key: "on_the_way",
      label: "On The Way",
      isCompleted: Boolean(timeline?.on_the_way),
      icon: (color: string) => <Feather name="send" size={18} color={color} />,
    },
    {
      key: "delivered",
      label: "Delivered",
      isCompleted: Boolean(timeline?.delivered),
      icon: (color: string) => (
        <Ionicons name="checkmark-done" size={20} color={color} />
      ),
    },
  ];

  return (
    <View style={tw`flex-row items-center justify-between`}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const nextStepIsCompleted = steps[index + 1]?.isCompleted;
        const iconColor = step.isCompleted ? "#FFF" : "#9CA3AF";

        return (
          <React.Fragment key={step.key}>
            {/* Step Circle & Label */}
            <View style={tw`items-center flex-1`}>
              <View
                style={tw`w-10 h-10 rounded-full items-center justify-center mb-1.5 ${
                  step.isCompleted
                    ? "bg-[#34A853]"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                {step.icon(iconColor)}
              </View>

              <Text
                style={tw`text-[11px] font-medium text-center ${
                  step.isCompleted
                    ? "text-gray-900 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </Text>
            </View>

            {/* Connecting Line */}
            {!isLast && (
              <View
                style={tw`h-[2px] flex-1 mx-1 -mt-5 ${
                  step.isCompleted && nextStepIsCompleted
                    ? "bg-[#34A853]"
                    : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}
