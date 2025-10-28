import React from "react";
import ProductNoSlice from "@/components/products/ProductNoSlice";
import { productApi } from "@/utils/api/product.api";
import type { ProductProps } from "@/types/api";
import { View, Text } from "react-native";

export default function ProductWatched() {
  const [dataProducts, setDataProducts] = React.useState<ProductProps[]>([]);

  const fetchProducts = async () => {
    try {
      const result = await productApi.getAll();
      if (Array.isArray(result.data)) setDataProducts(result.data);
    } catch (e) {}
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View>
      <View className="flex-row items-center gap-x-2">
        <Text className="text-xl font-bold text-[#04297a]">
          SẢN PHẨM BẠN ĐÃ XEM
        </Text>
      </View>
      <ProductNoSlice list={dataProducts} suggest={true} />
    </View>
  );
}
