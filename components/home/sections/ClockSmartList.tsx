import React from "react";
import type { ProductProps } from "@/types/api";
import { productApi } from "@/utils/api/product.api";
import ProductNoSlice from "@/components/products/ProductNoSlice";

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
      const result = await productApi.getAll();
      setLoading(false);
      if (Array.isArray(result.data)) setDataProducts(result.data);
    } catch (e) {
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
