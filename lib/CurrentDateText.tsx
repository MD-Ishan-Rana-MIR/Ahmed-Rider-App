import { useEffect, useState } from "react";
import { Text } from "react-native";
import tw from "./tailwind";

export const CurrentDateText = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const formatDate = () => {
      const now = new Date();
      // Formats to: "Tuesday, December 26"
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      return now.toLocaleDateString("en-US", options);
    };

    setCurrentDate(formatDate());
  }, []);

  return (
    <Text style={tw`mt-1 text-[10px] text-white font-medium`}>
      {currentDate}
    </Text>
  );
};
