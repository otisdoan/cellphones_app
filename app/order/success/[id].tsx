import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { orderApi } from "@/utils/api/order.api";

// Extended order type with all fields
interface OrderDetail {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string;
  total_amount: string;
  subtotal?: string;
  discount_amount?: string;
  shipping_fee?: string;
  shipping_address?: string;
  notes?: string;
  order_items?: {
    product_id: number;
    variant_id?: number;
    product_name: string;
    variant_name?: string;
    sku?: string;
    price: string;
    sale_price?: string;
    quantity: number;
    image_url?: string;
  }[];
}

export default function OrderSuccess() {
  const { id, code, status } = useLocalSearchParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const orderId = Array.isArray(id) ? id[0] : id;

      if (!orderId) {
        console.error("No order ID provided");
        return;
      }

      // Update order payment status if payment was successful
      if (code === "00" && status === "PAID") {
        await orderApi.update(orderId, {
          payment_status: "paid",
          status: "confirmed",
        });
      }

      // Fetch order details
      const response = await orderApi.getById(orderId);
      setOrder(response.data as unknown as OrderDetail);
    } catch (error) {
      console.error("Failed to load order:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(num);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d70019" />
        <Text style={styles.loadingText}>Đang xử lý đơn hàng...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={64} color="#ef4444" />
        <Text style={styles.errorTitle}>Không tìm thấy đơn hàng</Text>
        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => router.push("/profile/orders")}
        >
          <Text style={styles.errorButtonText}>Xem đơn hàng của tôi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Success Header */}
      <View style={styles.header}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={80} color="#10b981" />
        </View>
        <Text style={styles.successTitle}>Đặt hàng thành công!</Text>
        <Text style={styles.successMessage}>
          {order.payment_method === "cash"
            ? "Đơn hàng của bạn đã được đặt thành công. Vui lòng chuẩn bị tiền mặt khi nhận hàng."
            : "Thanh toán thành công! Đơn hàng của bạn đang được xử lý."}
        </Text>
      </View>

      {/* Order Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mã đơn hàng:</Text>
          <Text style={styles.infoValue}>{order.order_number}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Trạng thái:</Text>
          <Text style={[styles.infoValue, styles.statusText]}>
            {order.status === "confirmed"
              ? "Đã xác nhận"
              : order.status === "pending"
                ? "Chờ xác nhận"
                : order.status}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Thanh toán:</Text>
          <Text style={styles.infoValue}>
            {order.payment_method === "cash" ? "Tiền mặt" : "Chuyển khoản"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Trạng thái thanh toán:</Text>
          <Text
            style={[
              styles.infoValue,
              order.payment_status === "paid" && styles.paidText,
            ]}
          >
            {order.payment_status === "paid"
              ? "Đã thanh toán"
              : "Chưa thanh toán"}
          </Text>
        </View>
      </View>

      {/* Shipping Address */}
      {order.shipping_address && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
          <Text style={styles.addressText}>{order.shipping_address}</Text>
        </View>
      )}

      {/* Order Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sản phẩm</Text>
        {order.order_items?.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Image
              source={{
                uri:
                  item.image_url ||
                  "https://via.placeholder.com/80x80?text=Product",
              }}
              style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.product_name}
              </Text>
              {item.variant_name && (
                <Text style={styles.itemVariant}>{item.variant_name}</Text>
              )}
              <View style={styles.itemBottom}>
                <Text style={styles.itemPrice}>
                  {formatCurrency(item.sale_price || item.price)}
                </Text>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tổng cộng</Text>
        {order.subtotal && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(order.subtotal)}
            </Text>
          </View>
        )}
        {order.discount_amount && parseFloat(order.discount_amount) > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Giảm giá:</Text>
            <Text style={[styles.summaryValue, styles.discountText]}>
              -{formatCurrency(order.discount_amount)}
            </Text>
          </View>
        )}
        {order.shipping_fee && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(order.shipping_fee)}
            </Text>
          </View>
        )}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(order.total_amount)}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/profile/orders")}
        >
          <Text style={styles.primaryButtonText}>Xem đơn hàng của tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.secondaryButtonText}>Tiếp tục mua sắm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6b7280",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  errorButton: {
    backgroundColor: "#d70019",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  errorButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  section: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  infoValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  statusText: {
    color: "#10b981",
  },
  paidText: {
    color: "#10b981",
  },
  addressText: {
    fontSize: 14,
    color: "#1f2937",
    lineHeight: 20,
  },
  itemCard: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  itemVariant: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#d70019",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#6b7280",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: 14,
    color: "#1f2937",
  },
  discountText: {
    color: "#10b981",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d70019",
  },
  actions: {
    padding: 16,
    paddingBottom: 32,
  },
  primaryButton: {
    backgroundColor: "#d70019",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d70019",
  },
  secondaryButtonText: {
    color: "#d70019",
    fontSize: 16,
    fontWeight: "600",
  },
});
