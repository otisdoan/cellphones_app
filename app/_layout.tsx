// import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import "../global.css";
import { ThemeProviderApp, useAppTheme } from "@/context/ThemeContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ChatWidget } from "@/components/chat/ChatWidget";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutInner() {
  const { isDark } = useAppTheme();
  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <ChatWidget />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <PaperProvider>
      <ThemeProviderApp>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <ProfileProvider>
                <RootLayoutInner />
              </ProfileProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProviderApp>
    </PaperProvider>
  );
}
