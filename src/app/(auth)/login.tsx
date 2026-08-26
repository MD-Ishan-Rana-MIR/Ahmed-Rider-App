// import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import { useForm } from "react-hook-form";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SvgXml } from "react-native-svg";

import { googleIcon } from "../../../lib/icon";

import BackButton from "@/components/ui/BackButton";
import { FormInput } from "@/components/ui/EmailField";
import { FormCheckbox } from "@/components/ui/FormCheckbox";
import { FormPasswordInput } from "@/components/ui/FormPasswordInput";
import tw from "../../../lib/tailwind";

interface LoginFormInputs {
  identifier: string;

  password: string;

  rememberMe: boolean;
}

const Login = () => {
  const {
    control,

    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      identifier: "",

      password: "",

      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    router.push("/(tab)");

    // Execute login routing/mutation here
  };

  const handleNavigate = () => {
    router.push("/(tab)");
  };

  return (
    <View style={tw` bg-bgOlive flex-1  `}>
      {/* back button  */}

      <View
        style={tw`
           relative overflow-hidden  mb-1  `}
      >
        {/* Absolute Decorative Background Image (Top Right) */}

        {/* <Image
          source={require("../../../assets/images/world.png")}
          style={tw`absolute  -right-24 w-60 h-94 opacity-90`}
          resizeMode="contain"
        /> */}

        {/* Header Content */}

        <View style={tw`z-10 pr-20`}>
          {/* Back Button */}

          <View style={tw``}>
            <BackButton />
          </View>

          {/* Title & Subtitle */}

          <View style={tw` px-5 `}>
            <Text style={tw`text-white text-2xl font-semibold mb-1.5`}>
              Welcome Back
            </Text>

            <Text style={tw`text-white/80 text-sm mt-3`}>
              It is quick and easy to log in. Enter your email and password
              below.
            </Text>
          </View>
        </View>
      </View>

      {/* Login From  */}

      <View
        style={tw`bg-white flex-1 mt-10  px-5 rounded-tl-[37px] rounded-tr-[37px]`}
      >
        <View style={tw`gap-6`}>
          {/* Header Title */}

          <View></View>

          {/* Form Fields */}

          <View style={tw``}>
            {/* Phone/Email Address Input */}

            <FormInput
              name="identifier"
              label="Email Address"
              control={control as any}
              errors={errors}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              // rules={{
              //   required: "Email or phone number is required",
              //   validate: (value) => {
              //     const isEmail = /\S+@\S+\.\S+/.test(value);
              //     const isPhone = /^[0-9+\s-]{8,15}$/.test(value);
              //     return (
              //       isEmail ||
              //       isPhone ||
              //       "Enter a valid email address or phone number"
              //     );
              //   },
              // }}
            />

            {/* Password Input */}

            <View style={tw`mt-4.5`}>
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

            {/* Remember Me & Forgot Password Row */}

            <View style={tw`flex-row items-center justify-between  mt-2 `}>
              {/* Remember Me Checkbox */}

              <FormCheckbox
                name="acceptTerms"
                label="Remember me"
                control={control as any}
                containerStyle=""
                activeColor="#5A7314"
                // rules={{
                //   validate: (value) =>
                //     value === true || "You must accept terms to continue",
                // }}
              />

              {/* Forgot Password Link */}

              <TouchableOpacity
                onPress={() => {
                  router.push("/(auth)/email-verify?page_name===forgate");
                }}
              >
                <Text style={tw`text-sm font-semibold text-[#5A7314]`}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Submit Section */}

        <View style={tw`gap-4 mt-7`}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleNavigate}
            style={tw`bg-[#5A7314] py-4 rounded-full items-center justify-center shadow-sm`}
          >
            <Text style={tw`text-white font-semibold text-base`}>Sign In</Text>
          </TouchableOpacity>

          {/* or continue with */}

          <View style={tw` mt-7 flex-row items-center justify-center gap-x-2 `}>
            <Text style={tw`flex-1 h-[1px] bg-[#D2D2D2]`}></Text>

            <Text style={tw` text-[#AEAEAE] text-sm `}>or continue with</Text>

            <Text style={tw`flex-1 h-[1px] bg-[#D2D2D2]`}></Text>
          </View>

          {/* Login With Social Media Buttons */}

          <View style={tw`flex-row justify-center items-center gap-x-4 mt-6`}>
            <TouchableOpacity
              style={tw` flex flex-row items-center justify-center gap-x-1.5 border border-[#D2D2D2]  px-28 py-4 rounded-[8px] `}
              onPress={() => {}}
            >
              <SvgXml xml={googleIcon} width={18} height={18} />

              <Text style={tw`text-sm font-medium text-[#969696]`}>
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}

          <View style={tw`flex-row justify-center items-center gap-1 mt-4  `}>
            <Text style={tw`text-sm text-gray-500`}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => {
                router.push("/(auth)/registration");
              }}
            >
              <Text style={tw`text-sm font-bold text-[#5A7314]`}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
