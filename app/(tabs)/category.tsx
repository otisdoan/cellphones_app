import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryScreen() {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("#1e90ff");
    }, [])
  );
  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <View>
          <Text>Category Screen</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
