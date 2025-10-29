import { View, Text, Image, ScrollView } from "react-native";

export const SpecialPayment = () => {
  const images = [
    {
      id: 1,
      source: require("@/assets/images/ocb-h.webp"),
      alt: "OCB ưu đãi thanh toán",
    },
    {
      id: 2,
      source: require("@/assets/images/scbho.webp"),
      alt: "SCB ưu đãi thanh toán",
    },
    {
      id: 3,
      source: require("@/assets/images/hsbcneeeeew.webp"),
      alt: "HSBC ưu đãi thanh toán",
    },
    {
      id: 4,
      source: require("@/assets/images/HOMECREDIT.webp"),
      alt: "HomeCredit ưu đãi thanh toán",
    },
  ];

  return (
    <View className="my-4">
      <Text className="text-xl font-semibold mb-3">ƯU ĐÃI THANH TOÁN</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {images.map((item) => (
          <View key={item.id} className="w-[280px]">
            <Image
              source={item.source}
              style={{ width: "100%", height: 140, borderRadius: 12 }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
