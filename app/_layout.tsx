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
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <PaperProvider>
      <ThemeProviderApp>
        <ProfileProvider>
          <RootLayoutInner />
        </ProfileProvider>
      </ThemeProviderApp>
    </PaperProvider>
  );
}
