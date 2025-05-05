import { ReactNode } from "react";
import { ScrollView, View } from "react-native";

export default function LayoutWrapper2({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      contentContainerStyle={{ height: "100%", backgroundColor: "#F46A62" }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="bg-white flex-1 rounded-t-[32px] pt-[36px] px-4">
        {children}
      </View>
    </ScrollView>
  );
}
