import SvgLogoDesktop from "@/components/svg/SvgLogoDesktop";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login/index"
        options={{
          headerStyle: {
            backgroundColor: "#d70119",
          },
          headerShown: true,
          headerLeft: () => (
            <View className="-m-4">
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={32}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => (
            <View className="flex items-center">
              <SvgLogoDesktop />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Đăng ký",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
