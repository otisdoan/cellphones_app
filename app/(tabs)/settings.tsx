import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggleSwitch from "@/components/ui/ThemeToggleSwitch";

export default function SettingsScreen() {
  return (
    <SafeAreaView>
      <View className="p-4 gap-4">
        <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
          Giao diện
        </Text>
        <View className="flex-row items-center justify-between bg-white dark:bg-neutral-900 rounded-2xl p-4">
          <Text className="text-neutral-700 dark:text-neutral-300">Chế độ</Text>
          <ThemeToggleSwitch />
        </View>
      </View>
    </SafeAreaView>
  );
}
