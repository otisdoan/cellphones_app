import { View, Text, Image, ScrollView } from "react-native";

export const SpecialStudent = () => {
  const images = [
    {
      id: 1,
      source: require("@/assets/images/Laptop-dday2-hssv.webp"),
      alt: "Laptop ưu đãi sinh viên",
    },
    {
      id: 2,
      source: require("@/assets/images/Mac-dday2-hssv.webp"),
      alt: "Mac ưu đãi sinh viên",
    },
    {
      id: 3,
      source: require("@/assets/images/samsung-home-update.webp"),
      alt: "Samsung ưu đãi sinh viên",
    },
    {
      id: 4,
      source: require("@/assets/images/iPad-dday2-hssv.webp"),
      alt: "iPad ưu đãi sinh viên",
    },
  ];

  return (
    <View className="my-4">
      <Text className="text-xl font-semibold mb-3">ƯU ĐÃI SINH VIÊN</Text>
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
