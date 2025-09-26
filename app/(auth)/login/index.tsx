import LoginForm from "@/components/form/LoginForm";
import * as WebBrowser from "expo-web-browser";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId: process.env.IOS_CLIENT_ID,
  //   androidClientId: process.env.ANDROID_CLIENT_ID,
  //   webClientId: process.env.WEB_CLIENT_ID,
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { authentication } = response;
  //     console.log("Google Token:", authentication?.idToken);
  //     if (authentication) {
  //       loginGoogle(authentication);
  //     }
  //   }
  // }, [response]);

  // const loginGoogle = async (token: TokenResponse) => {
  //   try {
  //     const result = await authApi.loginByGoogle(token);
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <ScrollView>
        <View className="flex  gap-y-8 px-5">
          <View className="flex items-center ">
            <View className="mt-10 w-32 h-28">
              <Image
                source={require("@/assets/empty.f8088c4d.png")}
                className="object-contain w-full h-full"
              />
            </View>
          </View>
          <Text className="font-medium text-3xl text-center">
            Đăng nhập với
          </Text>
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
          <View>
            <LoginForm />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
