import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { ProductProps } from "@/types/api";

const ProductCard: React.FC<ProductProps> = (product) => {
  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              product.product_image?.[0] || "https://via.placeholder.com/150",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        {product.is_featured && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Hot</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#ffd531" />
          <Text style={styles.rating}>{product.rating_average}</Text>
          <Text style={styles.ratingCount}>({product.rating_count})</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.salePrice}>
            {Number(product.sale_price).toLocaleString("vi-VN")}đ
          </Text>
          <Text style={styles.originalPrice}>
            {Number(product.price).toLocaleString("vi-VN")}đ
          </Text>
        </View>
        {product.short_description && (
          <Text style={styles.description} numberOfLines={2}>
            {product.short_description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  imageContainer: {
    width: "100%",
    height: 160,
    backgroundColor: "#f9fafb",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#d70019",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  ratingCount: {
    fontSize: 11,
    color: "#6b7280",
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d70019",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  description: {
    fontSize: 11,
    color: "#6b7280",
    lineHeight: 16,
  },
});

export default ProductCard;
