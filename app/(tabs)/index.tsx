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
import { SpecialStudent } from "@/components/home/sections/SpecialStudent";
import { SpecialPayment } from "@/components/home/sections/SpecialPayment";
import { SpecialBrand } from "@/components/home/sections/SpecialBrand";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ScrollView, StatusBar, View, Image } from "react-native";

export default function HomeScreen() {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("#d70018");
    }, [])
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#d70018" />

      <ScrollView className="bg-[#f5f5f5] flex gap-y-4 px-4">
        <View className="bg-white rounded-lg mt-4">
          <OptionHome />
        </View>
        <CategoryHome />
        <CarouselHome />
        <Image
          source={require("@/assets/special-b2s-dday2-mb.gif")}
          style={{
            width: "100%",
            height: 120,
            borderRadius: 12,
            marginTop: 16,
          }}
          resizeMode="cover"
        />
        <SmartphoneList />
        <ProductWatched />
        <LaptopList />
        <TabletList />
        <TiviList />
        <HouseHoldList />
        <ClockSmartList />
        <ProductSection />
        <SpecialStudent />
        <SpecialPayment />
        <SpecialBrand />
      </ScrollView>
    </>
  );
}
