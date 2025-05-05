import { Text } from "react-native";

export default function Heading({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <Text className={`font-poppins500 text-2xl leading-[36px] ${className}`}>
      {title}
    </Text>
  );
}
