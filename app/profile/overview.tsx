import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";

export default function ProfileOverview() {
  const { user } = useAuth();
  const [stats] = useState({
    orders: 4,
    amount: 25790000,
    points: 0,
  });

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
              Tổng quan
            </Text>
          </View>
        </View>

        <View className="p-4 space-y-4">
          {/* Welcome Section */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-2">
              Xin chào, {user?.full_name}!
            </Text>
            <Text className="text-gray-600 text-sm">
              Chào mừng bạn đến với trang quản lý tài khoản Smember.
            </Text>
          </View>

          {/* Stats Cards */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 bg-red-100 rounded-lg items-center justify-center">
                <Ionicons name="bag-handle" size={24} color="#d70019" />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-900">
                  {stats.orders}
                </Text>
                <Text className="text-sm text-gray-600">
                  Tổng số đơn hàng đã mua
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 mb-4 pt-4 border-t border-gray-100">
              <View className="w-12 h-12 bg-green-100 rounded-lg items-center justify-center">
                <Ionicons name="cash" size={24} color="#16a34a" />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-900">
                  {stats.amount.toLocaleString("vi-VN")}đ
                </Text>
                <Text className="text-sm text-gray-600">
                  Tổng tiền tích lũy
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 pt-4 border-t border-gray-100">
              <View className="w-12 h-12 bg-yellow-100 rounded-lg items-center justify-center">
                <Ionicons name="star" size={24} color="#ca8a04" />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-900">
                  {stats.points}
                </Text>
                <Text className="text-sm text-gray-600">Điểm thưởng</Text>
              </View>
            </View>
          </View>

          {/* Benefits Info */}
          <View className="bg-gradient-to-r from-red-50 to-orange-50 bg-red-50 rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Ưu đãi của bạn
            </Text>
            <View className="space-y-3">
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#d70019" />
                <Text className="flex-1 text-sm text-gray-700">
                  Đăng ký Tân sinh viên để nhận mã giảm giá đến 10%
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#d70019" />
                <Text className="flex-1 text-sm text-gray-700">
                  Đăng ký S-Business để nhận ưu đãi đặc quyền
                </Text>
              </View>
              <View className="flex-row items-start gap-2">
                <Ionicons name="checkmark-circle" size={20} color="#d70019" />
                <Text className="flex-1 text-sm text-gray-700">
                  Giới thiệu bạn bè để nhận điểm thưởng
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Thao tác nhanh
            </Text>
            <View className="flex-row flex-wrap gap-3">
              <TouchableOpacity
                onPress={() => router.push("/profile")}
                className="flex-1 min-w-[45%] bg-red-50 border border-red-200 rounded-lg p-4 items-center"
              >
                <Ionicons name="receipt-outline" size={32} color="#d70019" />
                <Text className="text-sm text-gray-700 mt-2 text-center">
                  Đơn hàng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/profile/warranty")}
                className="flex-1 min-w-[45%] bg-blue-50 border border-blue-200 rounded-lg p-4 items-center"
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={32}
                  color="#2563eb"
                />
                <Text className="text-sm text-gray-700 mt-2 text-center">
                  Bảo hành
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
