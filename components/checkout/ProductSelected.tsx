import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useOrder } from "@/context/OrderContext";

const ProductSelected = () => {
  const { orderItems } = useOrder();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SẢN PHẨM ĐÃ CHỌN</Text>
      <View style={styles.card}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {orderItems.map((item, index) => (
            <View key={index} style={styles.productItem}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.quantity}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.summary}>
          <Text style={styles.summaryLabel}>Tổng tiền tạm tính:</Text>
          <Text style={styles.summaryValue}>
            {orderItems
              .reduce(
                (total, item) =>
                  total + Number(item.sale_price) * item.quantity,
                0
              )
              .toLocaleString("vi-VN")}
            đ
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1f2937",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  scrollContent: {
    gap: 12,
    paddingBottom: 12,
  },
  productItem: {
    position: "relative",
    width: 80,
    height: 80,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 60,
    height: 60,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#d70019",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d70019",
  },
});

export default ProductSelected;
