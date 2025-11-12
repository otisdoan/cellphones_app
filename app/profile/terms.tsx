import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Giới thiệu",
      content:
        "Chào mừng bạn đến với CellphoneS. Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản và điều kiện được nêu dưới đây.",
    },
    {
      title: "2. Điều khoản sử dụng",
      content:
        "Bạn phải từ 18 tuổi trở lên để sử dụng dịch vụ của chúng tôi. Bạn cam kết cung cấp thông tin chính xác và cập nhật khi đăng ký tài khoản.",
    },
    {
      title: "3. Quyền và trách nhiệm",
      content:
        "Người dùng có quyền truy cập và sử dụng các dịch vụ của CellphoneS. Đồng thời, người dùng có trách nhiệm bảo mật thông tin tài khoản và thông báo ngay cho chúng tôi nếu phát hiện bất kỳ hành vi truy cập trái phép nào.",
    },
    {
      title: "4. Chính sách thanh toán",
      content:
        "Chúng tôi chấp nhận nhiều hình thức thanh toán khác nhau. Tất cả giao dịch đều được mã hóa và bảo mật theo tiêu chuẩn quốc tế.",
    },
    {
      title: "5. Chính sách đổi trả",
      content:
        "Sản phẩm có thể được đổi trả trong vòng 15 ngày kể từ ngày mua hàng, với điều kiện sản phẩm còn nguyên vẹn, đầy đủ phụ kiện và hóa đơn mua hàng.",
    },
    {
      title: "6. Bảo hành",
      content:
        "Tất cả sản phẩm đều được bảo hành theo chính sách của nhà sản xuất. CellphoneS cam kết hỗ trợ khách hàng trong suốt thời gian bảo hành.",
    },
    {
      title: "7. Quyền riêng tư",
      content:
        "Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Thông tin của bạn sẽ không được chia sẻ cho bên thứ ba mà không có sự đồng ý của bạn.",
    },
    {
      title: "8. Thay đổi điều khoản",
      content:
        "CellphoneS có quyền thay đổi các điều khoản này bất kỳ lúc nào. Chúng tôi sẽ thông báo cho người dùng về bất kỳ thay đổi quan trọng nào.",
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
            <Text className="text-white text-xl font-bold flex-1">
              Điều khoản sử dụng
            </Text>
          </View>
        </View>

        <View className="p-4 space-y-4">
          {/* Last Updated */}
          <View className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="information-circle" size={20} color="#2563eb" />
              <Text className="text-sm text-blue-900">
                Cập nhật lần cuối: 12/11/2025
              </Text>
            </View>
          </View>

          {/* Sections */}
          {sections.map((section, index) => (
            <View key={index} className="bg-white rounded-lg shadow-sm p-4">
              <Text className="text-base font-semibold text-gray-900 mb-2">
                {section.title}
              </Text>
              <Text className="text-sm text-gray-700 leading-6">
                {section.content}
              </Text>
            </View>
          ))}

          {/* Contact */}
          <View className="bg-gray-100 rounded-lg p-4">
            <Text className="text-sm font-medium text-gray-900 mb-3">
              Liên hệ với chúng tôi
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center gap-2">
                <Ionicons name="call" size={16} color="#6B7280" />
                <Text className="text-sm text-gray-700">
                  Hotline: 1800.2097
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Ionicons name="mail" size={16} color="#6B7280" />
                <Text className="text-sm text-gray-700">
                  Email: support@cellphones.com.vn
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Ionicons name="location" size={16} color="#6B7280" />
                <Text className="flex-1 text-sm text-gray-700">
                  Địa chỉ: 125 Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, TP.HCM
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
