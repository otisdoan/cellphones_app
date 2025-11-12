import { router } from "expo-router";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "react-native-paper";

interface MenuItem {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  path?: string;
  action?: () => void;
  badge?: string;
}

export default function AccountScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const menuItems: MenuItem[] = [
    {
      key: "overview",
      label: "Tổng quan",
      icon: "home-outline",
      path: "/profile/overview",
    },
    {
      key: "orders",
      label: "Lịch sử mua hàng",
      icon: "bag-handle-outline",
      path: "/profile/orders",
    },
    {
      key: "warranty",
      label: "Tra cứu bảo hành",
      icon: "search-outline",
      path: "/profile/warranty",
    },
    {
      key: "benefits",
      label: "Hàng thành viên và ưu đãi",
      icon: "heart-outline",
      path: "/profile/benefits",
    },
    {
      key: "business",
      label: "Ưu đãi S-Business",
      icon: "gift-outline",
      path: "/profile/business",
    },
    {
      key: "student",
      label: "Ưu đãi S-Student/Teacher",
      icon: "school-outline",
      path: "/profile/student",
    },
    {
      key: "referral",
      label: "Giới thiệu bạn bè",
      icon: "people-outline",
      path: "/profile/referral",
      badge: "0",
    },
    {
      key: "settings",
      label: "Thông tin tài khoản",
      icon: "person-outline",
      path: "/profile/edit",
    },
    {
      key: "stores",
      label: "Tìm kiếm cửa hàng",
      icon: "location-outline",
      path: "/(tabs)/store",
    },
    {
      key: "terms",
      label: "Điều khoản",
      icon: "document-text-outline",
      path: "/profile/terms",
    },
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      router.push(item.path as any);
    }
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center px-8">
          <Ionicons name="person-circle-outline" size={80} color="#d70019" />
          <Text className="text-xl font-semibold text-gray-900 mt-4 text-center">
            Bạn chưa đăng nhập
          </Text>
          <Text className="text-gray-600 mt-2 text-center">
            Vui lòng đăng nhập để xem thông tin tài khoản
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            className="bg-red-600 rounded-xl px-8 py-3 mt-6"
          >
            <Text className="text-white font-semibold text-base">
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-red-600 px-4 py-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-xl font-bold">Smember</Text>
              <Text className="text-white/80 text-sm">Thông tin tài khoản</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(tabs)/cart")}>
              <Ionicons name="cart-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info Card */}
        <View className="bg-white mx-4 -mt-4 rounded-lg shadow-sm p-4">
          <View className="flex-row items-center gap-3">
            <Avatar.Image
              size={48}
              source={{ uri: user.avatar_url || "https://i.pravatar.cc/200" }}
            />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-900">
                {user.full_name}
              </Text>
              <Text className="text-xs text-gray-500">{user.email}</Text>
            </View>
          </View>

          {/* Membership Badges */}
          <View className="flex-row gap-2 mt-3">
            <View className="bg-red-600 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-medium">S-Member</Text>
            </View>
            <View className="bg-green-500 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-medium">S-Student</Text>
            </View>
          </View>

          {/* Points Info */}
          <View className="mt-3 pt-3 border-t border-gray-100">
            <Text className="text-xs text-gray-600">
              Bạn đang ở kênh thành viên
            </Text>
            <Text className="text-xs text-red-600 font-medium mt-1">
              Bạn đang tích lũy: <Text className="font-bold">0 điểm</Text>
            </Text>
            <Text className="text-xs text-gray-500 mt-1">
              Cần phát sinh đơn hàng S-VIP để tích lũy: 24.210.000đ
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white mx-4 mt-4 rounded-lg shadow-sm">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => handleMenuClick(item)}
              className={`flex-row items-center px-4 py-3.5 ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
              activeOpacity={0.7}
            >
              <View className="w-8">
                <Ionicons name={item.icon} size={20} color="#6B7280" />
              </View>
              <Text className="flex-1 text-sm text-gray-700 font-medium">
                {item.label}
              </Text>
              {item.badge && (
                <View className="bg-red-600 px-2 py-0.5 rounded-full mr-2">
                  <Text className="text-white text-xs font-bold">
                    {item.badge}
                  </Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View className="mx-4 mt-4 mb-6">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-white rounded-lg shadow-sm px-4 py-3.5 flex-row items-center"
            activeOpacity={0.7}
          >
            <View className="w-8">
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            </View>
            <Text className="flex-1 text-sm text-red-600 font-semibold">
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
