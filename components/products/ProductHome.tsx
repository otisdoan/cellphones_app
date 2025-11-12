import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { ProductProps } from "../../types/api";
import SkeletonProduct from "../skeleton/SkeletonProduct";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

interface ProductHomeProps {
  title: string;
  brand: { name: string }[];
  list: ProductProps[][];
  loading?: boolean;
}

const { width: screenWidth } = Dimensions.get("window");
// Compute precise width for 2 columns with small gap; rely on parent container padding
const horizontalPadding = 0; // no extra horizontal padding inside component
const desiredGap = 12; // desired gap between two items
const itemWidth = (screenWidth - horizontalPadding * 2 - desiredGap) / 2;

const ProductHome = ({
  title,
  brand,
  list,
  loading = false,
}: ProductHomeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({
        x: newIndex * screenWidth,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < list.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({
        x: newIndex * screenWidth,
        animated: true,
      });
    }
  };

  const formatPrice = (price: string) => {
    return Number(price).toLocaleString("vi-VN");
  };

  const navigateToProduct = (id: number) => {
    router.push(`/product/${id}` as any);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.viewAll}>Xem tất cả</Text>
        </View>
        <View style={styles.skeletonGrid}>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonProduct key={index} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.viewAll}>Xem tất cả</Text>
      </View>

      {/* Brand filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.brandContainer}
        contentContainerStyle={styles.brandContent}
      >
        {brand?.map((item, index) => (
          <TouchableOpacity key={index} style={styles.brandItem}>
            <Text style={styles.brandText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.brandItem}>
          <Text style={styles.brandText}>Xem tất cả</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Products Carousel */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / screenWidth
            );
            setCurrentIndex(index);
          }}
        >
          {list.map((items, groupIndex) => (
            <View key={groupIndex} style={styles.productGroup}>
              <View style={styles.productList}>
                {items.map((item, index) => (
                  <Pressable
                    key={index}
                    style={styles.productItem}
                    onPress={() => navigateToProduct(item.id)}
                  >
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri: item.product_image ? item.product_image[0] : "",
                        }}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
                    </View>

                    <Text style={styles.productName} numberOfLines={2}>
                      {item.name}
                    </Text>

                    <View style={styles.priceContainer}>
                      <Text style={styles.currentPrice}>
                        {formatPrice(item.price)}đ
                      </Text>
                      <Text style={styles.originalPrice}>
                        {formatPrice(item.cost_price)}đ
                      </Text>
                    </View>

                    <View style={styles.badgesContainer}>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                          Smember giảm đến 450.000đ
                        </Text>
                      </View>
                      <View style={[styles.badge, styles.badgeSecondary]}>
                        <Text style={styles.badgeTextSecondary}>
                          S-Student giảm thêm 300.000đ
                        </Text>
                      </View>
                      <View style={[styles.badge, styles.badgeTertiary]}>
                        <Text style={styles.badgeTextTertiary}>
                          Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng
                          kỳ hạn 3-6 tháng
                        </Text>
                      </View>
                    </View>

                    <View style={styles.footer}>
                      <View style={styles.ratingContainer}>
                        <AntDesign name="star" size={12} color="#ffd531" />
                        <Text style={styles.ratingText}>
                          {item.rating_average}
                        </Text>
                      </View>
                      <View style={styles.favoriteContainer}>
                        <AntDesign name="heart" size={12} color="#3c82f6" />
                        <Text style={styles.favoriteText}>Yêu thích</Text>
                      </View>
                    </View>

                    {/* Discount Badge */}
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>
                        <Text style={styles.discountLabel}>Giảm</Text>
                        <Text style={styles.discountValue}> 14%</Text>
                      </Text>
                    </View>

                    {/* Installment Badge */}
                    <View style={styles.installmentBadge}>
                      <Text style={styles.installmentText}>
                        <Text style={styles.installmentLabel}>Trả góp</Text>
                        <Text style={styles.installmentValue}> 0%</Text>
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="#333" />
          </TouchableOpacity>
        )}

        {currentIndex < list.length - 1 && (
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonRight]}
            onPress={handleNext}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  viewAll: {
    fontSize: 14,
    color: "#d70119",
  },
  brandContainer: {
    marginBottom: 16,
  },
  brandContent: {
    paddingHorizontal: 0,
  },
  brandItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginRight: 8,
  },
  brandText: {
    fontSize: 12,
    color: "#333",
  },
  carouselContainer: {
    position: "relative",
  },
  productGroup: {
    width: screenWidth,
    paddingHorizontal: 0,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productItem: {
    width: itemWidth,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    height: 120,
    marginBottom: 8,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    height: 32,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d70019",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 10,
    textDecorationLine: "line-through",
    color: "#999",
  },
  badgesContainer: {
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#dae8fe",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  badgeSecondary: {
    backgroundColor: "#EFE9FE",
  },
  badgeTertiary: {
    backgroundColor: "#F2F2F3",
  },
  badgeText: {
    fontSize: 10,
    color: "#20488b",
  },
  badgeTextSecondary: {
    fontSize: 10,
    color: "#421d95",
  },
  badgeTextTertiary: {
    fontSize: 10,
    color: "#666",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteText: {
    fontSize: 12,
    color: "#3c82f6",
    marginLeft: 4,
  },
  discountBadge: {
    position: "absolute",
    top: -6,
    left: 8,
    backgroundColor: "#d70119",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: "white",
  },
  discountLabel: {
    fontSize: 10,
  },
  discountValue: {
    fontSize: 12,
    fontWeight: "bold",
  },
  installmentBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#3c82f6",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  installmentText: {
    color: "white",
  },
  installmentLabel: {
    fontSize: 10,
  },
  installmentValue: {
    fontSize: 12,
    fontWeight: "bold",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    left: 8,
    backgroundColor: "white",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navButtonRight: {
    left: undefined,
    right: 8,
  },
  skeletonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});

export default ProductHome;
