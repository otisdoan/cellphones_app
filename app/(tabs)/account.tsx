import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "@/components/profile/ProfileCard";
import ThemeToggleSwitch from "@/components/ui/ThemeToggleSwitch";
export default function AccountScreen() {
  return (
    <SafeAreaView>
      <View className="p-4 gap-4">
        <ProfileCard />
        <Link
          href="/profile"
          className="bg-red-600 rounded-xl px-4 py-3 items-center"
        >
          <Text className="text-white font-semibold">Xem hồ sơ</Text>
        </Link>
        <Link
          href="/(tabs)/settings"
          className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-3 items-center"
        >
          <Text className="text-neutral-900 dark:text-white font-semibold">
            Cài đặt
          </Text>
        </Link>
        <View className="mt-4 items-start">
          <ThemeToggleSwitch />
        </View>
      </View>
    </SafeAreaView>
  );
}
