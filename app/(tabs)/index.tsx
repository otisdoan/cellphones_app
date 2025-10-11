import { CarouselHome } from "@/components/home/CarouselHome";
import { CategoryHome } from "@/components/home/CategoryHome";
import OptionHome from "@/components/home/OptionHome";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ScrollView, StatusBar, View } from "react-native";

export default function HomeScreen() {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("#d70119");
    }, [])
  );

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView className="bg-[#f5f5f5] flex gap-y-4 mt-4 px-4">
        <View className=" bg-white rounded-lg">
          <OptionHome />
        </View>
        <CategoryHome />
        <CarouselHome />
      </ScrollView>
    </>
  );
}
