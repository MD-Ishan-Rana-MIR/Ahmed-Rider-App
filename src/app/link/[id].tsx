import About from "@/components/profile/About";
import AccountSetting from "@/components/profile/AccountSetting";
import Notifications from "@/components/profile/Notifications";
import ChangePassword from "@/components/profile/PasswordChange";
import PersonalInformation from "@/components/profile/PersonalInformation";
import PrivacyPolicy from "@/components/profile/PrivacyPolicy";
import TermService from "@/components/profile/TermService";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function ProfileLink() {
  const { id } = useLocalSearchParams();

  if (id === "personal-info") {
    return <PersonalInformation />;
  } else if (id === "setting") {
    return <AccountSetting />;
  } else if (id === "notification") {
    return <Notifications />;
  } else if (id === "password-change") {
    return <ChangePassword />;
  } else if (id === "about") {
    return <About />;
  } else if (id === "privacy") {
    return <PrivacyPolicy />;
  } else if (id === "term") {
    return <TermService />;
  }
}

const styles = StyleSheet.create({});
