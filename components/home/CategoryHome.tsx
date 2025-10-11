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
    {
      id: "4",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 4",
    },
    {
      id: "5",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 5",
    },
    {
      id: "6",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 6",
    },
    {
      id: "7",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 7",
    },
    {
      id: "8",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 8",
    },
    {
      id: "9",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 9",
    },
    {
      id: "10",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 10",
    },
    {
      id: "11",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 11",
    },
    {
      id: "12",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/may-tinh-bang-ai-icon-cate.png",
      name: "Category 12",
    },
  ];

  const renderPage = ({ item }: { item: typeof data }) => (
    <View className="flex-row flex-wrap w-[75%]  gap-x-4 ">
      {item.map((category) => (
        <View
          key={category.id}
          className="w-[calc(16.6%_-_1rem)] items-start mb-4 "
        >
          <View className="bg-white rounded-xl p-1">
            <Image
              source={{ uri: category.image }}
              className="h-20 w-20 rounded-full"
            />
          </View>
          <Text
            className="text-[0.8rem] text-center mt-1 max-w-20"
            numberOfLines={2}
          >
            {category.name}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View className="rounded-xl mt-4 p-1">
      <FlatList
        data={[data]}
        renderItem={renderPage}
        keyExtractor={(item, index) => `page-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
