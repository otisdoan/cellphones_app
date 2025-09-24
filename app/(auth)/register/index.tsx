import RegisterForm from "@/components/form/RegisterForm";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  return (
    <>
      <ScrollView className="flex-1 bg-white px-4">
        <SafeAreaView className="flex- gap-y-8">
          <View className="flex items-center ">
            <Image
              source={require("@/assets/chibi2.webp")}
              className="object-contain w-20 h-40"
              resizeMode="cover"
            />
          </View>
          <Text className="font-medium text-3xl text-center">Đăng ký với</Text>
          <Pressable>
            <View className="flex items-center">
              <View className="flex items-center justify-center border-[1px] border-[#adb0ba] w-24 h-16 rounded-md">
                <Image
                  source={require("@/assets/Google_Favicon_2025.svg.webp")}
                  className="w-8 h-8"
                  width={64}
                  height={64}
                />
              </View>
            </View>
          </Pressable>
          <View className="flex flex-row items-center justify-center gap-x-2">
            <View className="w-16 h-1 border-t-2 border-t-[#adb0ba]"></View>
            <Text>hoặc</Text>
            <View className="w-16 h-1 border-t-2 border-t-[#adb0ba]"></View>
          </View>
          <RegisterForm />
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
