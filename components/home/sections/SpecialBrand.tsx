import { View, Text, Image, ScrollView } from "react-native";

export const SpecialBrand = () => {
  const images = [
    {
      id: 1,
      source: require("@/assets/images/apple-chinh-hang-home.webp"),
      alt: "Apple chính hãng",
    },
    {
      id: 2,
      source: require("@/assets/images/SIS asus.webp"),
      alt: "Asus",
    },
    {
      id: 3,
      source: require("@/assets/images/gian-hang-samsung-home.webp"),
      alt: "Samsung",
    },
    {
      id: 4,
      source: require("@/assets/images/xiaomi.webp"),
      alt: "Xiaomi",
    },
  ];

  return (
    <View className="my-4">
      <Text className="text-xl font-semibold mb-3">
        CHUYÊN TRANG THƯƠNG HIỆU
      </Text>
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
