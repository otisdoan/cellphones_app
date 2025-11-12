import React from "react";
import type { ProductProps } from "@/types/api";
import { productApi } from "@/utils/api/product.api";
import ProductNoSlice from "@/components/products/ProductNoSlice";

// Category ID cho Đồng hồ thông minh trong database
const SMARTWATCH_CATEGORY_ID = 13;

export default function ClockSmartList() {
  const [dataProducts, setDataProducts] = React.useState<ProductProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const brand: { name: string }[] = [
    { name: "Apple" },
    { name: "Samsung" },
    { name: "Xiaomi" },
    { name: "OPPO" },
  ];

  const fetchProducts = async () => {
    try {
      const result = await productApi.getByCategory(SMARTWATCH_CATEGORY_ID);
      setLoading(false);
      if (Array.isArray(result.data)) setDataProducts(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductNoSlice
      title="ĐỒNG HỒ THÔNG MINH"
      list={dataProducts}
      brand={brand}
      loading={loading}
    />
  );
}
