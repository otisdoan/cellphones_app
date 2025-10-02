import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReactNode } from "react";
import { FlatList, Text, View } from "react-native";

export default function OptionHome() {
  const data: { id: number; icon: ReactNode; title: string }[] = [
    {
      id: 1,
      icon: <Ionicons name="diamond-outline" size={24} color="red" />,
      title: "Hạng thành viên",
    },
    {
      id: 2,
      icon: <MaterialIcons name="discount" size={24} color="red" />,
      title: "Mã giảm giá",
    },
    {
      id: 3,
      icon: <MaterialIcons name="list-alt" size={24} color="red" />,
      title: "Lịch sử mua hàng",
    },
    {
      id: 4,
      icon: <Ionicons name="school" size={24} color="red" />,
      title: "S-Student & S-Teacher",
    },
    {
      id: 5,
      icon: <MaterialIcons name="event" size={24} color="red" />,
      title: "Event",
    },
  ];

  const renderItem = ({
    item,
  }: {
    item: { id: number; icon: any; title: string };
  }) => {
    return (
      <View className="p-3 rounded-l gap-y-2 flex items-center">
        <View className="flex-row items-center justify-center bg-gray-100 rounded-full h-12 w-12">
          {item.icon}
        </View>
        <Text className="text-sm ">{item.title}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
