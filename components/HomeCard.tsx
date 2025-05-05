import ArrowSVG from "@/assets/Home/arrow";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface HomeCardProps {
  title: string;
  description: string;
  onPress: () => void;
  className?: string;
}

const DURATION = 300;

export default function HomeCard({
  title,
  description,
  onPress,
  className,
}: HomeCardProps) {
  const transition = useSharedValue(0);
  const isActive = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(transition.value, [0, 1], [1, 0.95]),
      },
    ],
  }));

  return (
    <Pressable
      hitSlop={16}
      onPress={onPress}
      className={`px-9 py-6 rounded-3xl ${className}`}
      onPressIn={() => {
        isActive.value = true;
        transition.value = withTiming(1, { duration: DURATION }, () => {
          if (!isActive.value) {
            transition.value = withTiming(0, {
              duration: DURATION,
            });
          }
        });
      }}
      onPressOut={() => {
        if (transition.value === 1) {
          transition.value = withTiming(0, { duration: DURATION });
        }
        isActive.value = false;
      }}
    >
      <Animated.View
        style={[{}, animatedStyle]}
        className={"flex-row items-center justify-between"}
      >
        <View className="flex-1">
          <Text className="text-white font-poppins500 text-2xl leading-[36px]">
            {title}
          </Text>
          <Text className="text-white text-xs leading-[18px] font-poppins400">
            {description}
          </Text>
        </View>
        <View className="w-[25px]" />
        <View className="w-[34px] h-[25px] bg-black/20 items-center justify-center rounded-xl">
          <ArrowSVG />
        </View>
      </Animated.View>
    </Pressable>
  );
}
