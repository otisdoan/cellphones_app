import { ScrollView, Image, Text, View } from "react-native";

const ITEM_WIDTH = 70; // Fixed width cho mỗi item

export const CategoryHome = () => {
  const data: { id: string; image: any; name: string }[] = [
    {
      id: "1",
      image: require("@/assets/images/c1.webp"),
      name: "Điện thoại, Tablet",
    },
    {
      id: "2",
      image: require("@/assets/images/c2.webp"),
      name: "Tablet",
    },
    {
      id: "3",
      image: require("@/assets/images/c3.webp"),
      name: "Laptop",
    },
    {
      id: "4",
      image: require("@/assets/images/c4.webp"),
      name: "Âm thanh",
    },
    {
      id: "5",
      image: require("@/assets/images/c5.webp"),
      name: "Đồng hồ",
    },
    {
      id: "6",
      image: require("@/assets/images/c6.webp"),
      name: "Camera",
    },
    {
      id: "7",
      image: require("@/assets/images/c7.webp"),
      name: "Gia dụng",
    },
    {
      id: "8",
      image: require("@/assets/images/c8.webp"),
      name: "Phụ kiện",
    },
    {
      id: "9",
      image: require("@/assets/images/c9.webp"),
      name: "PC, Màn hình",
    },
    {
      id: "10",
      image: require("@/assets/images/c10.webp"),
      name: "Tivi",
    },
    {
      id: "11",
      image: require("@/assets/images/c11.webp"),
      name: "Thu cũ đổi mới",
    },
    {
      id: "12",
      image: require("@/assets/images/c12.webp"),
      name: "Hàng cũ",
    },
  ];

  // Chia thành 2 hàng, mỗi hàng 6 items
  const firstRow = data.slice(0, 6);
  const secondRow = data.slice(6, 12);

  return (
    <View className="rounded-xl my-4 p-1">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        <View>
          {/* First Row */}
          <View className="flex-row mb-4 gap-x-6" style={{ gap: 8 }}>
            {firstRow.map((category) => (
              <View
                key={category.id}
                className="flex flex-col items-center"
                style={{ width: ITEM_WIDTH }}
              >
                <View className="bg-white rounded-xl p-1">
                  <Image
                    source={category.image}
                    className="h-20 w-20 rounded-full"
                  />
                </View>
                <Text
                  className="text-[0.65rem] text-center mt-1"
                  numberOfLines={2}
                  style={{ width: ITEM_WIDTH }}
                >
                  {category.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Second Row */}
          <View className="flex-row gap-x-6" style={{ gap: 8 }}>
            {secondRow.map((category) => (
              <View
                key={category.id}
                className="flex flex-col items-center"
                style={{ width: ITEM_WIDTH }}
              >
                <View className="bg-white rounded-xl p-1">
                  <Image
                    source={category.image}
                    className="h-20 w-20 rounded-full"
                  />
                </View>
                <Text
                  className="text-[0.65rem] text-center mt-1"
                  numberOfLines={2}
                  style={{ width: ITEM_WIDTH }}
                >
                  {category.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
