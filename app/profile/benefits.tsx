import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function BenefitsPage() {
  const benefits = [
    {
      title: "Tích điểm mua sắm",
      description: "Nhận điểm thưởng với mỗi đơn hàng",
      icon: "star" as const,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Ưu đãi sinh nhật",
      description: "Giảm giá đặc biệt trong tháng sinh nhật",
      icon: "gift" as const,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Miễn phí giao hàng",
      description: "Giao hàng miễn phí cho đơn từ 500k",
      icon: "car" as const,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Bảo hành mở rộng",
      description: "Bảo hành thêm 6 tháng cho S-Member",
      icon: "shield-checkmark" as const,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Ưu tiên hỗ trợ",
      description: "Được hỗ trợ ưu tiên 24/7",
      icon: "headset" as const,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Sự kiện độc quyền",
      description: "Tham gia sự kiện dành riêng cho thành viên",
      icon: "calendar" as const,
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <View className="bg-red-600 px-4 py-6">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">
                Hàng thành viên
              </Text>
              <Text className="text-white/80 text-sm">và ưu đãi</Text>
            </View>
          </View>
        </View>

        <View className="p-4 space-y-4">
          {/* Member Card */}
          <View className="bg-gradient-to-br from-red-600 to-orange-500 bg-red-600 rounded-xl p-6 shadow-lg">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white text-2xl font-bold">S-Member</Text>
              <Ionicons name="star" size={32} color="white" />
            </View>
            <Text className="text-white/90 text-sm mb-2">
              Thành viên từ: 01/01/2024
            </Text>
            <View className="bg-white/20 rounded-lg px-4 py-2 mt-4">
              <Text className="text-white text-xs">Điểm tích lũy</Text>
              <Text className="text-white text-3xl font-bold">0</Text>
            </View>
          </View>

          {/* Benefits List */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Quyền lợi thành viên
            </Text>
            {benefits.map((benefit, index) => (
              <View
                key={index}
                className={`flex-row items-start gap-3 py-4 ${
                  index !== benefits.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View
                  className={`w-12 h-12 rounded-lg items-center justify-center ${benefit.color}`}
                >
                  <Ionicons
                    name={benefit.icon}
                    size={24}
                    color="currentColor"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {benefit.title}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">
                    {benefit.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Upgrade Card */}
          <View className="bg-gradient-to-r from-purple-50 to-pink-50 bg-purple-50 rounded-lg shadow-sm p-4">
            <View className="flex-row items-start gap-3">
              <Ionicons name="trending-up" size={24} color="#9333ea" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">
                  Nâng cấp lên S-VIP
                </Text>
                <Text className="text-sm text-gray-600 mb-3">
                  Chi tiêu thêm 24.210.000đ để trở thành S-VIP và nhận thêm
                  nhiều ưu đãi
                </Text>
                <TouchableOpacity className="bg-purple-600 rounded-lg py-2 px-4 self-start">
                  <Text className="text-white font-semibold text-sm">
                    Xem chi tiết
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
