import { ResizingButton } from "@/components/Buttons/resizable";
import Heading from "@/components/Heading";
import InputField1 from "@/components/InputFields/InputField1";
import LayoutWrapper2 from "@/components/LayoutWrapper2";
import { useState } from "react";

export default function ChangePasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <LayoutWrapper2>
      <Heading title="Change password" className="mb-6" />
      <InputField1
        value={password}
        onChangeText={() => setPassword(password)}
        placeholder="Enter new password"
        className="mb-6"
      />
      <InputField1
        value={confirmPassword}
        onChangeText={() => setConfirmPassword(confirmPassword)}
        placeholder="Confirm new password"
        className="mb-11"
      />
      <ResizingButton
        onPress={() => {}}
        title="Confirm"
        isLoading={false}
        isDisabled={false}
        className="bg-[#F46A62] py-4"
        textStyles="text-white"
      />
    </LayoutWrapper2>
  );
}
