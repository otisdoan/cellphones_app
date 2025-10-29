import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface GiftProductProps {
  product_id: number;
  onAddToCart?: () => void;
  selectedVariantId?: number | null;
}

const GiftProduct: React.FC<GiftProductProps> = ({
  product_id,
  onAddToCart,
  selectedVariantId,
}) => {
  const promotions = [
    {
      content:
        "Trả góp 0% lãi suất, tối đa 12 tháng, trả trước từ 10% qua CTTC hoặc 0đ qua thẻ tín dụng",
    },
    {
      content: "Đặc quyền trợ giá lên đến 3 triệu khi thu cũ lên đời iPhone",
    },
    {
      content:
        "Tặng Sim/Esim Viettel 5G có 8GB data/ngày kèm TV360 4K - miễn phí 1 tháng sử dụng",
    },
  ];

  const payments = [
    {
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:46:16/q:90/plain/https://cellphones.com.vn/media/wysiwyg/DUMT_ZV0.png",
      content: "Giảm đến 5.000.000đ khi thanh toán qua Kredivo",
    },
    {
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Icon/hsbc_icon.png",
      content: "Hoàn tiền đến 2 triệu khi mở thẻ tín dụng HSBC",
    },
    {
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:90:23/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Icon/image_1648.png",
      content: "Giảm đến 1 triệu khi thanh toán qua thẻ tin dụng Vietbank",
    },
  ];

  const banners = [
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:120/q:90/plain/https://dashboard.cellphones.com.vn/storage/ProductBanner_Voucher-300K_Apple_3.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:120/q:90/plain/https://dashboard.cellphones.com.vn/storage/iPhone-product-banner-v1.png",
  ];

  return (
    <View style={styles.container}>
      {/* SMEM Privilege */}
      <View style={styles.smemCard}>
        <View style={styles.smemHeader}>
          <Ionicons name="gift" size={24} color="#d70019" />
          <Text style={styles.smemTitle}>Quà tặng đặc quyền SMEM</Text>
        </View>
        <View style={styles.smemItem}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>1</Text>
          </View>
          <Text style={styles.smemText}>
            Giảm thêm 5% (tối đa 300.000đ) khi thu cũ lên đời
          </Text>
        </View>
      </View>

      {/* Banner Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bannerContainer}
      >
        {banners.map((banner, index) => (
          <View key={index} style={styles.bannerItem}>
            <Image
              source={{ uri: banner }}
              style={styles.bannerImage}
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>

      {/* Promotions */}
      <View style={styles.promotionCard}>
        <View style={styles.promotionHeader}>
          <Ionicons name="gift" size={24} color="#d70019" />
          <Text style={styles.promotionTitle}>Khuyến mãi hấp dẫn</Text>
        </View>
        {promotions.map((item, index) => (
          <View key={index} style={styles.promotionItem}>
            <View style={styles.promotionBadge}>
              <Text style={styles.promotionNumber}>{index + 1}</Text>
            </View>
            <Text style={styles.promotionText}>{item.content}</Text>
          </View>
        ))}
      </View>

      {/* Payment Methods */}
      <View style={styles.paymentCard}>
        <View style={styles.paymentHeader}>
          <Ionicons name="gift" size={24} color="#d70019" />
          <Text style={styles.paymentTitle}>Ưu đãi thanh toán</Text>
        </View>
        {payments.map((item, index) => (
          <View key={index} style={styles.paymentItem}>
            <Ionicons name="chevron-forward" size={16} color="#d70019" />
            <Image
              source={{ uri: item.image }}
              style={styles.paymentLogo}
              resizeMode="contain"
            />
            <Text style={styles.paymentText} numberOfLines={2}>
              {item.content}
            </Text>
          </View>
        ))}
      </View>

      {/* Add to Cart Button */}
      {onAddToCart && (
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !selectedVariantId && styles.addToCartButtonDisabled,
          ]}
          onPress={onAddToCart}
          disabled={!selectedVariantId}
        >
          <Ionicons
            name="cart-outline"
            size={20}
            color={selectedVariantId ? "#fff" : "#a0a0a0"}
          />
          <Text
            style={[
              styles.addToCartText,
              !selectedVariantId && styles.addToCartTextDisabled,
            ]}
          >
            Thêm vào giỏ hàng
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  smemCard: {
    borderWidth: 1,
    borderColor: "#e4e4e7",
    backgroundColor: "#f7f7f8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  smemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  smemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  smemItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#508ff6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  numberText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  smemText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  bannerContainer: {
    marginBottom: 16,
  },
  bannerItem: {
    width: 300,
    height: 120,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  promotionCard: {
    borderWidth: 1,
    borderColor: "#5f9bfa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  promotionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  promotionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  promotionBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#508ff6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginTop: 2,
  },
  promotionNumber: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  promotionText: {
    flex: 1,
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 20,
  },
  paymentCard: {
    borderWidth: 1,
    borderColor: "#3c82f6",
    backgroundColor: "#f1f6ff",
    borderRadius: 12,
    padding: 16,
  },
  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  paymentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  paymentLogo: {
    width: 60,
    height: 20,
    marginHorizontal: 8,
  },
  paymentText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d70019",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    gap: 8,
  },
  addToCartButtonDisabled: {
    backgroundColor: "#e5e5e5",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  addToCartTextDisabled: {
    color: "#a0a0a0",
  },
});

export default GiftProduct;
