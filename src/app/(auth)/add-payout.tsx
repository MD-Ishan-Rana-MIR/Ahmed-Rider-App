import BackButton from "@/components/ui/BackButton";
import {
  PaymentCardForm,
  PaymentFormValues,
} from "@/components/ui/PaymentCardInfo";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import tw from "../../../lib/tailwind";

export default function AddPayout() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      validUntil: "",
      cvv: "",
      saveCard: false,
    },
  });

  const onSubmit = (data: PaymentFormValues) => {};

  return (
    <View style={tw`bg-white flex-1`}>
      <BackButton title="Add Payout Wallet" />
      <View style={tw` p-5  `}>
        <PaymentCardForm control={control as any} errors={errors} />
      </View>
    </View>
  );
}
