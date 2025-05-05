import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SvgProps } from "react-native-svg";

export interface ResizingButtonProps {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  Icon?: React.FC<SvgProps>;
  isDisabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  scale?: number;
  title: string;
  className?: string;
  textStyles?: string;
}

const DURATION = 300;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 18,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  title: {
    color: "red",
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "600",
  },
});

export const ResizingButton = ({
  accessibilityHint,
  accessibilityLabel,
  Icon,
  isDisabled = false,
  isLoading = false,
  onPress,
  scale = 0.95,
  title,
  className,
  textStyles,
}: ResizingButtonProps) => {
  const transition = useSharedValue(0);
  const isActive = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(transition.value, [0, 1], [1, scale]),
      },
    ],
  }));

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{
        busy: isLoading,
        disabled: isDisabled || isLoading,
      }}
      disabled={isDisabled || isLoading}
      hitSlop={16}
      onPress={onPress}
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
        style={[
          styles.container,
          animatedStyle,
          {
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
        className={`${className}`}
      >
        {isLoading ? (
          <ActivityIndicator color={"red"} size={18} />
        ) : (
          <>
            {Icon && <Icon />}
            <Text numberOfLines={1} className={`font-poppins500 ${textStyles}`}>
              {title}
            </Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};
