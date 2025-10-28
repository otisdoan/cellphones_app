import { CarouselHome } from "@/components/home/CarouselHome";
import { CategoryHome } from "@/components/home/CategoryHome";
import OptionHome from "@/components/home/OptionHome";
import ProductSection from "@/components/home/ProductSection";
import SmartphoneList from "@/components/home/sections/SmartphoneList";
import ProductWatched from "@/components/home/sections/ProductWatched";
import LaptopList from "@/components/home/sections/LaptopList";
import TabletList from "@/components/home/sections/TabletList";
import TiviList from "@/components/home/sections/TiviList";
import HouseHoldList from "@/components/home/sections/HouseHoldList";
import ClockSmartList from "@/components/home/sections/ClockSmartList";
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
        <View className="bg-white rounded-lg">
          <OptionHome />
        </View>
        <CategoryHome />
        <CarouselHome />
        <SmartphoneList />
        <ProductWatched />
        <LaptopList />
        <TabletList />
        <TiviList />
        <HouseHoldList />
        <ClockSmartList />
        <ProductSection />
      </ScrollView>
    </>
  );
}
