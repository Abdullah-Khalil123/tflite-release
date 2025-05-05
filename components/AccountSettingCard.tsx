import { Text } from "react-native";
import SettingsCardWrapper from "./SettingsCard";
import { FC } from "react";
import { SvgProps } from "react-native-svg";

interface AccountSettingCardProps {
  title: string;
  onPress?: () => void;
  className?: string;
  IconSvg: FC<SvgProps>;
}
const AccountSettingCard = ({
  title,
  onPress,
  className,
  IconSvg,
}: AccountSettingCardProps) => {
  return (
    <SettingsCardWrapper onPress={onPress} className={className}>
      <Text className="font-poppins400 text-sm leading-[21px]">{title}</Text>
      <IconSvg />
    </SettingsCardWrapper>
  );
};

export default AccountSettingCard;
