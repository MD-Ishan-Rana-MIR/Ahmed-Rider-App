import DeliverySuccessScreen from "@/components/ui/DeliverySuccesMsg";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();

  const handleHomePress = () => {
    router.replace("/"); // Navigate back to main home screen
  };

  return (
    <DeliverySuccessScreen
      customerName="Shahid Hasan"
      orderId="#2511K526"
      deliveredAt="Jun 4, 2026"
      onBackToHome={handleHomePress}
    />
  );
}
