import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { CartItemWithVariant } from "@/types/api";

interface CartItemCardProps {
  item: CartItemWithVariant;
  onToggleCheck: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onToggleCheck,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  const promotions = [
    "Trả góp 0% lãi suất, tối đa 12 tháng, trả trước từ 10% qua CTTC hoặc 0đ qua thẻ tín dụng",
    "Đặc quyền trợ giá lên đến 3 triệu khi thu cũ lên đời iPhone",
    "Tặng Sim/Esim Viettel 5G có 8GB data/ngày kèm TV360 4K - miễn phí 1 tháng sử dụng",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.topRow}>
          <View style={styles.leftSection}>
            <TouchableOpacity 
              onPress={onToggleCheck}
              style={[
                styles.checkbox,
                item.checked && styles.checkboxChecked
              ]}
            >
              {item.checked && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </TouchableOpacity>
            <Image
              source={{ uri: item.image_url }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {item.variant_name}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.salePrice}>
                  {Number(item.sale_price).toLocaleString("vi-VN")}đ
                </Text>
                <Text style={styles.originalPrice}>
                  {Number(item.price).toLocaleString("vi-VN")}đ
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.rightSection}>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={20} color="#6b7280" />
            </TouchableOpacity>

            <View style={styles.quantityControl}>
              <TouchableOpacity
                onPress={onDecrease}
                style={styles.quantityButton}
                disabled={item.quantity <= 1}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={onIncrease}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Promotions Section */}
      <View style={styles.promotionSection}>
        <View style={styles.promotionHeader}>
          <Ionicons name="gift" size={20} color="#d70019" />
          <Text style={styles.promotionTitle}>Khuyến mãi hấp dẫn</Text>
        </View>
        {promotions.map((promo, index) => (
          <View key={index} style={styles.promotionItem}>
            <View style={styles.promotionBullet} />
            <Text style={styles.promotionText}>{promo}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 12,
  },
  mainContent: {
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 4,
  },
  checkboxChecked: {
    backgroundColor: "#d70019",
    borderColor: "#d70019",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d70019",
  },
  originalPrice: {
    fontSize: 12,
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  deleteButton: {
    padding: 4,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "500",
    minWidth: 20,
    textAlign: "center",
  },
  promotionSection: {
    backgroundColor: "#f7f7f8",
    borderRadius: 12,
    padding: 12,
  },
  promotionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  promotionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  promotionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  promotionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#d70019",
    marginTop: 6,
    marginRight: 8,
  },
  promotionText: {
    flex: 1,
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 18,
  },
});

export default CartItemCard;
