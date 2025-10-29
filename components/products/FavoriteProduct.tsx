import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { productApi } from "@/utils/api/product.api";
import type { ProductProps } from "@/types/api";
import ProductCard from "./ProductCard";

const FavoriteProduct: React.FC = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps[]>([]);

  const fetchProducts = async () => {
    try {
      const result = await productApi.getAll();
      if (Array.isArray(result.data)) {
        // Lấy 10 sản phẩm đầu tiên
        setDataProducts(result.data.slice(0, 10));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Có thể bạn thích</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dataProducts.map((product, index) => (
          <View key={index} style={styles.productItem}>
            <ProductCard {...product} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  scrollContent: {
    paddingRight: 16,
  },
  productItem: {
    width: 160,
    marginRight: 12,
  },
});

export default FavoriteProduct;
