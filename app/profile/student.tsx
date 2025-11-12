import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function StudentPage() {
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
              <Text className="text-white text-xl font-bold">S-Student</Text>
              <Text className="text-white/80 text-sm">và Teacher</Text>
            </View>
          </View>
        </View>

        <View className="p-4 space-y-4">
          {/* Banner */}
          <View className="bg-gradient-to-r from-green-600 to-emerald-500 bg-green-600 rounded-xl p-6">
            <Ionicons name="school" size={48} color="white" />
            <Text className="text-white text-2xl font-bold mt-4 mb-2">
              Ưu đãi Sinh viên
            </Text>
            <Text className="text-white/90 text-sm">
              Dành cho học sinh - sinh viên - giáo viên
            </Text>
          </View>

          {/* Benefits */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Quyền lợi đặc biệt
            </Text>
            <View className="space-y-3">
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  Giảm giá lên đến 10% cho tất cả sản phẩm
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  Ưu đãi đặc biệt cho laptop, tablet học tập
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  Trả góp 0% cho sinh viên
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  Quà tặng phụ kiện học tập
                </Text>
              </View>
            </View>
          </View>

          {/* Requirements */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Điều kiện đăng ký
            </Text>
            <View className="space-y-3">
              <View className="flex-row items-start gap-2">
                <Ionicons name="document-text" size={20} color="#2563eb" />
                <Text className="flex-1 text-sm text-gray-700">
                  Thẻ sinh viên còn hiệu lực
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="document-text" size={20} color="#2563eb" />
                <Text className="flex-1 text-sm text-gray-700">
                  Giấy tờ tùy thân (CMND/CCCD)
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="document-text" size={20} color="#2563eb" />
                <Text className="flex-1 text-sm text-gray-700">
                  Email sinh viên (@*.edu.vn)
                </Text>
              </View>
            </View>
          </View>

          {/* Register Button */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Đăng ký ngay
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Xác thực tài khoản sinh viên để nhận ưu đãi ngay hôm nay
            </Text>
            <TouchableOpacity className="bg-green-600 rounded-lg py-3 items-center">
              <Text className="text-white font-semibold">
                Xác thực sinh viên
              </Text>
            </TouchableOpacity>
          </View>

          {/* Note */}
          <View className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <View className="flex-row items-start gap-3">
              <Ionicons name="information-circle" size={20} color="#2563eb" />
              <View className="flex-1">
                <Text className="text-sm font-medium text-blue-900 mb-1">
                  Lưu ý
                </Text>
                <Text className="text-xs text-blue-700">
                  Chương trình áp dụng cho học sinh, sinh viên và giáo viên đang
                  học tập/giảng dạy tại các cơ sở giáo dục được công nhận.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
