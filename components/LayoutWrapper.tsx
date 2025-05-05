import { ReactNode } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ height: "100%" }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
