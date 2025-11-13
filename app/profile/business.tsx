import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function BusinessPage() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="bg-red-600 px-4 py-6">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold flex-1">
              S-Business
            </Text>
          </View>
        </View>

        <View className="p-4 space-y-4">
          {/* Banner */}
          <View className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-blue-600 rounded-xl p-6">
            <Ionicons name="briefcase" size={48} color="white" />
            <Text className="text-white text-2xl font-bold mt-4 mb-2">
              Ưu đãi S-Business
            </Text>
            <Text className="text-white/90 text-sm">
              Dành cho doanh nghiệp và tổ chức
            </Text>
          </View>

          {/* Info Card */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Quyền lợi đặc biệt
            </Text>
            <View className="space-y-3">
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  Giảm giá lên đến 15% cho đơn hàng doanh nghiệp
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  Hỗ trợ tư vấn 1-1 với chuyên gia
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  Ưu tiên giao hàng nhanh
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  Bảo hành mở rộng và hỗ trợ kỹ thuật
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  Thanh toán linh hoạt, trả góp 0%
                </Text>
              </View>
            </View>
          </View>

          {/* Register Card */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Đăng ký ngay
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Liên hệ với chúng tôi để đăng ký chương trình S-Business và nhận
              ưu đãi đặc biệt
            </Text>
            <TouchableOpacity className="bg-blue-600 rounded-lg py-3 items-center">
              <Text className="text-white font-semibold">Liên hệ tư vấn</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info */}
          <View className="bg-gray-100 rounded-lg p-4">
            <Text className="text-sm font-medium text-gray-900 mb-2">
              Thông tin liên hệ
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center gap-2">
                <Ionicons name="call" size={16} color="#6B7280" />
                <Text className="text-sm text-gray-700">1800.2097</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Ionicons name="mail" size={16} color="#6B7280" />
                <Text className="text-sm text-gray-700">
                  business@cellphones.com.vn
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
