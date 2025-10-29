import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useOrder } from "@/context/OrderContext";
import OptionPayment from "./OptionPayment";

type PaymentMethod = "cod" | "transfer" | "wallet" | "card";

interface TabPaymentProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const TabPayment: React.FC<TabPaymentProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  const { orderItems, orderAddress, getTotalAmount, getSavedAmount } =
    useOrder();

  const totalAmount = getTotalAmount();
  const savedAmount = getSavedAmount();
  const totalQuantity = orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <View>
      {/* Discount and Total Section */}
      <View style={styles.card}>
        <View style={styles.discountRow}>
          <TextInput
            style={styles.discountInput}
            placeholder="Nhập mã giảm giá"
            placeholderTextColor="#878b8d"
          />
          <View style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Số lượng sản phẩm</Text>
          <Text style={styles.value}>{totalQuantity}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tổng tiền hàng</Text>
          <Text style={styles.value}>
            {(totalAmount + savedAmount).toLocaleString("vi-VN")}đ
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phí vận chuyển</Text>
          <Text style={styles.value}>Miễn phí</Text>
        </View>

        <View style={styles.divider} />

        {savedAmount > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Giảm giá trực tiếp</Text>
            <Text style={styles.discountText}>
              - {savedAmount.toLocaleString("vi-VN")}đ
            </Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Tổng tiền</Text>
            <Text style={styles.vatNote}>Đã gồm VAT và được làm tròn</Text>
          </View>
          <Text style={styles.totalValue}>
            {totalAmount.toLocaleString("vi-VN")}đ
          </Text>
        </View>
      </View>

      {/* Payment Options */}
      <OptionPayment
        selectedMethod={selectedMethod}
        onMethodChange={onMethodChange}
      />

      {/* Delivery Information */}
      {orderAddress && (
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>THÔNG TIN NHẬN HÀNG</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Người nhận</Text>
              <Text style={styles.infoValue}>{orderAddress.name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Số điện thoại</Text>
              <Text style={styles.infoValue}>{orderAddress.phone}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Địa chỉ</Text>
              <Text style={[styles.infoValue, styles.addressText]}>
                {orderAddress.address}
              </Text>
            </View>

            {orderAddress.note && (
              <View style={styles.infoRow}>
                <Text style={styles.label}>Ghi chú</Text>
                <Text style={styles.infoValue}>{orderAddress.note}</Text>
              </View>
            )}

            <View style={styles.infoRow}>
              <Text style={styles.label}>Hình thức nhận hàng</Text>
              <Text style={styles.infoValue}>
                {orderAddress.delivery_method === "home"
                  ? "Giao tận nơi"
                  : "Nhận tại cửa hàng"}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  discountInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
    fontSize: 14,
    color: "#000",
  },
  applyButton: {
    backgroundColor: "#f4f5f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  applyButtonText: {
    color: "#878b8d",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f3f3",
    marginVertical: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#878b8d",
  },
  value: {
    fontSize: 14,
    color: "#000",
  },
  discountText: {
    fontSize: 14,
    color: "#d70019",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  vatNote: {
    fontSize: 12,
    color: "#878b8d",
    marginTop: 4,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  infoSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#000",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoValue: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  addressText: {
    maxWidth: "70%",
  },
});

export default TabPayment;
