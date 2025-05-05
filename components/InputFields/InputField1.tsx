import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputField1Props
  extends Pick<TextInputProps, "placeholder" | "onChangeText" | "value"> {
  inputRef?: React.Ref<TextInput>;
  type?: KeyboardTypeOptions | "Password";
  className?: string;
}

export default function InputField1({
  placeholder,
  onChangeText,
  value,
  inputRef,
  type,
  className,
}: InputField1Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${className}`}>
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        className="bg-[#f2f2f2] rounded-[18px] font-poppins400 h-[50px] pl-6 text-sm"
        placeholderTextColor={"#9F9F9F"}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        keyboardType={type !== "Password" ? type : "default"}
        secureTextEntry={type === "Password" && !showPassword}
      />
    </View>
  );
}
