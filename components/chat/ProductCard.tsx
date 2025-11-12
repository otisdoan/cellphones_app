import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ProductCard as ProductCardType } from "../../types/chat";

interface Props {
  product: ProductCardType;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const handlePress = () => {
    if (product.slug) {
      router.push(`/product/${product.slug}`);
    }
  };

  // Calculate discount percentage (matching web logic)
  const discount = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  // Render rating stars
  const renderStars = () => {
    if (!product.rating) return null;

    const stars = [];
    const fullStars = Math.floor(product.rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < fullStars ? "star" : "star-outline"}
          size={12}
          color="#FFC107"
        />
      );
    }

    return <View style={styles.stars}>{stars}</View>;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        {discount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>-{discount}%</Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Rating */}
        {renderStars()}

        {/* Price */}
        <View style={styles.priceContainer}>
          {product.sale_price && product.sale_price < product.price ? (
            <>
              <Text style={styles.salePrice}>
                {product.sale_price.toLocaleString("vi-VN")}đ
              </Text>
              <Text style={styles.originalPrice}>
                {product.price.toLocaleString("vi-VN")}đ
              </Text>
            </>
          ) : (
            <Text style={styles.salePrice}>
              {product.price.toLocaleString("vi-VN")}đ
            </Text>
          )}
        </View>

        {/* Highlights */}
        {product.highlights && product.highlights.length > 0 && (
          <View style={styles.highlights}>
            {product.highlights.slice(0, 2).map((highlight, index) => (
              <Text key={index} style={styles.highlight} numberOfLines={1}>
                • {highlight}
              </Text>
            ))}
          </View>
        )}

        {/* Stock Status */}
        {product.stock !== undefined && product.stock <= 5 && (
          <Text style={styles.stock}>
            {product.stock === 0
              ? "Hết hàng"
              : `Chỉ còn ${product.stock} sản phẩm`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 100,
    height: 100,
    position: "relative",
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#E53935",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#212121",
    marginBottom: 4,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 4,
    gap: 2,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E53935",
  },
  originalPrice: {
    fontSize: 13,
    color: "#757575",
    textDecorationLine: "line-through",
  },
  highlights: {
    marginTop: 4,
  },
  highlight: {
    fontSize: 11,
    color: "#616161",
    marginBottom: 2,
  },
  stock: {
    fontSize: 11,
    color: "#FF6B00",
    fontStyle: "italic",
    marginTop: 4,
  },
});
