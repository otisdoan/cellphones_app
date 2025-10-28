import React from "react";
import { Image, Text, View } from "react-native";
import { useProfile } from "@/context/ProfileContext";

export default function ProfileCard() {
  const { profile } = useProfile();
  return (
    <View className="bg-white dark:bg-neutral-900 rounded-2xl p-4 flex-row items-center gap-4 shadow-sm">
      <Image
        source={{ uri: profile.avatarUrl || "https://i.pravatar.cc/200" }}
        className="w-16 h-16 rounded-full"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
          {profile.name}
        </Text>
        <Text
          className="text-neutral-600 dark:text-neutral-300"
          numberOfLines={2}
        >
          {profile.bio}
        </Text>
      </View>
    </View>
  );
}
