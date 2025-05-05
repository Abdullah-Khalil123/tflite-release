import { ResizingButton } from "@/components/Buttons/resizable";
import Heading from "@/components/Heading";
import InputField1 from "@/components/InputFields/InputField1";
import LayoutWrapper2 from "@/components/LayoutWrapper2";
import { useState } from "react";

export default function ChangeEmailScreen() {
  const [email, setEmail] = useState("");
  return (
    <LayoutWrapper2>
      <Heading title="Change email" className="mb-6" />
      <InputField1
        value={email}
        onChangeText={() => setEmail(email)}
        placeholder="Enter new email"
        className="mb-6"
      />

      <ResizingButton
        onPress={() => {}}
        title="Send Verification"
        isLoading={false}
        isDisabled={false}
        className="bg-[#F46A62] py-4"
        textStyles="text-white"
      />
    </LayoutWrapper2>
  );
}
