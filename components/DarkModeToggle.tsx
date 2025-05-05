import { Text, View } from "react-native";
import SettingsCardWrapper from "./SettingsCard";

export default function DarkModeToggle() {
  return (
    <SettingsCardWrapper>
      <Text className="font-poppins400 text-sm leading-[21px]">Dark Mode</Text>
      <View className="h-[31px]"></View>
    </SettingsCardWrapper>
  );
}
