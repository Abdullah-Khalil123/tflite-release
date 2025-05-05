import { ReactNode } from 'react';
import { Pressable } from 'react-native';

export default function SettingsCardWrapper({
  children,
  onPress,
  className,
}: {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-6 py-4 bg-[#F2F2F2] rounded-[18px] flex-row items-center justify-between ${className}`}
    >
      {children}
    </Pressable>
  );
}
