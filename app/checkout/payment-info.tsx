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
import ProductSelected from "@/components/checkout/ProductSelected";
import InforCustomer from "@/components/checkout/InforCustomer";
import InforReceive from "@/components/checkout/InforReceive";
import OptionPayment from "@/components/checkout/OptionPayment";
import { paymentApi } from "@/utils/api/payment.api";

export default function PaymentInfoScreen() {
  const router = useRouter();
  const { orderItems, setOrderAddress, getTotalAmount } = useOrder();
  const [activeTab, setActiveTab] = useState<"info" | "payment">("info");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "transfer" | "wallet" | "card">("cod");
  const [receiveFormData, setReceiveFormData] = useState<any>(null);

  const handleContinue = () => {
    if (!receiveFormData || !receiveFormData.name || !receiveFormData.phone || !receiveFormData.address) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin nhận hàng");
      return;
    }
    
    setOrderAddress(receiveFormData);
    setActiveTab("payment");
  };

  const handlePayment = async () => {
    if (!receiveFormData) {
      Alert.alert("Lỗi", "Vui lòng điền thông tin nhận hàng");
      return;
    }

    try {
      const amount = getTotalAmount();
      
      const result = await paymentApi.checkout({
        orderCode: Date.now(),
        amount: amount,
        description: `Thanh toán đơn hàng`,
        returnUrl: `cellphones://payment-success`,
        cancelUrl: `cellphones://payment-cancel`,
      });

      if (result && result.checkoutUrl) {
        // Open payment URL
        const canOpen = await Linking.canOpenURL(result.checkoutUrl);
        if (canOpen) {
          await Linking.openURL(result.checkoutUrl);
        } else {
          Alert.alert("Lỗi", "Không thể mở trang thanh toán");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Lỗi", "Không thể thực hiện thanh toán");
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
              activeTab === "info" ? styles.tabTextActive : styles.tabTextInactive,
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
          <>
            <ProductSelected />
            <InforCustomer />
            <InforReceive onSubmit={setReceiveFormData} />
          </>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>TÓM TẮT ĐƠN HÀNG</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Số lượng sản phẩm</Text>
                <Text style={styles.summaryValue}>
                  {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tổng tiền hàng</Text>
                <Text style={styles.summaryValue}>
                  {getTotalAmount().toLocaleString("vi-VN")}đ
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
                <Text style={styles.summaryValue}>Miễn phí</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <View>
                  <Text style={styles.totalLabel}>Tổng tiền</Text>
                  <Text style={styles.totalNote}>Đã gồm VAT và được làm tròn</Text>
                </View>
                <Text style={styles.totalValue}>
                  {getTotalAmount().toLocaleString("vi-VN")}đ
                </Text>
              </View>
            </View>

            <OptionPayment
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />

            {receiveFormData && (
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>THÔNG TIN NHẬN HÀNG</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Người nhận</Text>
                  <Text style={styles.infoValue}>{receiveFormData.name}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Số điện thoại</Text>
                  <Text style={styles.infoValue}>{receiveFormData.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Địa chỉ</Text>
                  <Text style={styles.infoValue}>{receiveFormData.address}</Text>
                </View>
              </View>
            )}
          </>
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
            style={styles.actionButton}
            onPress={activeTab === "info" ? handleContinue : handlePayment}
          >
            <Text style={styles.actionButtonText}>
              {activeTab === "info" ? "Tiếp tục" : "Thanh toán"}
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
