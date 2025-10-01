import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Text, View } from "react-native";

export default function PriceAddress() {
  return (
    <View className="flex flex-row items-center bg-[#e55464] p-1 rounded-md">
      <EvilIcons name="location" size={24} color="white" />
      <View>
        <Text className="text-white text-[0.8rem]">Xem giá tại</Text>
        <Text className="text-white text-[0.8rem] font-bold">
          Bà Rịa - Vũng Tàu
        </Text>
      </View>
    </View>
  );
}
