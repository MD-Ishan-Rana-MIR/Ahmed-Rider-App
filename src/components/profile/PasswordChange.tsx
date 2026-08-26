import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import tw from "../../../lib/tailwind";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";
import { FormPasswordInput } from "../ui/FormPasswordInput";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log("Password Change Request Data:", data);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton title="Change Password" showBackButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-white px-5 pt-5 pb-10`}
      >
        <View style={tw`gap-y-4.5`}>
          {/* Current Password Field */}
          <View style={tw``}>
            <FormPasswordInput
              name="currentPassword"
              label="Current Password"
              placeholder="*******"
              control={control as any}
              errors={errors}
              rules={{
                required: "Current password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />
          </View>

          {/* New Password */}
          <View style={tw``}>
            <FormPasswordInput
              name="newPassword"
              label="New Password"
              placeholder="*******"
              control={control as any}
              errors={errors}
              rules={{
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: (val) =>
                  val !== watch("currentPassword") ||
                  "New password must be different from current password",
              }}
            />
          </View>

          {/* Confirm Password */}
          <View style={tw``}>
            <FormPasswordInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="*******"
              control={control as any}
              errors={errors}
              rules={{
                required: "Please confirm your new password",
                validate: (val) =>
                  val === watch("newPassword") || "Passwords do not match",
              }}
            />
          </View>

          <View style={tw`mt-6`}>
            <Button text="Save" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
