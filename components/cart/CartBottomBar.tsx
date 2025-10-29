import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface CartBottomBarProps {
  totalPrice: number;
  savedAmount: number;
  checkedCount: number;
  hasCheckedItems: boolean;
  onCheckout: () => void;
}

const CartBottomBar: React.FC<CartBottomBarProps> = ({
  totalPrice,
  savedAmount,
  checkedCount,
  hasCheckedItems,
  onCheckout,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.priceSection}>
        <View>
          <Text style={styles.totalLabel}>
            Tạm tính:{" "}
            <Text style={styles.totalPrice}>
              {totalPrice.toLocaleString("vi-VN")}đ
            </Text>
          </Text>
          {savedAmount > 0 && (
            <Text style={styles.savedText}>
              Tiết kiệm:{" "}
              <Text style={styles.savedAmount}>
                {savedAmount.toLocaleString("vi-VN")}đ
              </Text>
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.checkoutButton,
            !hasCheckedItems && styles.checkoutButtonDisabled,
          ]}
          onPress={onCheckout}
          disabled={!hasCheckedItems}
        >
          <Text
            style={[
              styles.checkoutText,
              !hasCheckedItems && styles.checkoutTextDisabled,
            ]}
          >
            Mua ngay
          </Text>
          {hasCheckedItems && (
            <Text style={styles.countText}>({checkedCount})</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d70019",
  },
  savedText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  savedAmount: {
    color: "#198efb",
    fontWeight: "600",
  },
  checkoutButton: {
    backgroundColor: "#d70019",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  checkoutButtonDisabled: {
    backgroundColor: "#c0c0c0",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  checkoutTextDisabled: {
    color: "#707070",
  },
  countText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CartBottomBar;
