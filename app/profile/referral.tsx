import { View, Text, ScrollView, TouchableOpacity, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function ReferralPage() {
  const [referralCode] = useState("CELL2024ABC");
  const [referrals] = useState(0);
  const [points] = useState(0);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Tham gia CellphoneS cùng mình và nhận ưu đãi! Sử dụng mã giới thiệu: ${referralCode}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
              Giới thiệu bạn bè
            </Text>
          </View>
        </View>

        <View className="p-4 space-y-4">
          {/* Referral Code Card */}
          <View className="bg-gradient-to-r from-purple-600 to-pink-500 bg-purple-600 rounded-xl p-6">
            <Text className="text-white text-lg font-semibold mb-4">
              Mã giới thiệu của bạn
            </Text>
            <View className="bg-white/20 rounded-lg px-4 py-3 mb-4">
              <Text className="text-white text-center text-2xl font-bold tracking-wider">
                {referralCode}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleShare}
              className="bg-white rounded-lg py-3 items-center"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="share-social" size={20} color="#9333ea" />
                <Text className="text-purple-600 font-semibold">
                  Chia sẻ ngay
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-white rounded-lg shadow-sm p-4">
              <View className="items-center">
                <Ionicons name="people" size={32} color="#d70019" />
                <Text className="text-2xl font-bold text-gray-900 mt-2">
                  {referrals}
                </Text>
                <Text className="text-sm text-gray-600">Bạn bè</Text>
              </View>
            </View>
            <View className="flex-1 bg-white rounded-lg shadow-sm p-4">
              <View className="items-center">
                <Ionicons name="star" size={32} color="#ca8a04" />
                <Text className="text-2xl font-bold text-gray-900 mt-2">
                  {points}
                </Text>
                <Text className="text-sm text-gray-600">Điểm thưởng</Text>
              </View>
            </View>
          </View>

          {/* How it works */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Cách thức hoạt động
            </Text>
            <View className="space-y-4">
              <View className="flex-row items-start gap-3">
                <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center">
                  <Text className="text-red-600 font-bold">1</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-900">
                    Chia sẻ mã giới thiệu
                  </Text>
                  <Text className="text-xs text-gray-600 mt-1">
                    Gửi mã cho bạn bè qua mạng xã hội hoặc tin nhắn
                  </Text>
                </View>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center">
                  <Text className="text-red-600 font-bold">2</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-900">
                    Bạn bè đăng ký
                  </Text>
                  <Text className="text-xs text-gray-600 mt-1">
                    Bạn bè sử dụng mã của bạn khi đăng ký tài khoản
                  </Text>
                </View>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center">
                  <Text className="text-red-600 font-bold">3</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-900">
                    Nhận thưởng
                  </Text>
                  <Text className="text-xs text-gray-600 mt-1">
                    Cả hai đều nhận điểm thưởng và ưu đãi đặc biệt
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Rewards */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Phần thưởng
            </Text>
            <View className="space-y-3">
              <View className="flex-row items-start gap-2">
                <Ionicons name="gift" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  <Text className="font-semibold">50.000đ</Text> cho người giới
                  thiệu
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="gift" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  <Text className="font-semibold">50.000đ</Text> cho người được
                  giới thiệu
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="gift" size={20} color="#16a34a" />
                <Text className="flex-1 text-sm text-gray-700">
                  Tích điểm thưởng cho mỗi đơn hàng thành công
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
