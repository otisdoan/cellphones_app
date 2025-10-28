import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProductHome, ProductNoSlice } from "../products";
import { ProductProps } from "../../types/api";
import { productApi } from "@/utils/api/product.api";
import { sliceArray } from "@/utils/sliceArray";

const ProductSection = () => {
  const [allProducts, setAllProducts] = React.useState<ProductProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const brands = [
    { name: "Apple" },
    { name: "Samsung" },
    { name: "Xiaomi" },
    { name: "OPPO" },
    { name: "Vivo" },
  ];

  const fetchProducts = async () => {
    try {
      const result = await productApi.getAll();
      setLoading(false);
      if (Array.isArray(result.data)) setAllProducts(result.data);
    } catch {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const groupedProducts = React.useMemo(
    () => sliceArray(allProducts, 10),
    [allProducts]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>

      <ProductHome
        title="Điện thoại hot nhất"
        brand={brands}
        list={groupedProducts}
        loading={loading}
      />

      <ProductNoSlice
        title="Gợi ý cho bạn"
        list={allProducts}
        suggest={true}
        loading={loading}
      />

      <ProductNoSlice
        title="Sản phẩm mới"
        brand={brands.slice(0, 3)}
        list={allProducts.slice(0, 8)}
        suggest={false}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 0,
    paddingVertical: 12,
    backgroundColor: "white",
    marginBottom: 8,
  },
});

export default ProductSection;
