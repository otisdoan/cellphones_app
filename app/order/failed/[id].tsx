import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { orderApi } from "@/utils/api/order.api";

interface OrderDetail {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string;
  total_amount: string;
}

export default function OrderFailed() {
  const { id, code, message } = useLocalSearchParams();
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

      // Update order status to failed/cancelled
      await orderApi.update(orderId, {
        payment_status: "failed",
        status: "cancelled",
      });

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

  const handleRetry = () => {
    if (order) {
      // Navigate back to payment info to retry
      router.push({
        pathname: "/checkout/payment-info",
        params: { orderId: order.id },
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d70019" />
        <Text style={styles.loadingText}>Đang kiểm tra đơn hàng...</Text>
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

  const errorMessage = Array.isArray(message)
    ? message[0]
    : message || "Đã có lỗi xảy ra";
  const errorCode = Array.isArray(code) ? code[0] : code;

  return (
    <ScrollView style={styles.container}>
      {/* Failed Header */}
      <View style={styles.header}>
        <View style={styles.failedIcon}>
          <Ionicons name="close-circle" size={80} color="#ef4444" />
        </View>
        <Text style={styles.failedTitle}>Thanh toán thất bại!</Text>
        <Text style={styles.failedMessage}>{errorMessage}</Text>
        {errorCode && <Text style={styles.errorCode}>Mã lỗi: {errorCode}</Text>}
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
          <Text style={[styles.infoValue, styles.cancelledText]}>Đã hủy</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Thanh toán:</Text>
          <Text style={styles.infoValue}>
            {order.payment_method === "cash" ? "Tiền mặt" : "Chuyển khoản"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Số tiền:</Text>
          <Text style={styles.infoValue}>
            {formatCurrency(order.total_amount)}
          </Text>
        </View>
      </View>

      {/* Help Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bạn cần hỗ trợ?</Text>
        <Text style={styles.helpText}>
          Nếu bạn gặp khó khăn trong quá trình thanh toán, vui lòng liên hệ với
          chúng tôi:
        </Text>
        <View style={styles.contactRow}>
          <Ionicons name="call" size={20} color="#d70019" />
          <Text style={styles.contactText}>Hotline: 1800.2097</Text>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="mail" size={20} color="#d70019" />
          <Text style={styles.contactText}>Email: hotro@cellphones.com.vn</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Ionicons
            name="refresh"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.retryButtonText}>Thử lại thanh toán</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/profile/orders")}
        >
          <Text style={styles.secondaryButtonText}>Xem đơn hàng của tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tertiaryButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.tertiaryButtonText}>Về trang chủ</Text>
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
  failedIcon: {
    marginBottom: 16,
  },
  failedTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  failedMessage: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  errorCode: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 8,
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
  cancelledText: {
    color: "#ef4444",
  },
  helpText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: "#1f2937",
    marginLeft: 12,
  },
  actions: {
    padding: 16,
    paddingBottom: 32,
  },
  retryButton: {
    backgroundColor: "#d70019",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  retryButtonText: {
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
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#d70019",
    fontSize: 16,
    fontWeight: "600",
  },
  tertiaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  tertiaryButtonText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
  },
});
