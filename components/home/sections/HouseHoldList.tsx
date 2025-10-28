import React from "react";
import { productApi } from "@/utils/api/product.api";
import type { ProductProps } from "@/types/api";
import ProductNoSlice from "@/components/products/ProductNoSlice";

export default function HouseHoldList() {
  const [dataProducts, setDataProducts] = React.useState<ProductProps[]>([]);
  const brand: { name: string }[] = [
    { name: "Apple" },
    { name: "Samsung" },
    { name: "Xiaomi" },
    { name: "OPPO" },
  ];

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
    <ProductNoSlice title="ĐỒ GIA DỤNG" list={dataProducts} brand={brand} />
  );
}
