import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { orderApi } from "@/utils/api/order.api";

interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  variant_name?: string;
  image_url?: string;
  price: number;
  sale_price?: number;
  quantity: number;
  total: number;
}

interface Order {
  id: number;
  order_number: string;
  created_at: string;
  total_amount: number;
  user_id?: string | number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  items: OrderItem[];
}

type TabType = "all" | "pending" | "delivering" | "completed";

export default function OrderHistory() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const response = await orderApi.getAll();

      if (response?.data) {
        const allOrders = Array.isArray(response.data)
          ? response.data
          : [response.data];

        const ordersWithItems = allOrders as unknown as Order[];
        const userOrders = ordersWithItems.filter(
          (order) => order.user_id && String(order.user_id) === String(user.id)
        );

        const safeOrders = userOrders.map((order) => ({
          ...order,
          items: order.items || [],
        }));

        setOrders(safeOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const getStatusText = (status: Order["status"]) => {
    const statusMap: Record<Order["status"], string> = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      shipped: "Đang giao hàng",
      delivered: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: Order["status"]) => {
    const colorMap: Record<Order["status"], string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colorMap[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending")
      return order.status === "pending" || order.status === "confirmed";
    if (activeTab === "delivering") return order.status === "shipped";
    if (activeTab === "completed") return order.status === "delivered";
    return true;
  });

  const tabs = [
    { key: "all" as TabType, label: "Tất cả" },
    { key: "pending" as TabType, label: "Chờ xử lý" },
    { key: "delivering" as TabType, label: "Đang giao" },
    { key: "completed" as TabType, label: "Hoàn thành" },
  ];

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="bg-red-600 px-4 py-6">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">
                Lịch sử mua hàng
              </Text>
              <Text className="text-white/80 text-sm">
                Quản lý các đơn hàng của bạn
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600">Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-red-600 px-4 py-6">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-white text-xl font-bold">
              Lịch sử mua hàng
            </Text>
            <Text className="text-white/80 text-sm">
              Quản lý các đơn hàng của bạn
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="bg-white border-b border-gray-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row px-4">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`py-4 px-4 border-b-2 ${
                  activeTab === tab.key
                    ? "border-red-600"
                    : "border-transparent"
                }`}
              >
                <Text
                  className={`font-medium text-sm ${
                    activeTab === tab.key ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredOrders.length === 0 ? (
          <View className="items-center justify-center py-16 px-4">
            <Ionicons name="bag-handle-outline" size={80} color="#D1D5DB" />
            <Text className="text-xl font-semibold text-gray-900 mt-6 mb-2">
              {activeTab === "all" && "Chưa có đơn hàng nào"}
              {activeTab === "pending" && "Không có đơn hàng đang chờ"}
              {activeTab === "delivering" && "Không có đơn hàng đang giao"}
              {activeTab === "completed" && "Chưa có đơn hàng hoàn thành"}
            </Text>
            <Text className="text-gray-500 text-center mb-6">
              {activeTab === "all"
                ? "Hãy khám phá và mua sắm những sản phẩm yêu thích của bạn"
                : "Thử chuyển sang tab khác để xem đơn hàng"}
            </Text>
            {activeTab === "all" && (
              <TouchableOpacity
                onPress={() => router.push("/(tabs)")}
                className="bg-red-600 rounded-lg px-8 py-3 flex-row items-center gap-2"
              >
                <Ionicons name="cart-outline" size={20} color="white" />
                <Text className="text-white font-semibold">Mua sắm ngay</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View className="p-4 space-y-4">
            {filteredOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                activeOpacity={0.7}
              >
                {/* Order Header */}
                <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-gray-100">
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900">
                      {order.order_number}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                      {formatDate(order.created_at)}
                    </Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    <Text className="text-xs font-medium">
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                </View>

                {/* Order Items */}
                {order.items && order.items.length > 0 && (
                  <View className="space-y-3">
                    {order.items.map((item) => (
                      <View
                        key={item.id}
                        className="flex-row items-start gap-3 bg-gray-50 rounded-lg p-3"
                      >
                        <Image
                          source={{
                            uri:
                              item.image_url ||
                              "https://via.placeholder.com/80",
                          }}
                          className="w-20 h-20 rounded border border-gray-200"
                          resizeMode="cover"
                        />
                        <View className="flex-1">
                          <Text
                            className="font-medium text-gray-900 mb-1"
                            numberOfLines={2}
                          >
                            {item.product_name}
                          </Text>
                          {item.variant_name && (
                            <Text className="text-sm text-gray-500">
                              {item.variant_name}
                            </Text>
                          )}
                          <View className="flex-row items-center gap-2 mt-2">
                            <Text className="text-red-600 font-semibold">
                              {Number(
                                item.sale_price || item.price
                              ).toLocaleString("vi-VN")}
                              đ
                            </Text>
                            {item.sale_price &&
                              item.price !== item.sale_price && (
                                <Text className="line-through text-sm text-gray-400">
                                  {Number(item.price).toLocaleString("vi-VN")}đ
                                </Text>
                              )}
                          </View>
                        </View>
                        <View className="items-end">
                          <Text className="text-sm text-gray-500">
                            Số lượng
                          </Text>
                          <Text className="font-medium text-gray-900">
                            x{item.quantity}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                {/* Order Footer */}
                <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <Text className="text-gray-600">Tổng thanh toán</Text>
                  <Text className="text-lg font-bold text-red-600">
                    {order.total_amount.toLocaleString("vi-VN")}đ
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
