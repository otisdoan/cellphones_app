import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "@/components/profile/ProfileCard";

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <View className="p-4 gap-4">
        <ProfileCard />
        <Link
          href="/profile/edit"
          className="bg-neutral-900 dark:bg-white rounded-xl px-4 py-3 items-center"
        >
          <Text className="text-white dark:text-neutral-900 font-semibold">
            Chỉnh sửa
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
