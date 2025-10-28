import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useAppTheme } from "@/context/ThemeContext";

export default function ThemeToggleSwitch() {
  const { isDark, toggleTheme } = useAppTheme();
  const progress = useSharedValue(isDark ? 1 : 0);

  React.useEffect(() => {
    progress.value = withSpring(isDark ? 1 : 0, {
      damping: 18,
      stiffness: 180,
    });
  }, [isDark]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["#e5e7eb", "#111827"]
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(progress.value * 22) }],
  }));

  return (
    <Pressable
      onPress={toggleTheme}
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
    >
      <Animated.View
        className="w-14 h-8 rounded-full px-1 justify-center"
        style={trackStyle}
      >
        <Animated.View
          className="w-6 h-6 rounded-full bg-white"
          style={thumbStyle}
        />
      </Animated.View>
      <View className="items-center mt-1">
        <Text className="text-xs text-gray-500">
          {isDark ? "Dark" : "Light"}
        </Text>
      </View>
    </Pressable>
  );
}
