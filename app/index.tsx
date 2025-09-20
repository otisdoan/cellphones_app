import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <>
      <View>
        <Text onPress={() => router.navigate("/(auth)/login")}>Login</Text>
      </View>
    </>
  );
}
