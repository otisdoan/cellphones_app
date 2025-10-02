import { FlatList, Image, Text, View } from "react-native";

export const CategoryHome = () => {
  const data: { id: string; image: string; name: string }[] = [
    {
      id: "1",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Điện thoại, Tablet",
    },
    {
      id: "2",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 2",
    },
    {
      id: "3",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 3",
    },
  ];
  const renderItem = ({
    item,
  }: {
    item: { id: string; image: string; name: string };
  }) => (
    <View className="gap-2 flex items-center w-20">
      <View className="flex-row items-center justify-center bg-white rounded-lg h-28 w-28 p-1">
        <Image
          source={{ uri: item.image }}
          className="h-12 w-12 rounded-full"
        />
      </View>
      <Text className="text-[0.8rem]">{item.name.charAt(0)}</Text>
    </View>
  );
  return (
    <View className="rounded-md mt-4 p-4">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};
