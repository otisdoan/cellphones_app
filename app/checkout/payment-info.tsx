import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useOrder } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import TabInfor from "@/components/checkout/TabInfor";
import TabPayment from "@/components/checkout/TabPayment";
import { paymentApi } from "@/utils/api/payment.api";
import { orderApi } from "@/utils/api/order.api";

export default function PaymentInfoScreen() {
  const router = useRouter();
  const { orderItems, setOrderAddress, getTotalAmount, clearOrder } =
    useOrder();
  const { user } = useAuth();
  const { clearCheckedItems } = useCart();
  const [activeTab, setActiveTab] = useState<"info" | "payment">("info");
  const [paymentMethod, setPaymentMethod] = useState<
    "cod" | "transfer" | "wallet" | "card"
  >("cod");
  const [receiveFormData, setReceiveFormData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFormDataChange = (data: any) => {
    setReceiveFormData(data);
  };

  const handleContinue = async () => {
    if (
      !receiveFormData ||
      !receiveFormData.name ||
      !receiveFormData.phone ||
      !receiveFormData.address
    ) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin nhận hàng");
      return;
    }

    await setOrderAddress(receiveFormData);
    setActiveTab("payment");
  };

  const handlePayment = async () => {
    if (!receiveFormData) {
      Alert.alert("Lỗi", "Vui lòng điền thông tin nhận hàng");
      return;
    }

    if (!user?.id) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập để tiếp tục");
      return;
    }

    try {
      setIsProcessing(true);

      // Calculate totals
      const subtotal = orderItems.reduce(
        (total, item) =>
          total + Number(item.sale_price || item.price) * item.quantity,
        0
      );

      // 1. CREATE ORDER FIRST
      const shippingAddress = `${receiveFormData.name}, ${receiveFormData.phone}, ${receiveFormData.address}`;

      const orderData: any = {
        order_number: `ORD${Date.now()}`,
        user_id: Number(user.id),
        guest_email: receiveFormData.email || user.email || "",
        guest_phone: receiveFormData.phone || user.phone || "",
        status: "pending",
        payment_status: "pending",
        payment_method: paymentMethod === "cod" ? "cash" : "bank_transfer",
        subtotal: subtotal.toString(),
        discount_amount: "0",
        shipping_fee: "0",
        tax_amount: "0",
        total_amount: subtotal.toString(),
        currency: "VND",
        notes: `Địa chỉ: ${shippingAddress}${receiveFormData.note ? `\nGhi chú: ${receiveFormData.note}` : ""}`,
        items: orderItems.map((item) => {
          const variantId = item.id ? Number(item.id) : null;
          return {
            product_id: Number(item.product_id),
            variant_id: variantId,
            product_name: item.variant_name || `Product ${item.product_id}`,
            variant_name: item.variant_name || null,
            sku: item.sku || `SKU${item.product_id}`,
            price: Number(item.price),
            sale_price: Number(item.sale_price || item.price),
            quantity: Number(item.quantity),
            image_url: item.image_url || null,
          };
        }),
      };

      console.log("📦 Order Data to send:", JSON.stringify(orderData, null, 2));

      const createdOrder = await orderApi.create(orderData);

      if (!createdOrder?.data) {
        Alert.alert("Lỗi", "Tạo đơn hàng thất bại");
        setIsProcessing(false);
        return;
      }

      const orderResponse = createdOrder.data;
      const orderId = Array.isArray(orderResponse)
        ? orderResponse[0]?.id
        : orderResponse.id;

      if (!orderId) {
        Alert.alert("Lỗi", "Không thể lấy mã đơn hàng");
        setIsProcessing(false);
        return;
      }

      // 2. PAYMENT - COD or Online
      if (paymentMethod === "cod") {
        // COD - Clear cart and navigate to success
        await clearCheckedItems();
        clearOrder();
        Alert.alert(
          "Đặt hàng thành công",
          "Đơn hàng của bạn đã được tạo. Vui lòng thanh toán khi nhận hàng.",
          [
            {
              text: "Xem đơn hàng",
              onPress: () => {
                router.push("/profile/orders");
              },
            },
          ]
        );
      } else {
        // Online payment
        const paymentOrderCode = Date.now();
        const result = await paymentApi.checkout({
          orderCode: paymentOrderCode,
          amount: subtotal,
          description: "Thanh toan don hang", // Max 25 characters
          returnUrl: `cellphonesapp://order/success/${orderId}?paymentCode=${paymentOrderCode}`,
          cancelUrl: `cellphonesapp://order/failed/${orderId}?paymentCode=${paymentOrderCode}`,
        });

        if (result?.checkoutUrl) {
          const canOpen = await Linking.canOpenURL(result.checkoutUrl);
          if (canOpen) {
            await Linking.openURL(result.checkoutUrl);
            // Clear cart and order after opening payment
            await clearCheckedItems();
            clearOrder();
          } else {
            Alert.alert("Lỗi", "Không thể mở trang thanh toán");
          }
        } else {
          Alert.alert("Lỗi", "Không thể tạo link thanh toán");
        }
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      console.error("Error response:", error?.response?.data);
      console.error("Error status:", error?.response?.status);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Có lỗi xảy ra khi xử lý thanh toán";
      Alert.alert("Lỗi", errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#9ca3af" />
          <Text style={styles.emptyText}>Không có sản phẩm nào được chọn</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Quay lại giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "info" ? styles.tabActive : styles.tabInactive,
          ]}
          onPress={() => setActiveTab("info")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "info"
                ? styles.tabTextActive
                : styles.tabTextInactive,
            ]}
          >
            1. THÔNG TIN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "payment" ? styles.tabActive : styles.tabInactive,
          ]}
          onPress={() => {
            if (receiveFormData) {
              setActiveTab("payment");
            }
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "payment"
                ? styles.tabTextActive
                : styles.tabTextInactive,
            ]}
          >
            2. THANH TOÁN
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === "info" ? (
          <TabInfor onFormDataChange={handleFormDataChange} />
        ) : (
          <TabPayment
            selectedMethod={paymentMethod}
            onMethodChange={setPaymentMethod}
          />
        )}

        {/* Bottom Spacing */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomContent}>
          <View>
            <Text style={styles.bottomLabel}>Tổng tiền tạm tính:</Text>
            <Text style={styles.bottomValue}>
              {getTotalAmount().toLocaleString("vi-VN")}đ
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.actionButton,
              isProcessing && styles.actionButtonDisabled,
            ]}
            onPress={
              isProcessing
                ? undefined
                : activeTab === "info"
                  ? handleContinue
                  : handlePayment
            }
            disabled={isProcessing}
          >
            <Text style={styles.actionButtonText}>
              {isProcessing
                ? "Đang xử lý..."
                : activeTab === "info"
                  ? "Tiếp tục"
                  : "Thanh toán"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  tab: {
    flex: 1,
    paddingBottom: 12,
    borderBottomWidth: 4,
    alignItems: "center",
  },
  tabActive: {
    borderBottomColor: "#d70019",
  },
  tabInactive: {
    borderBottomColor: "#929eab",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  tabTextActive: {
    color: "#d70019",
  },
  tabTextInactive: {
    color: "#929eab",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1f2937",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#878b8d",
  },
  summaryValue: {
    fontSize: 14,
    color: "#1f2937",
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f3f3",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  totalNote: {
    fontSize: 11,
    color: "#878b8d",
    marginTop: 2,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d70019",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#878b8d",
  },
  infoValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  bottomBar: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  bottomValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d70019",
  },
  actionButton: {
    backgroundColor: "#d70019",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonDisabled: {
    backgroundColor: "#9ca3af",
    opacity: 0.6,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#d70019",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
