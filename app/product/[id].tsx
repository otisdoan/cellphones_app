import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { productApi } from "../../utils/api/product.api";
import type { ProductProps } from "@/types/api";
import CarouselProduct from "@/components/products/CarouselProduct";
import ProductCommitments from "@/components/products/ProductCommitments";
import AttributeProduct from "@/components/products/AttributeProduct";
import OptionProduct from "@/components/products/OptionProduct";
import GiftProduct from "@/components/products/GiftProduct";
import FavoriteProduct from "@/components/products/FavoriteProduct";

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null
  );
  const [variantImage, setVariantImage] = useState<string>("");

  const getProductDetail = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching product with ID:", id);

      // Bước 1: Lấy product bằng id để có slug
      const resultById = await productApi.getById(Number(id));

      if (!Array.isArray(resultById.data) && resultById.data.slug) {
        const productSlug = resultById.data.slug;
        console.log("✅ Got product slug:", productSlug);

        // Bước 2: Dùng slug để lấy product kèm product_image
        const resultBySlug = await productApi.getProductBySlug(
          `/${productSlug}`
        );
        console.log(
          "📦 Product API response:",
          JSON.stringify(resultBySlug, null, 2)
        );

        if (!Array.isArray(resultBySlug.data)) {
          setProduct(resultBySlug.data);
          console.log("✅ Product data loaded:", resultBySlug.data.name);

          // Kiểm tra và set product_image từ response
          if (
            resultBySlug.data.product_image &&
            Array.isArray(resultBySlug.data.product_image)
          ) {
            setProductImages(resultBySlug.data.product_image);
            console.log(
              "✅ Got",
              resultBySlug.data.product_image.length,
              "images from product API"
            );
          } else {
            console.log("⚠️  No product_image in response");
          }
        }
      }
    } catch (error) {
      console.log("❌ Error loading product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleVariantChange = (variantId: number, image: string) => {
    setSelectedVariantId(variantId);
    setVariantImage(image);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", {
      productId: product?.id,
      variantId: selectedVariantId,
    });
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log("Buy now:", {
      productId: product?.id,
      variantId: selectedVariantId,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d70019" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không tìm thấy sản phẩm</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Name & Rating */}
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#ffd531" />
            <Text style={styles.ratingText}>{product.rating_average}</Text>
            <Text style={styles.ratingCount}>
              ({product.rating_count} đánh giá)
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={20} color="#3c82f6" />
            <Text style={styles.actionButtonText}>Yêu thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#3c82f6" />
            <Text style={styles.actionButtonText}>Hỏi đáp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="hardware-chip-outline" size={20} color="#3c82f6" />
            <Text style={styles.actionButtonText}>Thông số</Text>
          </TouchableOpacity>
        </View>

        {/* Carousel */}
        <CarouselProduct
          array_image={productImages}
          variant_image={variantImage}
        />

        {/* Price */}
        <View style={styles.priceCard}>
          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>Giá dành riêng cho SMEM</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.salePrice}>
              {Number(product.sale_price).toLocaleString("vi-VN")}đ
            </Text>
            <Text style={styles.originalPrice}>
              {Number(product.price).toLocaleString("vi-VN")}đ
            </Text>
          </View>
        </View>

        {/* Options */}
        {product.group_name && (
          <View style={styles.section}>
            <OptionProduct
              group_name={product.group_name}
              onVariantChange={handleVariantChange}
            />
          </View>
        )}

        {/* Gift */}
        {product.id && (
          <View style={styles.section}>
            <GiftProduct product_id={product.id} />
          </View>
        )}

        {/* Commitments */}
        <View style={styles.section}>
          <ProductCommitments />
        </View>

        {/* Attributes */}
        {product.id && (
          <View style={styles.section}>
            <AttributeProduct id_product={product.id} />
          </View>
        )}

        {/* Favorite Products */}
        <View style={styles.section}>
          <FavoriteProduct />
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>Đặc quyền SMEM</Text>
          <View style={styles.bottomPriceRow}>
            <Text style={styles.bottomOriginalPrice}>
              {Number(product.price).toLocaleString("vi-VN")}đ
            </Text>
            <Text style={styles.bottomSalePrice}>
              {Number(product.sale_price).toLocaleString("vi-VN")}đ
            </Text>
          </View>
        </View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.installmentButton}
            onPress={handleBuyNow}
          >
            <Text style={styles.installmentButtonText}>Trả góp 0%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
            <Text style={styles.buyButtonText}>MUA NGAY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={24} color="#db172c" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 16,
    color: "#6b7280",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
  },
  shareButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  productHeader: {
    padding: 16,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  actionButtonText: {
    fontSize: 13,
    color: "#3c82f6",
    marginLeft: 4,
  },
  priceCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#71a4fb",
    backgroundColor: "#f1f6ff",
  },
  priceBadge: {
    backgroundColor: "#fae6e8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  priceBadgeText: {
    color: "#d70019",
    fontSize: 12,
    fontWeight: "500",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  salePrice: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: "#6b7280",
    textDecorationLine: "line-through",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    padding: 12,
  },
  bottomPrice: {
    marginBottom: 12,
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  bottomPriceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomOriginalPrice: {
    fontSize: 12,
    color: "#6b7280",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  bottomSalePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d70019",
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 8,
  },
  installmentButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#3c82f6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  installmentButtonText: {
    color: "#3c82f6",
    fontSize: 13,
    fontWeight: "bold",
  },
  buyButton: {
    flex: 2,
    backgroundColor: "#db172c",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cartButton: {
    borderWidth: 1,
    borderColor: "#db172c",
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductDetailScreen;
