import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { FormInput } from "@/components/ui/EmailField";
import { FormCheckbox } from "@/components/ui/FormCheckbox";
import { FormPasswordInput } from "@/components/ui/FormPasswordInput";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { googleIcon } from "../../../lib/icon";
import tw from "../../../lib/tailwind";

interface RegistrationFormInputs {
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

export default function Registration() {
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

  const watchPassword = watch("password");

  const onSubmit = (data: RegistrationFormInputs) => {
    // Execute registration request/navigation here
  };

  const handleNavigate = () => {
    router.push("/(auth)/otp-verify?page_name=registration");
  };

  return (
    <View style={tw`flex-1 bg-bgOlive`}>
      <View style={tw`flex-1`}>
        {/* Header Section */}
        <View style={tw` relative overflow-hidden  mb-1   `}>
          {/* Absolute Decorative Background Image (Top Right) */}
          {/* <Image
            source={require("../../../assets/images/world.png")}
            style={tw`absolute   -right-10 w-[274px] h-[274px] opacity-90`}
            resizeMode="contain"
          /> */}

          {/* Header Content */}
          <View style={tw`z-10 pr-20`}>
            {/* Back Button */}
            <View style={tw``}>
              <BackButton />
            </View>

            {/* Title & Subtitle */}
            <View style={tw` px-5`}>
              <Text style={tw`text-white text-2xl font-semibold mb-1.5`}>
                Create your account
              </Text>
              <Text style={tw`text-white/80 text-sm mt-3`}>
                Register to continue your journey with us
              </Text>
            </View>
          </View>
        </View>

        {/* White Form Container */}
        <View style={tw`flex-1 bg-white rounded-t-[36px] mt-10 px-6 pt-6 `}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-20`}
            keyboardShouldPersistTaps="handled"
          >
            {/* Email Address */}
            <View style={tw` mb-4.5`}>
              <FormInput
                name="identifier"
                label="Email Address"
                control={control as any}
                errors={errors}
                placeholder="Enter Your Email"
                keyboardType="email-address"
                autoCapitalize="none"
                // rules={{
                //   required: "Email  is required",
                //   validate: (value) => {
                //     const isEmail = /\S+@\S+\.\S+/.test(value);
                //     const isPhone = /^[0-9+\s-]{8,15}$/.test(value);
                //     return isEmail || isPhone || "Enter a valid email address ";
                //   },
                // }}
              />
            </View>

            {/* Password */}
            <View style={tw`mb-4.5`}>
              <FormPasswordInput
                name="password"
                label="Password"
                control={control as any}
                errors={errors}
                // rules={{
                //   required: "Password is required",
                //   minLength: {
                //     value: 6,
                //     message: "Password must be at least 6 characters",
                //   },
                // }}
              />
            </View>

            {/* Confirm Password */}
            <View style={tw`mb-2`}>
              <FormPasswordInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter password"
                control={control as any}
                errors={errors}
                // rules={{
                //   required: "Please confirm your password",
                //   validate: (val) =>
                //     val === watch("password") || "Passwords do not match",
                // }}
              />
            </View>

            <View style={tw``}>
              {/* Remember me Checkbox */}
              <FormCheckbox
                name="acceptTerms"
                label="Remember me"
                control={control as any}
                containerStyle=""
                activeColor="#5A7314"
                rules={{
                  validate: (value) =>
                    value === true || "You must accept terms to continue",
                }}
              />
            </View>

            {/* Sign up Button */}
            <View style={tw`mt-5`}>
              <Button onPress={handleNavigate} text="Sign up" />
            </View>

            {/* Divider */}
            <View style={tw`flex-row items-center`}>
              <View style={tw`flex-1 h-[1px] bg-gray-100`} />
              <Text style={tw`mx-3 text-xs text-gray-400`}>
                or continue with
              </Text>
              <View style={tw`flex-1 h-[1px] bg-gray-100`} />
            </View>

            {/* Continue with Google Button */}
            <View style={tw`flex-row justify-center items-center gap-x-4 mt-6`}>
              <TouchableOpacity
                style={tw` flex flex-row items-center justify-center gap-x-1.5 border border-[#D2D2D2]  px-24 py-4 rounded-[8px] `}
                onPress={() => {}}
              >
                <SvgXml xml={googleIcon} width={18} height={18} />
                <Text style={tw`text-sm font-medium text-[#969696]`}>
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer Text */}
            <View style={tw`flex-row justify-center items-center mt-4 `}>
              <Text style={tw`text-xs text-gray-400`}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(auth)/login");
                }}
              >
                <Text style={tw`text-xs font-bold text-[#5d7a12]`}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
